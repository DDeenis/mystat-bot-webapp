<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let variants: string[] = [];
  export let selectedVariant: string | undefined = undefined;

  const dispatch = createEventDispatcher();

  const onSelect = (variant: string) => () => {
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

  .container > * {
    margin-right: 0.25rem;
    margin-bottom: 0.25rem;
  }
</style>
