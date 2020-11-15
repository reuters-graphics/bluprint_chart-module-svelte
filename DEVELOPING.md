![](./badge.svg)

# Developing chart modules

- [Quickstart](#quickstart)
- [Building Reuters chart modules](#building-reuters-chart-modules)
  - [Chart module design style](#chart-module-design-style)

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

### Chart module design style

The template is made to be extremely flexible to cover all kinds of charts. BUT there are a few guidelines your chart module should follow to make it easier to use and adapt. 

1. **Chart modules should be JavaScript classes**

    ... so they are portable and can create multiple charts.

2. **Chart modules should be configurable and reconfigurable** by passing data and props to them.

    ... so they can be customized to work with many datasets and multiple designs.

3. **Chart modules should have a single, idempotent draw function** that creates the chart.

    ... so that they are predictable and work the same way no matter in what context they're called. (More on "idempotent" later!)

4. **Chart modules should respond to the dimensions of their containers**, at least the width.

    ... so they will work on any device or in any design layout.
