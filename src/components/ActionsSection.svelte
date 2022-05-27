<script lang="ts">
  export let header: string;
</script>

<section class="main-menu-actions">
  <div class="main-menu-actions_header">{header}</div>
  <div class="main-menu-actions_actions">
    <slot />
  </div>
</section>

<style>
  .main-menu-actions {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25rem;
  }

  .main-menu-actions_header {
    width: 100%;
    padding: 0.75rem;
    background-color: var(--color-secondary);
    color: white;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 0.5rem;
  }

  .main-menu-actions_actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5rem;
  }

  :global(.main-menu-actions_actions > :last-child:nth-child(odd)) {
    grid-column: span 2;
  }
</style>
