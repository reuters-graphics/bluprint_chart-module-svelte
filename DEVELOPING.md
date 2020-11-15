![](./badge.svg)

# Developing chart modules

- [Quickstart](#quickstart)
- [Building Reuters chart modules](#building-reuters-chart-modules)
  - [Chart module design style](#%EF%B8%8F-chart-module-design-style)
  - [Working with chart module classes](#%EF%B8%8F-working-with-chart-module-classes)
  - [Using getter/setters to configure chart modules](#%EF%B8%8F-using-gettersetters-to-configure-chart-modules)
    - [Getter/setters behind the scenes](#-bonus-gettersetters-behind-the-scenes)

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
const chart = new MyChartModule();

// ... pass that chart some configuration:
chart
  .selection('#chart') // + the element the chart should be drawn into
  .data([ /* ... */ ]) // + the data for the chart
  .props({ /* ... */ }); // + any other visual properties we want to customize

// Now draw that chart with the data and config we've given it.
chart.draw();
```

You can write your chart module class any way you want, but as a shortcut, we start you off by extending a base class that's included in the template:

```javascript
import BaseChartComponent from './baseClasses/ChartComponent';

class MyChartModule extends BaseChartComponent {
  // your chart stuff ...
}

export default MyChartModule;
```

The base class includes some basic getter/setter functions and some validation that will throw useful errors if the _wrong_ data or props are passed to your chart. You can look at what's in the base class and customize those getter/setters and validations rules, but you don't have to.

### ✏️ Using getter/setters to configure chart modules

Let's look at how you can use those getter/setter methods to set and access configuration options on your chart.

In your chart module, you can set up default data and props by putting `defaultData` and `defaultProps` properties on the class.

```javascript
class MyChart extends BaseChartComponent {
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
class MyChart extends ChartComponent {

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

Let's look at one:

```javascript
class MyChart {
  // Getter/setter
  props(customProps) {
    if (!customProps) return this._props;
    this._props = customProps;
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
  geoData(topo) {
    if (!topo) return this._geoData;
    this._geoData = topo;
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

As a bonus, you can add a little bit of data validation to give your chart's users some helpful error messages if they pass data in a format you don't expect.

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