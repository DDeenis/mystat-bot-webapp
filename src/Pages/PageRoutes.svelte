<script>
  import { paths } from "src/helpers/routes";
  import { Route } from "svelte-navigator";
  import HomeworksPage from "./HomeworksPage.svelte";
  import MainPage from "./MainPage.svelte";
  import SchedulePage from "./SchedulePage.svelte";

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
</script>

<Route path="/">
  <MainPage />
</Route>
<Route path={paths.schedule.today}>
  <SchedulePage scheduleFor="day" />
</Route>
<Route path={paths.schedule.tomorrow}>
  <SchedulePage defaultDate={tomorrowDate} scheduleFor="day" />
</Route>
<Route path={paths.schedule.month}>
  <SchedulePage scheduleFor="month" />
</Route>
<Route path={paths.homeworks}>
  <HomeworksPage />
</Route>
