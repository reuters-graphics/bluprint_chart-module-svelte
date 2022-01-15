<!-- ⭐ Write an interactive DEMO of your chart in this component.
Follow the notes below! -->
<script>
  import { afterUpdate } from 'svelte';
  import MyChartModule from './index.js';
  import { chartWidth, fakeData, Explorer } from '../demo/stores';

  let chart = new MyChartModule();
  let chartContainer;

  // 🎚️ Create variables for any data or props you want users to be able
  // to update in the demo. (And write buttons to update them below!)
  let circleFill = 'steelblue';
  // ...

  // 🎈 Tie your custom props back together into one chartProps object.
  $: chartProps = { fill: circleFill };

  // Make some demo data
  $: chartData = $fakeData;

  afterUpdate(() => {
    // 💪 Create a new chart instance of your module.
    chart = new MyChartModule();
    // ⚡ And let's use your chart!
    chart
      .selection(chartContainer)
      .data(chartData) // Pass your chartData
      .props(chartProps) // Pass your chartProps
      .draw(); // 🚀 DRAW IT!
  
    // ⚙️ Auto-generated interactive documentation for you chart data and props!
    Explorer.set({
      Data: chart.data(),
      Props: chart.props(),
    });
  });
</script>

<section class={`graphic borderless ${$chartWidth}`}>
  <div id="my-chart-module-container" bind:this="{chartContainer}"></div>
</section>


<div class="chart-options">
  <!-- ✏️ Create buttons that update your data/props variables when they're clicked! -->
  <button
    on:click="{() => {
      fakeData.reset();
    }}">New data</button
  >
  <button
    on:click="{() => {
      circleFill = circleFill === 'orange' ? 'steelblue' : 'orange';
    }}">Change fill</button
  >
</div>

<style lang="scss">
  // 🖌️ Style your demo page here
  // (But style your chart module in scss/_chart.scss!)
</style>
