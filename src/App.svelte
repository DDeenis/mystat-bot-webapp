<script lang="ts">
  import HomeworksPage from "./Pages/HomeworksPage.svelte";
  import MainPage from "./Pages/MainPage.svelte";
  import "./styles.css";
</script>

<div class="main-container">
  <!-- <MainPage /> -->
  <HomeworksPage />
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
