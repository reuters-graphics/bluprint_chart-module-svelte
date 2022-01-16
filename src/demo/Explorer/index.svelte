<script>
  import { Explorer } from '../stores';
  import Docs from './Docs.svelte';

  let docs = {};

  Explorer.subscribe((value) => {
    docs = value;
  });
</script>

{#each Object.keys(docs) as doc}
  <Docs title="{doc}" data="{docs[doc]}" />
{/each}
