![](./badge.svg)

# bluprint_chart-module-svelte

This [bluprint](https://github.com/reuters-graphics/bluprint) contains a framework for writing installable, reusable chart modules.

The template also contains a [Svelte](https://svelte.dev/) app that hosts a built-in interactive demo of your chart. But don't be fooled, chart modules are Just JS™. No prior Svelte knowledge required.

## When to use this

This bluprint may be for you if you're...

**... building a chart for re-use.**
  
- If you have a chart you or others are likely to use again and again, this template includes a strong pattern for reusability. It's built to publish an npm-installable version of your chart users can easily pull into any project. It also comes with strong conventions for handling customizing your chart, automatically documents how to use your chart and is battle-tested with modern JS frameworks.

**... working on a chart apart from the project it will be used in.** 

- If you're working with others or want to develop your chart in parallel to a larger project, this bluprint is a great way to sandbox your dataviz work. Once your chart is ready, you'll install it into your project, and as your chart develops, your colleagues can simply upgrade it through npm to get your latest code. For large projects, this is an especially good way to isolate your work and split a project between developers working with different technologies.

**... prototyping a chart.**

- This bluprint is a batteries-included development environment for charts. It's like a notebook, except at the end you can publish your chart as a simple JS library and install it anywhere else you need it. The built-in demo page is a nice place to play!

## When _not_ to use this

If you're on deadline and just trying to hammer out some viz code, publishing your chart separately then installing and wiring it up in another project from node_modules may be an extra step you don't want.

In that case, though, you can still use the great D3 boilerplate included in this package. Watch for some editor snippets you can use coming soon or just copy/paste the chart class in `src/js/index.js` into your project as a starting place.

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

6. The build process will bundle your chart module for others to install from GitHub. It will also create a GitHub docs page to preview your chart, which you can publish by updating the GitHub Pages settings on your repo in GitHub (use the `docs/` folder on the `master` branch). Don't forget to push to GitHub!


## Developing chart modules

Read more in the [DEVELOPING docs](./DEVELOPING.md) about how to write your chart module.
