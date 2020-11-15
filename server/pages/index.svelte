<script>
import Nav from '../components/Nav.svelte';
import ChartContainer from '../components/ChartContainer.svelte';
import Chart from './../../src/demo/Chart.svelte';

let width = '';
let setWidth = (w) => { width = w; };

</script>
<style lang="scss" global>
	@import './../src/scss/demo.scss';
</style>

<svelte:head>
	<title>Reuters graphics reusable charts: MyChartModule</title>
</svelte:head>
<Nav />
<article class='container-fluid'>
	<ChartContainer width={width} setWidth={setWidth}>
		<Chart responsive={width} />
	</ChartContainer>
</article>
