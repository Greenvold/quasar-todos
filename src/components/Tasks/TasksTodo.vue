<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut  absolute-top"
  >
    <div v-if="Object.keys(tasksTodo).length">
      <list-header bgcolor="bg-orange-4" v-if="!settings.showTasksInOneList">Todo</list-header>
      <q-list separator bordered>
        <q-item-label header>General</q-item-label>
        <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key" />
      </q-list>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["tasksTodo"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    listHeader: require("components/Tasks/Shared/ListHeader").default
  },
  computed: {
    ...mapGetters("settings", ["settings"])
  }
};
</script>