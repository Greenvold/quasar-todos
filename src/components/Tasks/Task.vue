<template>
  <q-item
    v-ripple
    clickable
    @click="updateTask({id:id,updates:{completed:!task.completed}})"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-2 '"
    v-touch-hold:1000.mouse="showEditTaskModal"
  >
    <q-item-section side top>
      <q-checkbox
        :value="task.completed"
        class="no-pointer-events"
        :color="!task.completed ? 'orange-1' : 'green-4 '"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{'text-strikethrough' : task.completed}">{{task.name | searchHighlight}}</q-item-label>
      <q-item-label caption>{{task.desc}}</q-item-label>
    </q-item-section>
    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-sm" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{task.dueDate | niceDate}}</q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{task.dueTime}}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn flat round dense color="red" icon="delete" @click.stop="prompToDelete(id)" />
        <q-btn flat round dense color="red" icon="edit" @click.stop="showEditTask = true" />
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask">
      <edit-task @close="showEditTask = false" :task="task" :id="id" />
    </q-dialog>
  </q-item>
</template>
<script>
import { mapActions } from "vuex";
import { date } from "quasar";

export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    prompToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure that you want to delete this task?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(this.id);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    showEditTaskModal() {
      this.showEditTask = true;
    }
  },
  components: {
    editTask: require("components/Tasks/Modals/EditTask").default
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "MMMM D");
    }
  }
};
</script>
<style lang="scss">
</style>