import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";

// store modules
import auth from "@/store/modules/auth";
import post from "@/store/modules/post";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    post,
  },
  plugins: [createPersistedState()],
});
