<script lang="ts">
  import MainPage from "./Pages/MainPage.svelte";
  import { Router } from "svelte-navigator";
  import "./styles.css";
  import PageRoutes from "./Pages/PageRoutes.svelte";
</script>

<Router primary={false}>
  <div class="main-container">
    <PageRoutes />
  </div>
</Router>

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
