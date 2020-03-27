<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <search-bar />
      <sort />
    </div>
    <div class="relative-position">
      <no-tasks v-if="!Object.keys(tasksTodo).length && !search" />
      <p
        v-if="!Object.keys(tasksTodo).length && !Object.keys(completedTasks).length"
      >No search results.</p>
      <tasks-todo :tasksTodo="tasksTodo" />
      <tasks-completed :tasksCompleted="completedTasks" class="q-mt-lg" />
    </div>
    <div class="absolute-bottom text-center q-mb-lg" @click="showAddTask = !showAddTask">
      <q-btn round color="primary" size="24px" icon="add" />
    </div>
    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "PageIndex",
  data() {
    return {
      showAddTask: false
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "completedTasks"]),
    ...mapState("tasks", ["search"])
  },
  components: {
    task: require("components/Tasks/Task").default,
    addTask: require("components/Tasks/Modals/AddTask").default,
    tasksTodo: require("components/Tasks/TasksTodo").default,
    tasksCompleted: require("components/Tasks/TasksCompleted").default,
    noTasks: require("components/Tasks/NoTasksTodo").default,
    searchBar: require("components/Tasks/Tools/Search").default,
    sort: require("components/Tasks/Tools/Sort").default
  },
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  }
};
</script>
