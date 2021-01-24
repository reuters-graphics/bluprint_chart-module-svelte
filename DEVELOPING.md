![](./badge.svg)

# Developing chart modules

- [Quickstart](#quickstart)
- [Building Reuters chart modules](#building-reuters-chart-modules)
  - [Chart module design style](#%EF%B8%8F-chart-module-design-style)
  - [Working with chart module classes](#%EF%B8%8F-working-with-chart-module-classes)
  - [Using getter/setters to customize your chart](#%EF%B8%8F-using-gettersetters-to-customize-your-chart)
    - [Getter/setters behind the scenes](#-bonus-gettersetters-behind-the-scenes)
  - [Designing your chart props](#%EF%B8%8F-designing-your-chart-props)
    - [Visual properties](#visual-properties)
    - [Translatable text](#translatable-text)
    - [Functions](#functions)
    - [Accessors](#accessors)
    - [Callbacks](#callbacks)
  - [Designing your draw function](#%EF%B8%8F-designing-your-draw-function)
  - [Making your chart responsive](#%EF%B8%8F-making-your-chart-responsive)
- [Building your demo page](#%EF%B8%8F-building-your-demo-page)
  - [Interactive props and data](#interactive-props-and-data)


## Quickstart

Start the development server to begin working on your chart module.

  ```
  $ runner start
  ```

The files you'll use to build your chart module are all in the `src/` directory:

```
- src/
  - demo/
    - Chart.svelte 👈
  - js/
    - index.js 👈
  - scss/
    - _chart.scss 👈
```

Build your chart in the `src/js/index.js` file, write styles in `src/scss/_chart.scss` and customize the demo page in `src/demo/Chart.svelte`.

When you're finished, build your chart.

  ```
  $ runner build
  ```

The build process will bundle your chart module so others can install it from GitHub or npm. It will also create a GitHub docs page to preview your chart, which you can publish by updating the GitHub Pages settings on your repo in GitHub (use the `docs/` folder on the `master` branch).

## Building Reuters chart modules

The rest of this doc is a guide to building reusable charts with the chart module pattern included in this template.

> 💡 **Pro tip:** There's a lot of information here, but the best way to learn is to play with the template and refer back to different parts of these docs as you go. Don't feel like you need to read it all to get started!

### ✏️ Chart module design style

The template is made to be extremely flexible to cover all kinds of charts. BUT there are a few guidelines your chart module should follow to make it easier to use and adapt. 

1. **Chart modules should be JavaScript classes.**

    ... so they are portable and can create multiple charts.

2. **Chart modules should be configurable** by passing data and props to them.

    ... so they can be customized to work with many datasets and multiple designs.

3. **Chart modules should have a single, idempotent draw function** that creates the chart.

    ... so that they are predictable and work the same way no matter in what context they're called. (More on "idempotent" later!)

4. **Chart modules should respond to the dimensions of their containers**, at least the width.

    ... so they will work on any device or in any design layout.


### ✏️ Working with chart module classes

Chart modules are written as JavaScript classes. That let's us create an instance of that class and customize it with different data or properties for every chart we want to make (great for small multiples!).

First, let's look at how we want to _use_ our chart modules:

```javascript
// Create a new instance of our chart
const chart = new MyChartModule();

// ... pass that chart some configuration:
chart
  .selection('#chart') // + the element the chart should be drawn into
  .data([ /* ... */ ]) // + the data for the chart
  .props({ /* ... */ }); // + any other visual properties we want to customize

// Now draw that chart with the data and config we've given it.
chart.draw();
```

You can write your chart module class any way you want, but as a shortcut, we start you off with some basic boilerplate:

```javascript
class MyChart {
  selection(selector) {
    // Get/set your chart's container...
  }

  data(newData) {
    // Get/set your charts data...
  }

  props(newProps) {
    // Get/set some visual properties of your chart...
  }

  defaultData = []; // Some default data...

  defaultProps = {}; // Some default props...

  draw() {
    // 👈  Where you'll write your chart code!
  }
}

export default MyChart;
```

The base class includes some basic getter/setter functions and defaults to make your chart easy to use.

### ✏️ Using getter/setters to customize your chart

Let's look at how you can use those getter/setter methods to set and access configuration options on your chart.

In your chart module, you can set up default data and props by putting `defaultData` and `defaultProps` properties on the class.

```javascript
class MyChart {
  defaultData = someData;

  defaultProps = {
    lineStroke: 'blue',
    // etc...
  }

  draw() {
    // Your chart code here...
  }
};
```

Now when someone uses your chart, it will be configured with the `defaultData` and `defaultProps` you setup, but if they want to _change_ those options, they can use the built-in **_setters_**.

```javascript
chart
  .data(myNewData)
  .props({ lineStroke: 'red' });
```

Inside your chart module's `draw` method, you can use the built-in **_getters_** to access those configured data and props.

```javascript
class MyChart {

  draw() {
    const data = this.data();
    const { lineStroke } = this.props();
    // Draw your chart with the configured data and props...
  }
};
```

#### 🤔 BONUS: Getter/setters behind the scenes

The getter/setters we're talking about here are a little different from the [get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)/[set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) syntax you might have used before in JavaScript.

The difference allows us to chain getter/setter methods together with other methods on our module and is used widely in [D3.js objects like scales and axes](https://bost.ocks.org/mike/chart/#reconfiguration).

Let's look at a simplified one:

```javascript
class MyChart {
  // Getter/setter
  props(newProps) {
    if (!newProps) return this._props;
    this._props = newProps;
    return this;
  }
}
```

Keep in mind how we want to use this method. We want to _set_ some custom props like this:

```javascript
chart.props({ myProp: '' });
```

... and in our chart we want to _get_ those props like this:

```javascript
class MyChart {
  draw() {
    const { myProp } = this.props();
  }
}
```

Stepping through the getter/setter then, if no props are passed when the method is called, we return the current props, which we've saved to a private property `this._props`:

```javascript
props(customProps) {
  if (!customProps) return this._props; // 👈
  this._props = customProps;
  return this;
}
```

But if we do pass custom props to the `props` method, we reset that private property:

```javascript
props(customProps) {
  if (!customProps) return this._props;
  this._props = customProps; // 👈
  return this;
}
```

As an added extra, we return the chart class whenever we set new props:

```javascript
props(customProps) {
  if (!customProps) return this._props;
  this._props = customProps;
  return this; // 👈
}
```

That lets us chain additional methods when we use the chart:

```javascript
chart
  .props({})
  .draw(); // 👈
```


Using this pattern, you can add additional getter/setters in your chart class if you need them. For example, here's how you might write one to allow your chart to be passed some topojson.

```javascript
class MyChart {

  // Our getter/setter
  geoData(topojson) {
    if (!topojson) return this._geoData;
    this._geoData = topojson;
    return this;
  }

  draw() {
    // Use the getter to access the data
    const topojson = this.geoData();

    //...
  }
};
```

Now, your users can customize the geoData passed to your chart.

```javascript
chart.geoData([/* ... */]);
```

As a bonus, writing these as getter/setters let's you add a little bit of data validation so your chart can give users helpful error messages if they pass data in a format you don't expect.

```javascript
geoData(topo) {
  if (!topo) return this._geoData;
  // 👇 Some helpful data validation
  if (!Array.isArray(topo)) {
    throw new Error('Topojson should be an array');
  }
  this._geoData = topo;
  return this;
}
```

### ✏️ Designing your chart props

As we've seen already, your users can use your chart's props to customize the visual features of your chart.

When you're building a chart module, you'll usually start with just a couple customizable props and build more as your chart develops. Once you get the basics of your chart down, this is likely where you'll spend most of your time, adding new features through props and making your chart cover more use cases.

Let's look at a couple common uses and a few more advanced ways you can use props to make your chart module very flexible.

#### Visual properties

The most common props customize visual properties like colors, dimensions and other style properties.

```javascript
class MyChart {
  defaultProps = {
    circleFill: 'orange',
    circleStroke: '#333',
    circleStrokeWidth: 2,
    marginTop: 10,
    marginBottom: 10,
  }

  draw() {
    const props = this.props();

    // ...

    svg.appendSelect('circle')
      .style('fill', props.fill)
      .style('stroke', props.circleStroke)
      .style('stroke-width', props.circleStrokeWidth);
  }
}
```

Now your users can overwrite those defaults:

```javascript
chart
  .props({
    circleFill: 'steelblue',
  })
  .draw();
```

> 💡 **Pro tip:** Custom props are merged with defaults using [lodash](https://lodash.com/docs/4.17.15#merge), so you can group related props in an object and your users can customize just those parts they need to change.

```javascript
class MyChart {
  defaultProps = {
    circle: {
      fill: 'orange',
      stroke: '#333',
      strokeWidth: 2,
    },
    margin: {
      top: 10,
      bottom: 10,
    },
  }
}
```

```javascript
chart
  .props({
    margin: { top: 20 },
  })
  .draw();
```

#### Translatable text

It's generally a good idea for all the text in your chart to be customizable through props so it can be translated.

```javascript
class MyChart {
  defaultProps = {
    title: 'COVID-19 trends',
    chatter: 'Europe is entering a second wave.',
    yAxisLabel: 'Cases',
    xAxisLabel: 'Date',
  }

  draw() {
    const props = this.props();

    // ...

    svg.appendSelect('h4')
      .text(props.title);
  }
}
```

Now your users can pass translated text to your chart:

```javascript
chart
  .props({
    title: 'COVID-19-Trends',
    chatter: 'Europa tritt in eine zweite Welle ein.',
    // ...
  })
  .draw();
```

#### Functions

Beyond simple values, you can pass functions as props, which can let your users customize all kinds of things like d3 scales and parsers.

```javascript
class MyChart {
  defaultProps = {
    colorScale: d3.scaleLinear()
      .domain([0, 100])
      .range(['red', 'green']),
    dateFormat: d3.timeFormat('%Y'),
  }

  draw() {
    const props = this.props();

    // ...

    const dataColor = props.colorScale(someValue);
  }
}
```

```javascript
chart
  .props({
    colorScale: d3.scaleThreshold()
      .domain([100, 200])
      .range(['red', 'white', 'green']),
    dateFormat: d3.timeFormat('%Y-%m-%d'),
  })
  .draw();
```

#### Accessors

One special type of function prop is an accessor, which is a function used to get another value. Think of it as a map a user can give you that tells your chart how to find a piece of information.

One really common use for accessors is to parse data. Accessors let your users pass you their data in whatever format they have because they tell your chart how to get the information within that data structure. Take a look:

```javascript
class MyChart {
  defaultData = [{ x:'2019', y: 10 }, { x:'2020', y: 12 }]

  defaultProps = {
    xAccessor: d => d.x,
    yAccessor: d => d.y,
  }

  draw() {
    const props = this.props();
    const data = this.data();

    // ...

    const parsedData = data.map((d) => {
      return {
        x: props.xAccessor(d),
        y: props.yAccessor(d),
      };
    });
  }
}
```

Now with those accessor props, your chart can accept data in a different format and still parse the information it needs to draw the chart.

```javascript
chart
  .data([
    { date: { year: '2019' }, value: 45 },
    { date: { year: '2020' }, value: 53 },
  ])
  .props({
    xAccessor: d => d.date.year,
    yAccessor: d => d.value,
  })
  .draw();
```

In other cases, you can use accessors to give users complete control of parts of your chart. Take, for example, a tooltip:

```javascript
class MyChart {
  defaultProps = {
    tooltipContent: d => `<p>${d.date}</p>`,
  }

  draw() {
    const props = this.props();

    // ...

    circles.on('mouseover', (d) => {
      tooltip.html(props.tooltipContent(d))
    });
  }
}
```

Now your users have complete control of how to fill out that tooltip.

```javascript
chart
  .props({
    tooltipContent: d => `<h5>${d.date}</h5><p>${d.value}</p>`;
  })
  .draw();
```

#### Callbacks

You can handle complex interactions by passing callbacks to your chart, which will let users hook in when a user interacts with some part of your chart and update another part of the page.

Usually the default for a callback is a function that doesn't really do anything (a no-op).

```javascript
class MyChart {
  defaultProps = {
    onClick = (datum) => datum, // 👈  no-op by default
  }

  draw() {
    const props = this.props();

    // ...

    circles.on('click', (d) => {
      props.onClick(d);
    });
  }
}
```

Now your user can do something like navigate the entire page based on an interaction with your chart.

```javascript
chart
  .props({
    onClick: (d) => {
      window.location.href = `/states/${d.postalCode}/`;
    }
  })
  .draw();
```

> #### 🏁 In conclusion on props...
> 
> Pushing as much of the business logic as you can into props gives users the ability to deeply customize and control your chart. This may seem like a lot at first, but after you do it once or twice it'll become second nature to think of your chart in props.

### ✏️ Designing your draw function

Remember, we want your chart to have **a single, idempotent function** that draws your chart with the data and props your users give your chart.

Let's break that down.

#### Why a single function?

Because we want our chart to be as simple as possible because that makes it predictable. There should be a one-to-one relationship between the data and props your users configure and the chart they get back. A single draw function simplifies that equation for you and your users.

#### Why an "idempotent" function?

Before we jump into some background theory here, just keep front-of-mind the goal is to make our chart extremely **predicatable**.

Now let's talk about _idempotence_.

"Idempotence" is a fancy word from math and computer science that means that the same operation produces the same result no matter how many times it's called.

In terms of your chart module, it's a very important concept to make your chart reliable in whatever context it's used in.

For example, given the same data and props, your chart should intelligently draw or redraw only those elements that are new or changed.

```javascript
// First time your chart is drawn, it should produce all the elements
chart
  .props(myProps)
  .data(myData)
  .draw();

// A second time, called with the *same* data and props,
// the chart shouldn't create, redraw or change any new
// elements, because they're already there!
chart
  .props(myProps)
  .data(myData)
  .draw();

// NEW data is passed to the chart, so the chart should
// redraw the elements that have changed.
chart
  .data(newData)
  .draw();
```

If you've used D3 before, you've already created idempotent chart elements by using D3's [general update pattern](https://observablehq.com/@d3/general-update-pattern).

Consider this code:

```javascript
function draw(myData) {
  const cirlces = svg.selectAll('circle')
    .data(myData);

  circles.enter().append('circle');

  circles.attr('fill', 'blue');

  circles.exit();
}
```

If the `draw` function is called twice with the same data, D3 knows not to add new circles for ones already on the page. BUT if the data changes, D3 will add or remove circles to reflect your data.

That means any **data-bound elements in your chart are already idempotent**, but that leaves out some non-data-bound elements you might be used to writing in your code.

Consider this:

```javascript
function draw(myData) {
  d3.select('div#chart').append('svg');

  // ...
}
```

Now if we call the draw function twice with the same data, the result _won't_ be the same. On the second call, D3 will add a new `svg` element to our div even though there's already one there.

To help you make non-data-bound elements idempotent, you'll see the template use a special D3 helper method called `appendSelect`.

You can use it like this:

```javascript
import d3 from './utils/d3';

function draw(myData) {
  d3.select('#chart').appendSelect('svg');

  // ...
}
```

Here's what that method does: `appendSelect` will first check if there's already an element within the parent selection (`d3.select(#chart)`) and _only_ append a new one if it doesn't find one there.

If there _is_ one already, `appendSelect` will select it so you can continue chain chaining properties like you normally would.

```javascript
function draw(myData) {
  d3.select('#chart')
    .appendSelect('svg')
    .attr('width', 300) // applied to the svg!
    .attr('height', 300);

  // ...
}
```

You can also use classes to make your selector more specific in case there are multiple elements within the parent selection:

```javascript
d3.select('#chart')
  .appendSelect('g.axis') // will ignore g.circles, etc.
  .transform('translate(300, 0)');
```

> **UPSHOT:** Use `appendSelect` with non-data-bound elements in place of D3's normal `append` method to make your chart's draw method idempotent.

Read more about `appendSelect` and the reasons we use it in the [docs for our D3 plugin](https://github.com/reuters-graphics/d3-appendselect).

#### What else?

That's up to you! Your draw function is where the real flexibility of our chart module pattern comes into play.

If at this point you've followed our module design style, then you can do almost anything in your draw function including complex interactions.

Go for it!


### ✏️ Making your chart responsive

In general, your chart should respect the boundaries of the container it's used in. At minimum, that means you should check the **width** of your container to determine the size of your chart.

```javascript
class MyChart {
  // ...

  draw() {
    // Use the selection getter and then get underlying node
    const node = this.selection().node();

    // Get the dimensions of the node with JS's getBouldingClientRect
    const { width } = node.getBoundingClientRect();

    // Use width in your chart...
  }
};
```

## ✏️ Building your demo page

The demo page for your chart is a place for users to see what your chart looks like and play with some of the options they can control via props.

> The demo page is written in [Svelte](https://svelte.dev/). You can learn all about Svelte from [their own docs](https://svelte.dev/tutorial/basics), but the demo page is designed for you to get by without knowing too much about it. This section is here to help. Read on.

You'll write the demo of your chart in `src/demo/Chart.svelte`. You can follow the notes in that component, but we'll go over some basic points here.

At its most basic, your chart demo can be written like this:

```svelte
<script>
  import MyChartModule from '../js';
  
  let chartContainer;

  let chart = new MyChartModule();
  
  afterUpdate(() => {
    chart
      .selection(chartContainer)
      .data(chartData)
      .props(chartProps)
      .draw();
  });
</script>

<div id="chart" bind:this={chartContainer} />
```

In order of operation, we import and instantiate your chart class, setup a container div (`#chart`) and then run your chart to draw chart elements inside that container.

Notice the chart is actually run inside an `afterUpdate` function, which is a Svelte method that waits until the rest of the elements have been put on the page. That basically guarantees that the container `div#chart` exists on the page _before_ we draw our chart inside it.

From this basic setup, you can make `chartData` and `chartProps` whatever you want to demonstrate your chart's functionality. But let's quickly run through how to make some of those options interactive.

### Interactive props and data

Svelte -- like React, Vue and other modern JS frameworks -- reacts to changes in data and updates the page to reflect them. You can read all about that [reactivity in Svelte's docs](https://svelte.dev/tutorial/reactive-assignments), but you should be able to get around without deeply understanding how it works, too.

First off, let's set those chart data and props variables from above to real values:

```svelte
<script>
  // ...
  let chartData = [10, 20, 30];
  let chartProps = { fill: 'steelblue' };
  
  afterUpdate(() => {
    chart
      .selection(chartContainer)
      .data(chartData)
      .props(chartProps)
      .draw();
  });
</script>

<div id="chart" bind:this={chartContainer} />
```

To make those updatable, we can simply add a way to reassign those variables to new values, for example, on a button click!

```svelte
<script>
  // ...
  let chartData = [10, 20, 30];
  let chartProps = { fill: 'steelblue' };
  // ...
</script>

<!-- ... -->

<div>
  <button
    on:click={() => { chartData = [30, 50, 80] }}
  >New data</button>
  <button
    on:click={() => { circleProps = { fill: 'orange' }; }}
  >Orange fill</button>
</div>
```

Now when a user clicks those buttons, Svelte will update the variables' values, which in turn triggers your chart's `draw` function to re-run.

That's it!

> You'll notice in the demo we separate all the props we want to update into separate variables and then re-gather them together into a `chartProps` object, assigned with a weird `$:` symbol before it.
> 
> Don't worry about that symbol too much. It's a [reactive declaration](https://svelte.dev/tutorial/reactive-declarations), which basically guarantees Svelte re-updates your chart (and the interactive docs made by the `AutoDoc` component) whenever any of the props values change. Just go with it for now, and you'll be fine.