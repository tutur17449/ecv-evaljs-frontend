import httpClient from "../../lib/axios";
import router from "@/router";

const state = {
  isAuth: false,
  user: undefined,
};

const getters = {
  getAuth: (state) => state.isAuth,
  getUser: (state) => state.user,
};

const mutations = {
  checkAuth(state, data) {
    state.isAuth = true;
    state.user = data;
  },

  login(state, data) {
    state.isAuth = true;
    state.user = data;
  },

  logout(state) {
    (state.isAuth = false), (state.user = undefined);
  },

  register() {},
};

const actions = {
  async checkAuth({ commit }) {
    const { data } = await httpClient.get("/auth/me");
    commit("checkAuth", data.data);
  },

  async fetchLogin({ commit }, { email, password }) {
    const { data } = await httpClient.post("/auth/login", { email, password });
    commit("login", data.data);
    router.push({ name: "base.home" });
  },

  async fetchRegister({ commit }, { givenName, familyName, email, password }) {
    await httpClient.post("/auth/register", {
      givenName,
      familyName,
      email,
      password,
    });
    commit("register");
    router.push({ name: "auth.signin" });
  },

  async fetchLogout({ commit }) {
    await httpClient.get("/auth/logout");
    commit("logout");
    if (router.history.current.name !== "base.home") {
      router.push({ name: "base.home" });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
