<script lang="ts">
  import HomeworkItem from "./HomeworkItem.svelte";

  export let items: any[];
</script>

<div class="list">
  {#each items as hw}
    <HomeworkItem item={hw} />
  {/each}
</div>

<style>
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5rem;
  }
</style>
