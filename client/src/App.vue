<template>
  <v-app>
    <!-- Horizontal Navbar -->
    <b-navbar toggleable="lg" type="dark" variant="info" fixed>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- Horizontal Links -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav style="float: right">
          <b-nav-item v-for="item in horizontalNavItems" :key="item.title" :to="item.link">{{item.info}}</b-nav-item>
        </b-navbar-nav>
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

    </b-navbar>
    <!-- App content -->
    <main>   
      <router-view/>
    </main>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    computed: {
      horizontalNavItems() {
        return [
          {info: 'POSTS', title: 'Posts', link: '/posts'},
          {info: 'SIGN IN', title: 'Sign In', link: '/signin'},
          {info: 'SIGN UP', title: 'Sign Up', link: '/signup'}
        ]
      }
    }
  }
</script>
