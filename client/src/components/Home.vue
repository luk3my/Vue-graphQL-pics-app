<template>

  <div id="container">

    <div v-if="loading" class="">
      <b-spinner label="Loading..." style="width: 6rem; height: 6rem;"></b-spinner>
    </div>

    <b-carousel id="carousel-1" v-if="!loading && posts.length > 0" v-model="slide" :interval="4000" controls indicators background="#ababab"
      img-width="600" img-height="600" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
      <!-- Slide Item  -->
      <b-carousel-slide v-for="post in posts" :key="post._id" :caption="post.title" :text="post.description" :img-src="post.imageUrl"></b-carousel-slide>
    </b-carousel>
  </div>

</template>

<script>
  import { gql } from 'apollo-boost';
  import { mapGetters } from 'vuex';

  export default {
    name: 'home',
    created() {
      this.handleGetCarouselPosts();
    },
    computed: {
      ...mapGetters(['loading', 'posts'])
    },
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      handleGetCarouselPosts() {
        // Reach out to Vuex store, and fire action that gets posts for the carousel
        this.$store.dispatch("getPosts");
      },
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }

</script>