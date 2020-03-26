<template>
  <q-page class="q-pa-md">
    <q-list separator bordered v-if="Object.keys(tasks).length">
      <q-item-label header>General</q-item-label>
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key" />
      <q-item v-ripple></q-item>
    </q-list>
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
    ...mapGetters("tasks", ["tasks"])
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    addTask: require("components/Tasks/Modals/AddTask.vue").default
  }
};
</script>
