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
    background: #2e3440;
    border-radius: 0.3em;
    color: white;

    --json-tree-string-color: #a3be8c;
    --json-tree-symbol-color: #bf616a;
    --json-tree-boolean-color: #8fbcbb;
    --json-tree-function-color: #d08770;
    --json-tree-number-color: #b48ead;
    --json-tree-label-color: #88c0d0;
    --json-tree-arrow-color: #e5e9f0;
    --json-tree-null-color: #81a1c1;
    --json-tree-undefined-color: #e5e9f0;
    --json-tree-date-color: #ebcb8b;
    /* position */
    --json-tree-li-indentation: 1.25rem;
    --json-tree-li-line-height: 1.3;
    /* font */
    --json-tree-font-size: 1.2rem;
    --json-tree-font-family: Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;

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
