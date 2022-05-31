<script>
  export let item;
</script>

<div class="hw-item-container">
  {item.name_spec}
</div>

<style>
  .hw-item-container {
    display: flex;
    flex-direction: column;
  }

  :global(.hw-item-container > *:not(:last-child)) {
    margin-bottom: 0.35rem;
  }
</style>
