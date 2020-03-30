import Vue from "vue";
import { uid } from "quasar";
import { firebaseDb, firebaseAuth } from "boot/firebase";

const state = {
  tasks: {
    // ID1: {
    //   name: "Go to Shop",
    //   desc: "Buy all the stuff you can find",
    //   dueDate: "2019/05/12",
    //   dueTime: "18:30",
    //   completed: false
    // },
    // ID2: {
    //   name: "Get the XRP",
    //   desc: "Check the crypto market daily for prices changes.",
    //   dueDate: "2019/05/13",
    //   dueTime: "14:30",
    //   completed: false
    // },
    // ID3: {
    //   name: "Watch the stocks",
    //   desc: "What happens on the stock. Check it on daily routine.",
    //   dueDate: "2019/05/11",
    //   dueTime: "15:30",
    //   completed: true
    // }
  },
  search: "",
  sort: "dueDate",
  tasksDownloaded: false
};

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value;
  }
};

const actions = {
  updateTask({ dispatch }, payload) {
    dispatch("fbUpdateTask", payload);
  },
  deleteTask({ dispatch }, id) {
    dispatch("fbDeleteTask", id);
  },
  addTask({ dispatch }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    };
    dispatch("fbAddTask", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },
  fbReadData({ commit }) {
    let userTasks = firebaseDb.ref("tasks/" + firebaseAuth.currentUser.uid);
    //child added
    userTasks.on("child_added", snapshot => {
      let task = snapshot.val();
      let payload = {
        id: snapshot.key,
        task: task
      };
      commit("addTask", payload);
    });
    //child changed
    userTasks.on("child_changed", snapshot => {
      let task = snapshot.val();
      let payload = {
        id: snapshot.key,
        updates: task
      };
      commit("updateTask", payload);
    });
    //child deleted
    userTasks.on("child_removed", snapshot => {
      let task = snapshot.val();
      let payload = snapshot.key;
      commit("deleteTask", payload);
    });
  },
  fbAddTask({}, payload) {
    let taskRef = firebaseDb.ref(
      "tasks/" + firebaseAuth.currentUser.uid + "/" + payload.id
    );
    taskRef.set(payload.task);
  },
  fbUpdateTask({}, payload) {
    let taskRef = firebaseDb.ref(
      "tasks/" + firebaseAuth.currentUser.uid + "/" + payload.id
    );
    taskRef.update(payload.updates);
  },
  fbDeleteTask({}, id) {
    let taskRef = firebaseDb.ref(
      "tasks/" + firebaseAuth.currentUser.uid + "/" + id
    );
    taskRef.remove();
  }
};

const getters = {
  //default sorting
  tasksSorted: state => {
    let tasksSorted = {},
      keysOrdered = Object.keys(state.tasks);

    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase();
      let taskBProp = state.tasks[b][state.sort].toLowerCase();

      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      else return 0;
    });
    //filling the resulting array
    keysOrdered.forEach(key => {
      tasksSorted[key] = state.tasks[key];
    });

    return tasksSorted;
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(function(key) {
      let task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  completedTasks: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(function(key) {
      let task = tasksFiltered[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted;
    let tasksFiltered = {};
    if (state.search) {
      Object.keys(tasksSorted).forEach(function(key) {
        let task = tasksSorted[key];
        if (task.name.toLowerCase().includes(state.search.toLowerCase())) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return tasksSorted;
  }
};

export default {
  // namespaced allows us to have mutliple stores within application
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
