<script lang="ts">
  import ScheduleItem from "./ScheduleItem.svelte";

  export let items: any[];

  $: console.log(items);
  
</script>

<div class="schedule-grid">
  {#if items.length === 0}
    <p class="no-elements">Нет пар</p>
  {/if}
  {#each items as item}
    <ScheduleItem {item} />
  {/each}
</div>

<style>
  .schedule-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5rem;
    padding-top: 1rem;
    position: relative;
  }

  .schedule-grid::before {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 1px;
    background-color: lightgray;
  }

  .no-elements {
    text-align: center;
    font-size: 1.125rem;
  }
</style>
