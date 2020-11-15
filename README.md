![](./badge.svg)

# bluprint_chart-modile-svelte

This bluprint contains a framework for writing reusable chart modules, which are dataviz tools that can easily be used across different contexts and frameworks.

This also contains a [Sapper](https://sapper.svelte.dev/) app to create an interactive demo of your chart in [Svelte](https://svelte.dev/).

## Quickstart

1. If you haven't already, add this bluprint to your CLI.

  ```
  $ bluprint add https://github.com/reuters-graphics/bluprint_chart-module-svelte
  ```

2. Make a new directory and use the bluprint.

  ```
  $ mkdir my-project && cd my-project
  $ bluprint start
  ```
3. Once your bluprint is finished, be sure to create a repository in GitHub according to the slug you provided for your chart and add it to your repo.

  ```
  $ git remote add origin https://github.com/reuters.graphics/chart-module-my-dataviz.git
  ```


4. Start the development server to begin working on your chart module.

  ```
  $ runner start
  ```

5. When you're finished, build out your chart module as a library.

  ```
  $ runner build
  ```

5. The build process will bundle your chart module for others to install from GitHub. It will also create a GitHub docs page to preview your chart, which you can publish by updating the GitHub Pages settings on your repo in GitHub (use the `docs/` folder on the `master` branch).


## Developing chart modules

Read more in the [DEVELOPING docs](./DEVELOPING.md) about how to write your chart module.
