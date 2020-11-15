![](./badge.svg)

# Developing chart modules

- [Quickstart](#quickstart)
- [Building Reuters chart modules](#building-reuters-chart-modules)
  - [Chart module design style](#%EF%B8%8F-chart-module-design-style)
  - [Working with chart module classes](#%EF%B8%8F-working-with-chart-module-classes)

## Quickstart

Start the development server to begin working on your chart module.

  ```
  $ runner start
  ```

Build your chart in the `src/js/index.js` file, write styles in `src/scss/_chart.scss` and customize the demo page in `src/demo/Chart.svelte`.

When you're finished, build your chart.

  ```
  $ runner build
  ```

The build process will bundle your chart module so others can install it from GitHub or npm. It will also create a GitHub docs page to preview your chart, which you can publish by updating the GitHub Pages settings on your repo in GitHub (use the `docs/` folder on the `master` branch).

## Building Reuters chart modules

The rest of this doc is a guide to building reusable charts with the chart module pattern included in this template.

### ✏️ Chart module design style

The template is made to be extremely flexible to cover all kinds of charts. BUT there are a few guidelines your chart module should follow to make it easier to use and adapt. 

1. **Chart modules should be JavaScript classes.**

    ... so they are portable and can create multiple charts.

2. **Chart modules should be configurable and reconfigurable** by passing data and props to them.

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
const newChart = new MyChart();

// ... pass that chart some configuration:
newChart
  .selection('#chart') // + the element the chart should be drawn into
  .data([ /* ... */ ]) // + the data for the chart
  .props({ /* ... */ }) // + any other visual properties we want to customize

// Now draw that chart with the data and config we've given it.
newChart.draw();
```

You can write your chart module class any way you want, but as a shortcut, we start you off by extending a base class that's included in the template:

```javascript
import BaseChartComponent from './baseClasses/ChartComponent';

class MyChartModule extends BaseChartComponent {
  // your chart stuff ...
}

export default MyChartModule;
```

The base class includes some basic getter/setter functions and some useful error messages if the _wrong_ data or props are passed to it. You can look at what's in the base class and customize those getter/setters and validations rules, but you don't have to.