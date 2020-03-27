export default {
  methods: {
    submitForm() {
      this.$refs.modalTaskName.$refs.name.validate();
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask();
      }
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
