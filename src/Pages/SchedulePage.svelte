<script>
  import { mystatApi } from "src/api/mystat";
  import Schedule from "src/components/Schedule/Schedule.svelte";
  import { Datepicker } from "svelte-calendar";
  import dayjs from "dayjs";
  import "dayjs/locale/ru.js";
  import { isDatesEqual } from "src/helpers/dates";

  dayjs.locale("ru");

  let scheduleItems = [];
  let selected = new Date();
  let store;

  const theme = {
    calendar: {
      width: "700px",
      maxWidth: "100vw",
      legend: {
        height: "45px",
      },
      shadow: "0px 10px 26px rgba(0, 0, 0, 0.25)",
      colors: {
        text: {
          primary: "#333",
          highlight: "#fff",
        },
        background: {
          primary: "#fff",
          highlight: "#eb7400",
          hover: "#eee",
        },
        border: "#eee",
      },
      font: {
        regular: "1.5em",
        large: "25em",
      },
      grid: {
        disabledOpacity: ".35",
        outsiderOpacity: ".6",
      },
    },
  };

  $: {
    if ($store && !isDatesEqual(selected, $store.selected)) {
      selected = $store.selected;
      mystatApi.getScheduleByDate(selected).then((response) => {
        if (response.success) {
          scheduleItems = response.data;
          console.log(scheduleItems);
        }
      });
    }
  }
</script>

<div class="datepicker-container">
  <p>Выберите дату:</p>
  <Datepicker bind:store {theme} {selected} />
</div>
<Schedule items={scheduleItems} />

<style>
  .datepicker-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }

  .datepicker-container p {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }

  :global(.datepicker-container .contents-wrapper) {
    position: static;
    transform: none !important;
  }
</style>
