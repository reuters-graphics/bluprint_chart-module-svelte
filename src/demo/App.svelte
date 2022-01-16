<script>
  import Nav from './Nav.svelte';
  import Resizer from './Resizer.svelte';
  import Chart from '../js/Demo.svelte';
  import Docs from './Docs.svelte';
  import CustomDocs from '../js/docs.svx';
  import Explorer from './Explorer/index.svelte';
</script>

<Nav />
<Resizer />
<article class="container-fluid">
  <div class='chart-well fluid'>
    <Chart />
  </div>
  <Docs />
  <Explorer />
  <section class='markdown-body wide'>
    <CustomDocs />
  </section>
</article>

<style lang="scss">
  article {
    padding-bottom: 80px;
    div.chart-well {
      width: 100%;
      padding: 20px 0;
      background-color: #eee;
      width: 100vw;
      margin-left: -15px;
      box-shadow: inset 0px 0px 8px 0px #ccc;
    }
  }
</style>
