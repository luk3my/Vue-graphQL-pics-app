import Vue from "vue";
import Vuex from "vuex";

import { defaultClient as ApolloClient } from "../main";

import { GET_POSTS } from "../queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    }
  },
  actions: {
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      // use ApolloClient to fire getPosts query
      ApolloClient.query({
        query: GET_POSTS
      })
        .then(({ data }) => {
          // Get data from actions and pass to state via mutation
          // Commit passes data from actions along to a mutation function
          commit('setPosts', data.getPosts);
          commit('setLoading', false);
        })
        .catch(err => {
          commit('setLoading', false);
          console.log(err);
        });
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading
  },
  modules: {}
});
