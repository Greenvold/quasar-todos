<template>
  <q-page class="q-pa-md">
    <q-list separator bordered>
      <q-item-label header>General</q-item-label>
      <q-item
        v-for="task in tasks"
        :key="task.id"
        v-ripple
        clickable
        @click="task.completed =!task.completed"
        :class="task.completed ? 'bg-orange-1' : ''"
      >
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
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
      </q-item>
      <q-item v-ripple></q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      tasks: [
        {
          id: 1,
          name: "Go to Shop",
          desc: "Buy all the stuff you can find",
          dueDate: "2019/05/12",
          dueTime: "18:30",
          completed: false
        },
        {
          id: 2,
          name: "Get the XRP",
          desc: "Check the crypto market daily for prices changes.",
          dueDate: "2019/05/13",
          dueTime: "14:30",
          completed: false
        },
        {
          id: 3,
          name: "Watch the stocks",
          desc: "What happens on the stock. Check it on daily routine.",
          dueDate: "2019/05/11",
          dueTime: "15:30",
          completed: true
        }
      ]
    };
  }
};
</script>
