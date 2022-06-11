<script>
  import SchedulePage from 'src/Pages/SchedulePage.svelte';

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
</script>

<SchedulePage scheduleFor="day" defaultDate={tomorrowDate} />
