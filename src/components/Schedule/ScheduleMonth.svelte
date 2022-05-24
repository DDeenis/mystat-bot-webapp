<script lang="ts">
  import ScheduleItem from "./ScheduleItem.svelte";

  export let items: Map<string, any[]>;
</script>

<div class="container">
  {#if items.size === 0}
    <p class="no-elements">Нет пар</p>
  {/if}
  {#each [...items.entries()] as [date, items]}
    <div class="entry">
      <p>{date}</p>
      <div class="schedule-grid">
        {#each items as item}
          <ScheduleItem {item} />
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .container {
    position: relative;
  }

  .container::before {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 1px;
    background-color: lightgray;
  }

  .schedule-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5rem;
  }

  .entry {
    margin-top: 1rem;
  }

  .entry p {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .no-elements {
    text-align: center;
    font-size: 1.125rem;
  }
</style>
