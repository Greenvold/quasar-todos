<template>
  <div v-if="Object.keys(tasksTodo).length">
    <list-header bgcolor="bg-orange-4">Todo</list-header>
    <q-list separator bordered>
      <q-item-label header>General</q-item-label>
      <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key" />
      <q-item v-ripple></q-item>
    </q-list>
  </div>
</template>
<script>
export default {
  props: ["tasksTodo"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    listHeader: require("components/Tasks/Shared/ListHeader").default
  }
};
</script>