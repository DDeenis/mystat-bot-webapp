<script>
  export let item;
</script>

<div class="container">
  <p class="subject">{item.subject_name}</p>
  <p class="label time-label">
    {item.started_at} - {item.finished_at}
  </p>
  <p class="label room-label">Аудитория {item.room_name}</p>
  <p class="label teacher-label">{item.teacher_name}</p>
</div>

<style>
  .container {
    padding: 0.5rem;
    border: 1px solid rgb(228, 224, 224);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
  }

  .container > *:not(:last-child) {
    margin-bottom: 0.35rem;
  }

  .subject {
    font-weight: 600;
    text-align: center;
  }

  .label {
    padding: 0.25rem;
    border-radius: 12px;
    text-align: center;
  }

  .time-label {
    background-color: #c2ded1;
  }

  .room-label {
    background-color: #ece5c7;
  }

  .teacher-label {
    background-color: #8cc0de;
  }
</style>
