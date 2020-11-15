import * as d3 from 'd3';

import BaseChartComponent from './baseClasses/ChartComponent';

// Write your chart as a class with a single draw method that draws
// your chart! This component inherits from a base class you can
// see and customize in the baseClasses folder.
class MyChart extends BaseChartComponent {
  // Default props are the built-in styles your chart comes with
  // that you want to allow a user to customize. Remember, you can
  // pass in complex data here, like default d3 axes or accessor
  // functions that allow for flexible data structors.
  defaultProps = {
    stroke: '#aaa',
    strokeWidth: 1,
    fill: 'steelblue',
    height: 200,
  };

  // Default data for your chart. Generally, it's NOT a good idea to import
  // a large dataset and assign it here b/c it'll make your component quite
  // big in terms of file size. At minimum, though, you should assign an
  // empty Array or Object, depending on what your chart expects.
  defaultData = [];

  // Write all your code to draw your chart in this function!
  // Remember to use appendSelect!
  draw() {
    const data = this.data(); // Data passed to your chart
    const props = this.props(); // Props passed to your chart

    const node = this.selection().node();
    const { width } = node.getBoundingClientRect(); // Respect the width of your container!

    const transition = d3.transition()
      .duration(750);

    this.svg = this.selection()
      .appendSelect('svg') // 👈 Use appendSelect instead of append for non-data-bound elements!
      .attr('width', width)
      .attr('height', props.height);
    // ☝️ Notice we're assigning the svg back onto the class instance, this.svg. That
    // gives your uses an entry point to the SVG so they can write custom elements
    // like legends or annotations directly on the chart outside your module if necessary.
    // Generally, a good idea to think about those entry points, but not required!

    // 💪 Blue skies from here on... Make your chart the way you want to!
    // --------------------------------------------
    const dataSum = data.reduce((a, c) => a + c, 0);
    const xOffset = width / 2 - dataSum / 2;

    const g = this.svg
      .appendSelect('g')
      .attr('transform', `translate(${xOffset}, 0)`);

    g.selectAll('circle')
      .data(data, (d, i) => i)
      .join(
        enter => enter.append('circle')
          .style('fill', props.fill)
          .style('stroke', props.stroke)
          .style('stroke-width', props.strokeWidth)
          .attr('cy', props.height / 2)
          .attr('cx', (d, i) =>
            data.slice(0, i).reduce((a, b) => a + b, 0) + (d / 2)
          )
          .call(enter => enter.transition(transition)
            .attr('r', d => d / 2)),
        update => update
          .style('fill', props.fill)
          .style('stroke', props.stroke)
          .call(update => update.transition(transition)
            .attr('cx', (d, i) =>
              data.slice(0, i).reduce((a, b) => a + b, 0) + (d / 2)
            )
            .attr('r', d => d / 2)),
        exit => exit
          .call(exit => exit.transition(transition)
            .attr('r', 0)
            .remove())
      );

    // Generally, you should always return the chart class from draw!
    return this;
  }
}

export default MyChart;
