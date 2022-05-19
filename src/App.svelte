<script lang="ts">
  import MainPage from "./Pages/MainPage.svelte";
  import "./styles.css";
</script>

<div class="main-container">
  <MainPage />
</div>

<style>
  .main-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
  }
</style>
