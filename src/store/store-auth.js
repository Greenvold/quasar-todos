import { LocalStorage, Loading } from "quasar";
import { firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
  loggedIn: false
};

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  }
};

const actions = {
  registerUser({}, payload) {
    Loading.show();
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log(res);
      })
      .catch(errorr => {
        showErrorMessage(error.message);
      });
  },
  loginUser({}, payload) {
    Loading.show();
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log(res);
      })
      .catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // if (errorCode === "auth/wrong-password") {
        //   alert("Wrong password.");
        // } else {
        //   alert(errorMessage);
        // }
        // console.log(error);
        showErrorMessage(error.message);
      });
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide();
      if (user) {
        commit("setLoggedIn", true);
        LocalStorage.set("loggedIn", true);
        this.$router.push("/");
        //root true allows us to dispatch actions from different module
        dispatch("tasks/fbReadData", null, { root: true });
      } else {
        commit("setLoggedIn", false);
        LocalStorage.set("loggedIn", false);
        this.$router.replace("/auth");
      }
    });
  },
  logoutUser() {
    firebaseAuth.signOut();
  }
};

const getters = {};

export default {
  // namespaced allows us to have mutliple stores within application
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
