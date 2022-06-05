<script>
  export let item;
</script>

<div class="hw-item-container">
  ✏️ Предмет: {item.name_spec}
  📖 Тема: {item.theme}
  💡 Преподаватель: {item.fio_teach}
  📅 Дата выдачи: {item.creation_time}
  ❕ Сдать до: {item.completion_time}
  ✒️ Комментарий: {item.comment}
  <a href={item.file_path} rel="noopener noreferrer">📁 Путь к файлу</a>
</div>

<style>
  .hw-item-container {
    display: flex;
    flex-direction: column;
  }

  :global(.hw-item-container > *:not(:last-child)) {
    margin-bottom: 0.35rem;
  }
</style>
