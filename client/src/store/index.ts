import Vue from "vue";
import Vuex from "vuex";
import router from '../router/index';

import { defaultClient as ApolloClient } from "../main";

import { GET_CURRENT_USER, GET_POSTS, SIGNIN_USER } from "../queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false
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
    clearUser: state => (state.user = null)
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
          commit('setUser', data.getCurrentUser)
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
    signinUser({ commit }, payload) {
      ApolloClient.mutate({
        mutation: SIGNIN_USER,
        variables: payload
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.signinUser.token);
          // to make sure created method is run in main.js- run getCurrentUser, reload the page
          router.go();
        })
        .catch(err => {
          console.error(err);
        });
    },
    signoutUser: async ({ commit }) => {
      //Clear user in sate
      commit('clearUser')
      //Remove user in local storage
      localStorage.setItem('token', '');
      //End the session
      await ApolloClient.resetStore();
      //Redirect home - disallow acess to private pages
      router.push('/');
    }
  },
  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading
  },
  modules: {}
});
