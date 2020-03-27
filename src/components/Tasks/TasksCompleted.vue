<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div v-if="Object.keys(tasksCompleted).length">
      <list-header bgcolor="bg-green-4">Completed</list-header>
      <q-list separator bordered>
        <q-item-label header>General</q-item-label>
        <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key" />
        <q-item v-ripple></q-item>
      </q-list>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["tasksCompleted"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    listHeader: require("components/Tasks/Shared/ListHeader").default
  }
};
</script>