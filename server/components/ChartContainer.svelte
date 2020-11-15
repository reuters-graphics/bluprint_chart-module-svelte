<script>
  import { faDesktop, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
  import Icon from 'fa-svelte';

  export let width = '';
  export let setWidth = (w) => { width = w; }
</script>

<style lang="scss">
div.size-options{
  position: fixed;
  bottom: 0;
  width: 100vw;
  left: 0;
  padding: 10px 0;
  text-align: center;
  font-size: 18px;
  color: #ccc;

  & > div {
    width: 205px;
    margin: 0 auto;
    display: flex;  
  }

  button{
    border-radius: 0;
    border: 1px solid #ccc;
    border-right: 0;
    height: 18px;
    width: 20px;
    outline: none;
    &.active {
      background-color: #ccc;
    }
    &:first-of-type{
      margin-left: 10px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &:last-of-type{
      margin-right: 10px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border-right: 1px solid #ccc;
    }
  }
}
</style>


<section class={`graphic borderless ${width}`}>
  <slot></slot>
</section>
<div class='size-options'>
  <div>
    <Icon icon={faDesktop} />
    <button
      class={width === 'fluid' ? 'active' : ''}
      on:click={() => setWidth('fluid')}
    />
    <button
      class={width === 'widest' ? 'active' : ''}
      on:click={() => setWidth('widest')}
    />
    <button
      class={width === 'wider' ? 'active' : ''}
      on:click={() => setWidth('wider')}
    />
    <button
      class={width === 'wide' ? 'active' : ''}
      on:click={() => setWidth('wide')}
    />
    <button
      class={width === '' ? 'active' : ''}
      on:click={() => setWidth('')}
    />
    <button
      class={width === 'mobile' ? 'active' : ''}
      on:click={() => setWidth('mobile')}
    />
    <Icon icon={faMobileAlt} />
  </div>
</div>