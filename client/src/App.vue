<template>
  <div>
    <!-- Horizontal Navbar -->
    <b-navbar toggleable="lg" type="dark" variant="info" fixed style="box-shadow: 2px 10px 10px rgba(0,0,0,0.3); z-index: 99999; margin-bottom: 15px;">

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- Horizontal Links -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav style="float: right">
          <b-nav-item v-for="item in horizontalNavItems" :key="item.title" :to="item.link">{{item.info}}</b-nav-item>
        </b-navbar-nav>

        <b-badge>
          <span slot="badge">1</span>
        </b-badge>

      </b-collapse>

      <!-- App Title -->
      <b-navbar-brand>
        <router-link to="/" tag="span" style="cursor: pointer">
          VueShare
        </router-link>
      </b-navbar-brand>

      <!-- Search Input -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search Posts"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>


      <!-- Sign out button -->

      <b-button @click="handleSignoutUser" variant="warning" to="/signout" v-if="user" style="margin-left: 15px;">Sign Out
        <b-badge>
        </b-badge>
      </b-button>

    </b-navbar>
    <!-- App content -->
    <main>
      <transition name="fade">
        <router-view/>
      </transition>
    </main>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'App',
    methods: {
      handleSignoutUser() {
        this.$store.dispatch('signoutUser');
      }
    },
    computed: {
      ...mapGetters(['user']),
      horizontalNavItems() {
        let items = [
          { info: 'POSTS', title: 'Posts', link: '/posts' },
          { info: 'SIGN IN', title: 'Sign In', link: '/signin' },
          { info: 'SIGN UP', title: 'Sign Up', link: '/signup' }
        ];
        if (this.user) {
          items = [
            { info: 'POSTS', title: 'Posts', link: '/posts' },
            { info: 'CREATE POST', title: 'Create Post', link: '/post/add' },
            { info: 'PROFILE', title: 'profile', link: '/profile' },
          ]
        }
        return items
      }
    }
  }

</script>


<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-property: all;
    transition-duration: 0.25s;
  }

  .fade-enter-active {
    transition-delay: 0.25s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateX(-25px);
  }
</style>