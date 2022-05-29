<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Link } from "svelte-navigator";

  export let variant: "regular" | "danger" = "regular";
  // TODO: remove default value
  export let path: string;

  const isDanger = variant === "danger";
  const dispatch = createEventDispatcher();

  const onClick = () => dispatch("click");
</script>

<Link to={path}>
  <button class="button" class:button-danger={isDanger} on:click={onClick}>
    <slot />
  </button>
</Link>

<style>
  .button {
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

  .button-danger {
    background-color: rgb(226, 41, 41);
  }

  .button:hover {
    background-color: var(--color-primary-hover);
  }

  .button-danger:hover {
    background-color: rgb(196, 35, 35);
  }
</style>
