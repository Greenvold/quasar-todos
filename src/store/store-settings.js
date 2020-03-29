import { LocalStorage } from "quasar";

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
  },
  setSettings(state, settings) {
    Object.assign(state.settings, settings);
  }
};

const actions = {
  setShow12HourFormat({ commit, dispatch }, value) {
    commit("setShow12HourFormat", value);
    dispatch("saveSettings");
  },
  setShowTasksInOneList({ commit, dispatch }, value) {
    commit("setShowTasksInOneList", value);
    dispatch("saveSettings");
  },
  saveSettings({ state }) {
    //quasar local storage plugin
    LocalStorage.set("settings", state.settings);
  },
  getSettings({ commit }) {
    let settings = LocalStorage.getItem("settings");
    if (settings) {
      LocalStorage.getItem("settings");
      commit("setSettings", settings);
    }
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
