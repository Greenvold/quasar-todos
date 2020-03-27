import Vue from "vue";
import { uid } from "quasar";

const state = {
  tasks: {
    ID1: {
      name: "Go to Shop",
      desc: "Buy all the stuff you can find",
      dueDate: "2019/05/12",
      dueTime: "18:30",
      completed: false
    },
    ID2: {
      name: "Get the XRP",
      desc: "Check the crypto market daily for prices changes.",
      dueDate: "2019/05/13",
      dueTime: "14:30",
      completed: false
    },
    ID3: {
      name: "Watch the stocks",
      desc: "What happens on the stock. Check it on daily routine.",
      dueDate: "2019/05/11",
      dueTime: "15:30",
      completed: true
    },
    ID4: {
      name: "Go to Shop",
      desc: "Buy all the stuff you can find",
      dueDate: "2019/05/12",
      dueTime: "18:30",
      completed: false
    },
    ID5: {
      name: "Get the XRP",
      desc: "Check the crypto market daily for prices changes.",
      dueDate: "2019/05/13",
      dueTime: "14:30",
      completed: false
    },
    ID6: {
      name: "Watch the stocks",
      desc: "What happens on the stock. Check it on daily routine.",
      dueDate: "2019/05/11",
      dueTime: "15:30",
      completed: true
    },
    ID7: {
      name: "Go to Shop",
      desc: "Buy all the stuff you can find",
      dueDate: "2019/05/12",
      dueTime: "18:30",
      completed: false
    },
    ID8: {
      name: "Get the XRP",
      desc: "Check the crypto market daily for prices changes.",
      dueDate: "2019/05/13",
      dueTime: "14:30",
      completed: false
    },
    ID9: {
      name: "Watch the stocks",
      desc: "What happens on the stock. Check it on daily routine.",
      dueDate: "2019/05/11",
      dueTime: "15:30",
      completed: true
    },
    ID10: {
      name: "Go to Shop",
      desc: "Buy all the stuff you can find",
      dueDate: "2019/05/12",
      dueTime: "18:30",
      completed: false
    },
    ID11: {
      name: "Get the XRP",
      desc: "Check the crypto market daily for prices changes.",
      dueDate: "2019/05/13",
      dueTime: "14:30",
      completed: false
    },
    ID12: {
      name: "Watch the stocks",
      desc: "What happens on the stock. Check it on daily routine.",
      dueDate: "2019/05/11",
      dueTime: "15:30",
      completed: true
    },
    ID13: {
      name: "Go to Shop",
      desc: "Buy all the stuff you can find",
      dueDate: "2019/05/12",
      dueTime: "18:30",
      completed: false
    },
    ID14: {
      name: "Get the XRP",
      desc: "Check the crypto market daily for prices changes.",
      dueDate: "2019/05/13",
      dueTime: "14:30",
      completed: false
    },
    ID15: {
      name: "Watch the stocks",
      desc: "What happens on the stock. Check it on daily routine.",
      dueDate: "2019/05/11",
      dueTime: "15:30",
      completed: true
    }
  },
  search: "",
  sort: "dueDate"
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
  }
};

const actions = {
  updateTask({ commit }, payload) {
    commit("updateTask", payload);
  },
  deleteTask({ commit }, id) {
    commit("deleteTask", id);
  },
  addTask({ commit }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    };
    commit("addTask", payload);
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
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
