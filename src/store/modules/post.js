import httpClient from "../../lib/axios";
import router from "@/router";

const state = {
  posts: [],
  post: {},
};

const getters = {
  getPosts: (state) => state.posts,
  getPost: (state) => state.post,
};

const mutations = {
  // POST mutations
  fetchPosts(state, data) {
    state.posts = data;
  },

  fetchPost(state, data) {
    state.post = data;
  },

  addPost() {},

  updatePost() {},

  deletePost() {},

  // COMMENTS mutations
  addComment(state, data) {
    const newData = [...state.post.comments, data];
    state.post.comments = newData;
  },

  updateComment(state, data) {
    const index = state.post.comments.indexOf(
      ...state.post.comments.filter((i) => i._id === data._id)
    );
    const newData = { ...state.post.comments[index], content: data.content };
    Object.assign(state.post.comments[index], newData);
  },

  deleteComment(state, data) {
    const newData = state.post.comments.filter((i) => i._id !== data._id);
    state.post.comments = newData;
  },

  // LIKES mutations
  addLike(state, data) {
    state.post.likes = [...state.post.likes, data];
  },

  deleteLike(state, data) {
    const newData = state.post.likes.filter((i) => i._id !== data._id);
    state.post.likes = newData;
  },
};

const actions = {
  // POST actions
  async fetchPosts({ commit }) {
    const { data } = await httpClient.get("/api/post");
    commit("fetchPosts", data.data);
  },

  async fetchPost({ commit }, id) {
    const { data } = await httpClient.get(`/api/post/${id}`);
    commit("fetchPost", data.data);
  },

  async fetchNewPost({ commit }, { headline, body }) {
    await httpClient.post("/api/post", {
      body,
      headline,
    });
    commit("addPost");
    router.push({ name: "base.home" });
  },

  async fetchUpdatePost({ commit }, { headline, body, id }) {
    await httpClient.put(`/api/post/${id}`, {
      body,
      headline,
    });
    commit("updatePost");
    router.push({ name: "post.findOne", params: { id } });
  },

  async fetchDeletePost({ commit }, id) {
    await httpClient.delete(`/api/post/${id}`);
    commit("deletePost");
    router.push({ name: "base.home" });
  },

  // COMMENTS actions
  async fetchNewComment({ commit }, { content, post }) {
    const { data } = await httpClient.post("/api/comment", {
      content,
      post,
    });
    commit("addComment", data.data);
  },

  async fetchUpdateComment({ commit }, { content, post, id }) {
    const { data } = await httpClient.put(`/api/comment/${id}`, {
      content,
      post,
    });
    commit("updateComment", data.data);
  },

  async fetchDeleteComment({ commit }, id) {
    const { data } = await httpClient.delete(`/api/comment/${id}`);
    commit("deleteComment", data.data);
  },

  // LIKES actions
  async fetchLike({ commit }, post) {
    const { data } = await httpClient.post("/api/like", {
      post,
    });
    commit("addLike", data.data);
  },

  async fetchDislike({ commit }, id) {
    const { data } = await httpClient.delete(`/api/like/${id}`);
    commit("deleteLike", data.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
