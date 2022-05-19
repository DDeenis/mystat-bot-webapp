<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const onClick = () => dispatch("click");
</script>

<button class="main-menu-actions__button" on:click={onClick}><slot /></button>

<style>
  .main-menu-actions__button {
    width: 100%;
    padding: 0.75rem 0;
    background-color: var(--color-primary);
    color: white;
    font-weight: 500;
    text-align: center;
    border-radius: 3px;
    border: none;
    cursor: pointer;
  }

  .main-menu-actions__button:hover {
    background-color: var(--color-primary-hover);
  }
</style>
