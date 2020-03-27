<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div v-if="Object.keys(tasksCompleted).length">
      <list-header bgcolor="bg-green-4" v-if="!settings.showTasksInOneList">Completed</list-header>
      <q-list separator bordered>
        <q-item-label header>General</q-item-label>
        <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key" />
      </q-list>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["tasksCompleted"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    listHeader: require("components/Tasks/Shared/ListHeader").default
  },
  computed: {
    ...mapGetters("settings", ["settings"])
  }
};
</script>