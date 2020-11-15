![](./badge.svg)

# MyChartModule

### Install

```
$ yarn add https://github.com/reuters-graphics/chart-module-my-chart-module.git
```

### Use

```javascript
import MyChartModule from '@reuters-graphics/chart-module-my-chart-module';

const chart = new MyChartModule();

// To create your chart, pass a selector string to the chart's selection method,
// as well as any props or data to their respective methods. Then call draw.
chart
  .selection('#chart')
  .data([1, 2, 3])
  .props({ stroke: 'orange' })
  .draw();

// You can call any method again to update the chart.
chart
  .data([3, 4, 5])
  .draw();

// Or just call the draw function alone, which is useful for resizing the chart.
chart.draw();
```

To apply this chart's default styles when using SCSS, simply define the variable `$MyChartModule-container` to represent the ID or class of the chart's container(s) and import the `_chart.scss` partial.

```CSS
$MyChartModule-container: '#chart';

@import '~@reuters-graphics/chart-module-my-chart-module/src/scss/chart';
```

## Developing chart modules

Read more in the [DEVELOPING docs](./DEVELOPING.md) about how to write your chart module.