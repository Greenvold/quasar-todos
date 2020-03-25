<template>
  <q-item
    v-ripple
    clickable
    @click="updateTask({id:id,updates:{completed:!task.completed}})"
    :class="task.completed ? 'bg-orange-1' : ''"
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed" no-pointer-events />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{'text-strikethrough' : task.completed}">{{task.name}}</q-item-label>
      <q-item-label caption>{{task.desc}}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-sm" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{task.dueDate}}</q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{task.dueTime}}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>
    <q-item-section side>
      <q-btn flat round dense color="red" icon="delete" @click.stop="prompToDelete(id)" />
    </q-item-section>
  </q-item>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["task", "id"],
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
    }
  }
};
</script>
<style lang="scss">
</style>