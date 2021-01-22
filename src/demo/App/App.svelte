<script>
import Nav from './Nav.svelte';
import ChartContainer from './ChartContainer.svelte';
import Chart from '../Chart.svelte';

let width = '';
let setWidth = (w) => { width = w; };

</script>
<style lang="scss" global>
	@import './../src/scss/demo.scss';
</style>

<Nav />
<article class='container-fluid'>
	<ChartContainer width={width} setWidth={setWidth}>
		<Chart responsive={width} />
	</ChartContainer>
</article>
