<script lang="ts">
  import MainPage from "./Pages/MainPage.svelte";
  import "./styles.css";

  console.log(window.Telegram.WebApp, window.Telegram?.WebApp?.initData);
</script>

<div class="main-container">
  <MainPage />
  <p style="word-break: break-all;">
    {JSON.stringify(window.Telegram?.WebApp)}
  </p>
  <p style="word-break: break-all;">{window.Telegram?.WebApp?.initData}</p>
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
