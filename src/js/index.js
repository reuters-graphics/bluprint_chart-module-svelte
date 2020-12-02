import * as d3 from 'd3';

import BaseChartComponent from './baseClasses/ChartComponent';

/**
 * Write your chart as a class with a single draw method that draws
 * your chart! This component inherits from a base class you can
 * see and customize in the baseClasses folder.
 */
class test extends BaseChartComponent {
    /**
     * Default props are the built-in styles your chart comes with
     * that you want to allow a user to customize. Remember, you can
     * pass in complex data here, like default d3 axes or accessor
     * functions that can get properties from your data.
     */
    defaultProps = {
        stroke: '#aaa',
        strokeWidth: 1,
        aspectHeight: .7,
        margin: {
            top: 20,
            right: 20,
            bottom: 40,
            left: 50,
        }};

    /**
     * Default data for your chart. Generally, it's NOT a good idea to import
     * a big dataset and assign it here b/c it'll make your component quite
     * large in terms of file size. At minimum, though, you should assign an
     * empty Array or Object, depending on what your chart expects.
     */
    defaultData = [];






    /**
     * Write all your code to draw your chart in this function!
     * Remember to use appendSelect!
     */
    draw() {
        const data = this.data(); // Data passed to your chart
        const props = this.props(); // Props passed to your chart

        const node = this.selection().node();
        //const { width } = node.getBoundingClientRect(); // Respect the width of your container!

        let width = (node.offsetWidth) - props.margin.left - props.margin.right;
        let height = (node.offsetWidth * props.aspectHeight) - props.margin.top - props.margin.bottom;

        let xScale = d3.scaleLinear()
            .rangeRound([0, width])
            .domain([0, 100]);

        let yScale = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, 100]);

        const transition = d3.transition()
            .duration(500);

        this.svg = this.selection()
            .appendSelect('svg') // 👈 Use appendSelect instead of append for non-data-bound elements!
            .attr('width', width + props.margin.left + props.margin.right)
            .attr('height', height + props.margin.top + props.margin.bottom);
        /**
         * 💡 Pro-tip: Notice we're assigning the SVG back onto the class instance, this.svg.
         * That gives your uses an entry point to the SVG so they can write custom elements
         * like legends or annotations directly on the chart outside your module if necessary.
         * Generally, a good idea to think about those entry points, but not required!
         */

        /**
         * 💪 Blue skies from here on... Make your chart the way you want to!
         */
        const dataSum = data.reduce((a, c) => a + c, 0);
        const xOffset = width / 2 - dataSum / 2;

        const plot = this.svg
            .appendSelect('g')
            .classed('plot', true)
            .attr("transform", `translate(${props.margin.left},${props.margin.top})`);

        let xAxis = plot.appendSelect("g.x-axis.axis");
        let yAxis = plot.appendSelect("g.y-axis.axis");

        xAxis.attr("transform", `translate(0,${height + 20})`)
            .call(
                d3.axisBottom(xScale)
                .tickSize(-height - 20)
            );

        yAxis.attr("transform", `translate(-20,0)`)
            .call(
                d3.axisLeft(yScale)
                .tickSize(-width - 20)
            );

        plot.selectAll('circle')
            .data(data, (d, i) => i)
            .join(
                enter => enter.append('circle')
                .style('fill', props.fill)
                .style('stroke', props.stroke)
                .style('stroke-width', props.strokeWidth)
                .attr('cy', d => {
                    return yScale(d.y);
                })
                .attr('cx', d => {
                    return xScale(d.x);
                })
                .call(enter => enter.transition(transition)
                    .attr('r', d => d.r)
                ),

                update => update
                .style('fill', props.fill)
                .style('stroke', props.stroke)
                .call(update => update.transition(transition)
                    .attr('cy', d => {
                        return yScale(d.y);
                    })
                    .attr('cx', d => {
                        return xScale(d.x);
                    })
                    .attr('r', d => d.r)
                ),

                exit => exit
                .call(exit => exit.transition(transition)
                    .attr('r', 0)
                    .remove())
            );

        return this; // Generally, always return the chart class from draw!
    }
}

export default test;