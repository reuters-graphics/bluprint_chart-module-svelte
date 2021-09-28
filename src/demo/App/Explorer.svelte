<script>
  export let title = 'Data';
  export let data = {};
  import JSONTree from 'svelte-json-tree';
</script>

<h5>{title}</h5>

<div
  class="code-explorer"
  style="--json-tree-font-size: 1rem; --json-tree-font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;"
>
  <JSONTree value={data} />
</div>

<style lang="scss" global>
  .code-explorer {
    padding: 0.5em;
    background: #f8f8f8;
    border: 1px solid #ccc;

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
