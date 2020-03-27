const state = {
  settings: {
    show12HourTimeFormat: true,
    showTasksInOneList: false
  }
};

const mutations = {
  setShow12HourFormat(state, value) {
    state.settings.show12HourTimeFormat = value;
  },
  setShowTasksInOneList(state, value) {
    state.settings.showTasksInOneList = value;
  }
};

const actions = {
  setShow12HourFormat({ commit }, value) {
    commit("setShow12HourFormat", value);
  },
  setShowTasksInOneList({ commit }, value) {
    commit("setShowTasksInOneList", value);
  }
};

const getters = {
  settings: state => {
    return state.settings;
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
