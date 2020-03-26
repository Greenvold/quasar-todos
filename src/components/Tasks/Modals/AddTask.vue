<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Adding new Todo</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup />
    </q-card-section>
    <q-form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <div class="row q-mb-sm">
          <q-input
            clearable
            outlined
            v-model="taskToSubmit.name"
            label="Task name"
            class="col"
            :rules="[val => !!val || 'Field is required']"
            ref="name"
            autofocus
          />
        </div>
        <div class="row q-mb-sm">
          <q-input
            clearable
            outlined
            v-model="taskToSubmit.desc"
            label="Task description"
            class="col"
            type="textarea"
            :rules="[val => !!val || 'Field is required']"
          />
        </div>
        <div class="row q-mb-sm">
          <q-input outlined v-model="taskToSubmit.dueDate" label="Due date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="taskToSubmit.dueDate" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="row q-mb-sm" v-if="taskToSubmit.dueDate">
          <q-input filled v-model="taskToSubmit.dueTime" label="Due time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="taskToSubmit.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Save" color="primary" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
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
    submitForm() {
      // this.$refs.name.validate();
      if (!this.$refs.name.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      this.addTask(this.taskToSubmit);
      this.$emit("close");
    }
  }
};
</script>