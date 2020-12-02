<!-- ⭐ Write an interactive DEMO of your chart in this component.
Follow the notes below! -->

<script>
  export let responsive; // eslint-disable-line ignore me...
  import { afterUpdate } from 'svelte';
  import AutoDoc from './AutoDoc.svelte';
  import test from '../js';
  
  let chartContainer;

  // 💪 Create a new chart instance of your module.
  let chart = new test();
  
  // 🎚️ Create variables for any data or props you want users to be able
  // to update in the demo. (And write buttons to update them below!)

  let chartData = getRandom();

  let circleFill = 'steelblue';
  // ...

  // 🎈 Tie your custom props back together into one chartProps object.
  $: chartProps = { fill: circleFill, chartData };
  
  afterUpdate(() => {
    // ⚡ Finally, let's use your chart!
    chart
      .selection(chartContainer)
      .data(chartData) // Pass your chartData
      .props(chartProps) // Pass your chartProps
      .draw(); // 🚀 DRAW IT!
  });


  function getRandom() {

    //Creates array of random variables for 3 circles.
    let arr = [];

    for (let i = 0; i < 3; i++) {
      let d = {
        x : Math.floor(Math.random() * Math.floor(100)), //Random int 0-100
        y : Math.floor(Math.random() * Math.floor(100)), //Random int 0-100
        r : Math.floor(Math.random() * Math.floor(30 - 10) + 10) //Random int 10-30
      }

      arr.push(d);
    }

    return arr;
    
  }


</script>

<div id="chart" bind:this={chartContainer} />

<div class='chart-options'>
  <!-- ✏️ Create buttons that update your data/props variables when they're clicked! -->
  <button on:click={() => { chartData = getRandom() }} >New data</button>
  <button on:click={() => { circleFill = 'orange' }}>Orange fill</button>
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