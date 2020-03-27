<template>
  <q-card>
    <modal-header>Edit task</modal-header>
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
export default {
  props: ["task", "id"],
  data() {
    return {
      taskToSubmit: {
        name: this.task.name,
        desc: this.task.desc,
        dueDate: this.task.dueDate,
        dueTime: this.task.dueTime,
        completed: this.task.completed
      }
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitForm() {
      this.$refs.modalTaskName.$refs.name.validate();
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      this.updateTask({ id: this.id, updates: this.taskToSubmit });
      this.$emit("close");
    }
  },
  components: {
    modalHeader: require("components/Tasks/Modals/Shared/ModalHeader.vue")
      .default,
    modalTaskName: require("components/Tasks/Modals/Shared/ModalTaskName.vue")
      .default,
    modalTaskDueDate: require("components/Tasks/Modals/Shared/ModalTaskDueDate.vue")
      .default,
    modalTaskDueTime: require("components/Tasks/Modals/Shared/ModalTaskDueTime.vue")
      .default,
    modalTaskDescription: require("components/Tasks/Modals/Shared/ModalTaskDescription.vue")
      .default,
    modalTaskButtons: require("components/Tasks/Modals/Shared/ModalTaskButtons.vue")
      .default
  }
};
</script>