<script lang="ts">
  import { mystatApi } from 'src/api/mystat';
  import Schedule from 'src/components/Schedule/Schedule.svelte';
  import { Datepicker } from 'svelte-calendar';
  import { isDatesEqual } from 'src/helpers/dates';
  import ScheduleMonth from 'src/components/Schedule/ScheduleMonth.svelte';
  import dayjs from 'dayjs';
  import 'dayjs/locale/ru.js';
  import { onMount } from 'svelte';

  export let defaultDate: Date = new Date();
  export let scheduleFor: 'day' | 'month' = 'day';

  dayjs.locale('ru');

  let scheduleItems: any[] = [];
  let scheduleItemsMonth = new Map<string, any[]>();
  let selected = defaultDate;
  let store: any;

  const fetchSchedule = (date: Date) => {
    const method = scheduleFor === 'day' ? mystatApi.getScheduleByDate : mystatApi.getMonthSchedule;
    method.call(mystatApi, date).then((response) => {
      if (response.success) {
        if (scheduleFor === 'day') {
          scheduleItems = response.data;
        } else {
          scheduleItemsMonth.clear();
          for (const item of response.data) {
            if (scheduleItemsMonth.has(item.date)) {
              scheduleItemsMonth.get(item.date)?.push(item);
            } else {
              scheduleItemsMonth.set(item.date, [item]);
            }
          }
          scheduleItemsMonth = scheduleItemsMonth;
        }
      }
    });
  };

  const theme = {
    calendar: {
      width: '700px',
      maxWidth: '100vw',
      legend: {
        height: '45px'
      },
      shadow: '0px 10px 26px rgba(0, 0, 0, 0.25)',
      colors: {
        text: {
          primary: '#333',
          highlight: '#fff'
        },
        background: {
          primary: '#fff',
          highlight: '#eb7400',
          hover: '#eee'
        },
        border: '#eee'
      },
      font: {
        regular: '1.5em',
        large: '25em'
      },
      grid: {
        disabledOpacity: '.35',
        outsiderOpacity: '.6'
      }
    }
  };

  $: {
    const selectedFromStore = $store?.selected;

    if (selectedFromStore && !isDatesEqual(selected, selectedFromStore)) {
      selected = $store.selected;
      fetchSchedule(selected);
    }
  }

  onMount(() => fetchSchedule(defaultDate));
</script>

<div class="datepicker-container">
  <p>Выберите дату</p>
  <Datepicker bind:store {theme} {selected} />
</div>
{#if scheduleFor === 'day'}
  <Schedule items={scheduleItems} />
{:else}
  <ScheduleMonth items={scheduleItemsMonth} />
{/if}

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
