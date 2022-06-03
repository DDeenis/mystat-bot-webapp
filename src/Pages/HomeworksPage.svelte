<script lang="ts">
  import {
    MystatHomeworkStatus,
    MystatHomeworkType,
  } from "mystat-api/dist/types";
  import { mystatApi } from "src/api/mystat";
  import HomeworksList from "src/components/Homeworks/HomeworksList.svelte";
  import Multiselect from "src/components/Multiselect/Multiselect.svelte";
  import {
    hwLocalizedTypes,
    hwLocalizedVariants,
    localizedToStatus,
    localizedToType,
  } from "src/helpers/homework";

  let homeworks = [];
  let hwStatus = MystatHomeworkStatus.Active;
  let page = 1;
  let hwType = MystatHomeworkType.Homework;

  let localizedStatus = "Текущие";
  let localizedType = "Домашние задания";

  const fetchHomeworks = (status: MystatHomeworkStatus, page, type) => {
    mystatApi.getHomeworkList(status, page, type).then((res) => {
      if (res.success) {
        homeworks = res.data;
      }
    });
  };

  $: fetchHomeworks(hwStatus, page, hwType);
  $: hwStatus = localizedToStatus(localizedStatus);
  $: hwType = localizedToType(localizedType);
</script>

<div class="hw-container">
  <div class="element">
    <Multiselect
      variants={hwLocalizedVariants}
      bind:selectedVariant={localizedStatus}
    />
  </div>
  <div class="element">
    <Multiselect
      variants={hwLocalizedTypes}
      bind:selectedVariant={localizedType}
    />
  </div>
  <HomeworksList items={homeworks} status={hwStatus} />
</div>

<style>
  .hw-container {
    display: flex;
    flex-direction: column;
  }

  .element {
    margin-bottom: 0.75rem;
  }
</style>
