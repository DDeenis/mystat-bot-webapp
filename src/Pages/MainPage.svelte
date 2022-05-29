<script>
  import ActionButton from "src/components/ActionButton.svelte";
  import ActionsSection from "src/components/ActionsSection.svelte";
  import { paths } from "src/helpers/routes";
</script>

<ActionsSection header={"Расписание"}>
  <ActionButton path={paths.schedule.today}>На сегодня</ActionButton>
  <ActionButton path={paths.schedule.tomorrow}>На завтра</ActionButton>
  <ActionButton path={paths.schedule.month}>На месяц</ActionButton>
</ActionsSection>
<ActionsSection header={"Домашние задания"}>
  <ActionButton path={paths.homeworks}>Посмотреть домашние задания</ActionButton
  >
</ActionsSection>
<ActionsSection header={"Экзамены"}>
  <ActionButton path={paths.exams.future}>Назначенные</ActionButton>
  <ActionButton path={paths.exams.all}>Все</ActionButton>
</ActionsSection>
<ActionsSection header={"Разное"}>
  <ActionButton path={paths.news}>Новости</ActionButton>
  <ActionButton path={paths.group}>Группа</ActionButton>
  <ActionButton path={paths.info}>Информация о себе</ActionButton>
  <ActionButton path={paths.info}>О боте</ActionButton>
</ActionsSection>
