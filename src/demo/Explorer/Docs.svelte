<script>
  export let title = 'Data';
  export let data = {};
  import JSONTree from 'svelte-json-tree';
</script>

<section class="body-text wide">
  <h5>{title}</h5>
  <div
    class="code-explorer"
    style="--json-tree-font-size: 1rem; --json-tree-font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;"
  >
    <JSONTree value="{data}" />
  </div>
</section>

<style lang="scss" global>
  section.body-text.wide {
    margin: 2rem auto;
  }
  div.code-explorer {
    padding: 0.5em;
    background: #f8f8f8;
    border: 1px solid #ccc;

    ul,
    ol {
      font-size: 1rem;
    }

    label {
      margin-bottom: 0;
    }
    .spaced {
      letter-spacing: normal;
      margin-left: 0.5em;
    }
    div.container {
      padding: 0;
      padding-right: 100%;
    }
  }
</style>
