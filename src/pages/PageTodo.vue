<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksDownloaded">
        <div class="row q-mb-lg">
          <search-bar />
          <sort />
        </div>
        <q-scroll-area class="relative-positio q-scroll-area-tasks">
          <no-tasks v-if="!settings.showTasksInOneList && !Object.keys(tasksTodo).length" />
          <p v-if="!Object.keys(tasksTodo).length && !Object.keys(completedTasks).length">
            No
            search
            results.
          </p>
          <tasks-todo :tasksTodo="tasksTodo" />
          <tasks-completed
            :tasksCompleted="completedTasks"
            class="q-mb-xl"
            :class="{'q-mt-lg' :!settings.showTasksInOneList}"
          />
        </q-scroll-area>
        <!-- nopointer events will disable mouse actions on that element -->
        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            round
            color="primary"
            size="24px"
            icon="add"
            class="all-pointer-events"
            @click="showAddTask = !showAddTask"
          />
        </div>
      </template>
      <template v-else>
        <div class="absolute-center">
          <q-spinner-ball color="primary" size="2em" />
          <q-tooltip :offset="[0, 8]">QSpinnerBall</q-tooltip>
        </div>
      </template>
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
    ...mapState("tasks", ["search", "tasksDownloaded"]),
    ...mapGetters("settings", ["settings"])
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
<style scoped>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>
