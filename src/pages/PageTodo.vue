<template>
  <q-page class="q-pa-md">
    <q-list separator bordered>
      <q-item-label header>General</q-item-label>
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key" />
      <q-item v-ripple></q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PageIndex",
  computed: {
    ...mapGetters("tasks", ["tasks"])
  },
  components: {
    task: require("components/Tasks/Task.vue").default
  }
};
</script>
