<script>
  import { faDesktop, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
  import Icon from 'fa-svelte';
  import { chartWidth } from './stores';
</script>

<div class="size-options">
  <div>
    <Icon icon="{faDesktop}" />
    <button
      class="{$chartWidth === 'fluid' ? 'active' : ''}"
      on:click="{() => chartWidth.set('fluid')}"></button>
    <button
      class="{$chartWidth === 'widest' ? 'active' : ''}"
      on:click="{() => chartWidth.set('widest')}"></button>
    <button
      class="{$chartWidth === 'wider' ? 'active' : ''}"
      on:click="{() => chartWidth.set('wider')}"></button>
    <button
      class="{$chartWidth === 'wide' ? 'active' : ''}"
      on:click="{() => chartWidth.set('wide')}"></button>
    <button
      class="{$chartWidth === '' ? 'active' : ''}"
      on:click="{() => chartWidth.set('')}"></button>
    <button
      class="{$chartWidth === 'mobile' ? 'active' : ''}"
      on:click="{() => chartWidth.set('mobile')}"></button>
    <Icon icon="{faMobileAlt}" />
  </div>
</div>

<style lang="scss">
  div.size-options {
    position: fixed;
    bottom: 0;
    width: 100vw;
    left: 0;
    padding: 10px 0;
    text-align: center;
    font-size: 18px;
    color: #ccc;
    background-color: rgba(255, 255, 255, 0.2);

    & > div {
      width: 205px;
      margin: 0 auto;
      display: flex;
      
    }

    button {
      border-radius: 0;
      border: 1px solid #ccc;
      border-right: 0;
      height: 18px;
      width: 20px;
      outline: none;
      &.active {
        background-color: #bbb;
      }
      &:first-of-type {
        margin-left: 10px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-of-type {
        margin-right: 10px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-right: 1px solid #ccc;
      }
    }
  }
</style>
