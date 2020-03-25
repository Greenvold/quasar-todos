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
    }
  }
};

const mutations = {
  updateTask(state, payload) {
    console.log(payload);

    Object.assign(state.tasks[payload.id], payload.updates);
  }
};

const actions = {
  updateTask({ commit }, payload) {
    commit("updateTask", payload);
  }
};

const getters = {
  tasks: state => {
    return state.tasks;
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
