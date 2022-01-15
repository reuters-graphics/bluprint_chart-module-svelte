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
  <Chart />
  <Docs />
  <Explorer />
  <section class='markdown-body wide'>
    <CustomDocs />
  </section>
</article>

<style>
  article {
    padding-bottom: 80px;
  }
</style>
