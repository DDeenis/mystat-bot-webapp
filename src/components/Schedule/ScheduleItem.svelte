<script>
  export let item;
</script>

<div class="container">
  <p class="subject">{item.subject_name}</p>
</div>

<style>
  .container {
    padding: 0.5rem;
    border: 1px solid rgb(228, 224, 224);
    border-radius: 4px;
    display: flex;
  }

  .container > *:not(:last-child) {
    margin-bottom: 0.35rem;
  }

  .subject {
    font-weight: 600;
  }
</style>
