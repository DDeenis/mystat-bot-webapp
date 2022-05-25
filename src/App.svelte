<script lang="ts">
  import MainPage from "./Pages/MainPage.svelte";
  import SchedulePage from "./Pages/SchedulePage.svelte";
  import "./styles.css";
</script>

<div class="main-container">
  <!-- <MainPage /> -->
  <SchedulePage scheduleFor="month" />
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
