<script>
  import ActionButton from "src/components/ActionButton.svelte";
  import ActionsSection from "src/components/ActionsSection.svelte";
</script>

<ActionsSection header={"Расписание"}>
  <ActionButton>На сегодня</ActionButton>
  <ActionButton>На завтра</ActionButton>
  <ActionButton>На месяц</ActionButton>
</ActionsSection>
<ActionsSection header={"Домашние задания"}>
  <ActionButton>Посмотреть домашние задания</ActionButton>
</ActionsSection>
<ActionsSection header={"Экзамены"}>
  <ActionButton>Назначенные</ActionButton>
  <ActionButton>Все</ActionButton>
</ActionsSection>
<ActionsSection header={"Разное"}>
  <ActionButton>Новости</ActionButton>
  <ActionButton>Группа</ActionButton>
  <ActionButton>Информация о себе</ActionButton>
  <ActionButton>О боте</ActionButton>
</ActionsSection>