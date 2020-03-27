<template>
  <q-card>
    <modal-header>Add task</modal-header>
    <q-form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <modal-task-name :name.sync="taskToSubmit.name" ref="modalTaskName" />
        <modal-task-description :description.sync="taskToSubmit.desc" />
        <modal-task-due-date :dueDate.sync="taskToSubmit.dueDate" />
        <modal-task-due-time :dueTime.sync="taskToSubmit.dueTime" v-if="taskToSubmit.dueDate" />
      </q-card-section>
      <modal-task-buttons />
    </q-form>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";
import mixinAddEditTask from "src/mixins/mixin-add-edit-task";
export default {
  mixins: [mixinAddEditTask],
  data() {
    return {
      taskToSubmit: {
        name: "",
        desc: "",
        dueDate: "",
        dueTime: "",
        completed: false
      }
    };
  },
  methods: {
    ...mapActions("tasks", ["addTask"]),
    submitTask() {
      this.addTask(this.taskToSubmit);
      this.$emit("close");
    }
  }
};
</script>