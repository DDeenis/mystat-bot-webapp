<script>
  import 'src/styles.css';
</script>

<div class="main-container">
  <slot />
</div>

<style>
  .main-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0.75rem;
  }
</style>
