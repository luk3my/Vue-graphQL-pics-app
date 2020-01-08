import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

import { defaultClient as ApolloClient } from "../main";

import { GET_CURRENT_USER, GET_POSTS, SIGNIN_USER, SIGNUP_USER, ADD_POST  } from "../queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null
  },

  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null)
  },

  actions: {
    getCurrentUser: ({ commit }) => {
      commit("setLoading", true);
      ApolloClient.query({
        query: GET_CURRENT_USER
      })
        .then(({ data }) => {
          commit("setLoading", false);
          //Add user to state
          commit("setUser", data.getCurrentUser);
          console.log(data.getCurrentUser);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },

    getPosts: ({ commit }) => {
      commit("setLoading", true);
      // use ApolloClient to fire getPosts query
      ApolloClient.query({
        query: GET_POSTS
      })
        .then(({ data }) => {
          // Get data from actions and pass to state via mutation
          // Commit passes data from actions along to a mutation function
          commit("setPosts", data.getPosts);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          console.log(err);
        });
    },

    addPost: ({ commit }, payload) => {
      ApolloClient.mutate({
        mutation: ADD_POST,
        variables: payload
      })
      .then(({ data }) => {
        console.log(data.addPost);
      })
      .catch(err => {
        console.error(err);
      })
    },

    signinUser({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      ApolloClient.mutate({
        mutation: SIGNIN_USER,
        variables: payload
      })
        .then(({ data }) => {
          commit("setLoading", false);
          localStorage.setItem("token", data.signinUser.token);
          // to make sure created method is run in main.js- run getCurrentUser, reload the page
          router.go();
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
          console.error(err);
        });
    },

      signupUser({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      ApolloClient.mutate({
        mutation: SIGNUP_USER,
        variables: payload
      })
        .then(({ data }) => {
          commit("setLoading", false);
          localStorage.setItem("token", data.signupUser.token);
          // to make sure created method is run in main.js- run getCurrentUser, reload the page
          router.go();
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
          console.error(err);
        });
    },

    signoutUser: async ({ commit }) => {
      //Clear user in sate
      commit("clearUser");
      //Remove user in local storage
      localStorage.setItem("token", "");
      //End the session
      await ApolloClient.resetStore();
      //Redirect home - disallow acess to private pages
      router.push("/");
    }
  },

  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error
  },

  modules: {}
});
