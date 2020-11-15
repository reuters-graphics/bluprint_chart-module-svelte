<!-- ⭐ Write am interactive DEMO of your chart in this component.
Follow the notes below! -->

<script>
  export let responsive; // eslint-disable-line ignore me...
  import { afterUpdate } from 'svelte';
  import AutoDoc from './AutoDoc.svelte';
  import ChartModule from '../js';
  
  let chartContainer;

  // 💪 Create a new chart instance of your module.
  let chart = new ChartModule();
  
  // 🎚️ Create variables for any data or props or you want to use to
  // be able to update in the demo. (Write buttons below!)
  let chartData = [60, 40, 60]
  let circleFill = 'steelblue';
  // ...

  // 🎈 Tie your custom props back together into one chartProps object.
  $: chartProps = { fill: circleFill };
  
  afterUpdate(() => {
    // ⚡ Finally, let's use your chart!
    chart
      .selection(chartContainer)
      .data(chartData) // Pass your chartData
      .props(chartProps) // Pass your chartProps
      .draw(); // 🚀 DRAW IT!
  });
</script>

<div id="chart" bind:this={chartContainer} />

<div class='chart-options'>
  <!-- ✏️ Create buttons that update your data/props variables when they're clicked! -->
  <button
    on:click={() => { chartData = [20, 40, 80] }}
  >New data</button>
  <button
    on:click={() => { circleFill = 'orange' }}
  >Orange fill</button>
</div>


<!-- ⚙️ This component will automatically create interactive documentation
for you chart that will update as a user plays with the custom props you
provided for above! -->
<AutoDoc {chartProps} {chart} />

<!-- 🖌️ Style your demo page here -->
<style lang='scss'>
  .chart-options{
    button {
      padding: 5px 15px;
    }
  }
</style>