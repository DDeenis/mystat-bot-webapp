<script lang="ts">
  import { MystatHomeworkStatus } from "mystat-api/dist/types";
  import HomeworkActive from "./HomeworkItem/HomeworkActive.svelte";

  export let items: any[];
  export let status: MystatHomeworkStatus;

  const homeworkItems = {
    [MystatHomeworkStatus.Active]: HomeworkActive,
  };
</script>

<div class="list">
  {#each items as hw}
    <svelte:component this={homeworkItems[status]} item={hw} />
  {/each}
</div>

<style>
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5rem;
  }
</style>
