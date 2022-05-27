<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let variants: string[] = [];

  let selectedVariant: string;

  const dispatch = createEventDispatcher();

  const onSelect = (variant: string) => () => {
    console.log(variant);
    selectedVariant = variant;
    dispatch("select", variant);
  };
</script>

<div class="container">
  {#each variants as variant}
    <div
      class="variant"
      class:variant__selected={variant === selectedVariant}
      on:click={onSelect(variant)}
    >
      {variant}
    </div>
  {/each}
</div>

<style>
  .container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .variant {
    width: max-content;
    padding: 0.5rem;
    border-radius: 14px;
    background-color: var(--color-primary);
    color: white;
    cursor: pointer;
  }

  .variant__selected {
    background-color: var(--color-secondary);
  }

  .container > *:not(:last-child) {
    margin-right: 0.5rem;
  }
</style>
