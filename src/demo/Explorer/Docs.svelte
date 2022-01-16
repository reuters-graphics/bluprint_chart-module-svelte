<script>
  export let title = 'Data';
  export let data = {};
  import JSONTree from 'svelte-json-tree';
</script>

<section class="body-text wide">
  <h5>{title}</h5>
  <div class="code-explorer">
    <JSONTree value="{data}" />
  </div>
</section>

<style lang="scss" global>
  section.body-text.wide {
    margin: 2rem auto;
  }
  div.code-explorer {
    padding: 0.5em;
    background: #2E3440;
    border: 1px solid #ccc;
    color: white;

    --json-tree-string-color: #A3BE8C;
    --json-tree-symbol-color: #BF616A;
    --json-tree-boolean-color: #8FBCBB;
    --json-tree-function-color: #D08770;
    --json-tree-number-color: #B48EAD;
    --json-tree-label-color: #88C0D0;
    --json-tree-arrow-color: #E5E9F0;
    --json-tree-null-color: #81A1C1;
    --json-tree-undefined-color: #E5E9F0;
    --json-tree-date-color: #EBCB8B;
    /* position */
    --json-tree-li-indentation: 1.25rem;
    --json-tree-li-line-height: 1.3;
    /* font */
    --json-tree-font-size: 1.2rem;
    --json-tree-font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;

    ul,
    ol {
      font-size: 1.1rem;
    }

    span.comma {
      margin-left: 0 !important;
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
