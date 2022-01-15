<script>
  import { Highlight } from 'svelte-highlight';
  import { javascript, bash, scss } from 'svelte-highlight/src/languages';
  import { github } from 'svelte-highlight/src/styles';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  import Icon from 'fa-svelte';

  /**
   * ✏️ DOCUMENTATION STRINGS BELOW
   */

  // Installation docs
  const installDocs =
    '$ yarn add https://github.com/reuters-graphics/chart-module-my-chart-module.git';

  // JavaScript docs
  $: jsDocs = `// JS
import Chart from '@reuters-graphics/chart-module-my-chart-module';

const chart = new Chart();

chart
  .data(yourData)
  .props(yourProps)
  .draw();
`;

  // SCSS docs
  const styleDocs = `// SCSS
$MyChartModule-container: '.my-chart-module-container';

@import '@reuters-graphics/chart-module-my-chart-module/src/scss/chart';`;
</script>

<svelte:head>
  {@html github}
</svelte:head>

<section class="body-text wide">
  <div class="chart-docs">
    <h5>Quickstart</h5>
    <Highlight language="{bash}" code="{installDocs}" />
    <Highlight language="{scss}" code="{styleDocs}" />
    <Highlight language="{javascript}" code="{jsDocs}" />
  </div>
</section>

<!-- 🔗 A link to your chart's GitHub repo -->
<div class="repo-link">
  <a
    href="https://github.com/reuters-graphics/chart-module-my-chart-module"
    target="_blank"
  >
    <Icon icon="{faGithub}" />
  </a>
</div>

<!-- ✋ You can safely ignore this component...
  
... unless you want to customize the automatic documentation
for your chart. In which case, follow the notes below! -->
<style lang="scss">
  div.chart-docs {
    margin: 40px auto;
  }

  :global {
    pre code.hljs {
      background: #f8f8f8;
      border: 1px solid #ccc;
    }
  }

  div.repo-link {
    position: fixed;
    right: 15px;
    bottom: 10px;
    z-index: 999;
    a {
      color: #ddd;
      font-size: 46px;
      &:hover {
        color: #999;
      }
    }
  }
</style>
