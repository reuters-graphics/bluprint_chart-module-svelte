<script>
  export let source;
  export let language;

  import Prism from 'prismjs';
  import 'prismjs/components/prism-bash';
  import 'prismjs/components/prism-scss';
</script>

<pre class="language-{language}">
  <code class="language-{language}">
    {@html Prism.highlight(source, Prism.languages[language], language)}
  </code>
</pre>