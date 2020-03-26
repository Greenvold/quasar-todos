<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <search-bar />
    </div>
    <no-tasks v-if="!Object.keys(tasksTodo).length" />
    <tasks-todo :tasksTodo="tasksTodo" />
    <hr />
    <tasks-completed :tasksCompleted="completedTasks" class="q-mt-lg" />
    <div class="absolute-bottom text-center q-mb-lg" @click="showAddTask = !showAddTask">
      <q-btn round color="primary" size="24px" icon="add" />
    </div>
    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageIndex",
  data() {
    return {
      showAddTask: false
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "completedTasks"])
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    addTask: require("components/Tasks/Modals/AddTask.vue").default,
    tasksTodo: require("components/Tasks/TasksTodo.vue").default,
    tasksCompleted: require("components/Tasks/TasksCompleted.vue").default,
    noTasks: require("components/Tasks/NoTasksTodo").default,
    searchBar: require("components/Tasks/Tools/Search").default
  },
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  }
};
</script>
