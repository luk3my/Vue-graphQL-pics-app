<template>
  <div class="container">
    <h1>Home</h1>
    <ul v-for="post in getPosts" :key="post._id">
      <li>
        {{post.title}}
        {{post.imageUrl}} 
        {{post.description}} 
      </li>
    </ul>
  </div>
</template>

<script>
  import { gql } from 'apollo-boost';

  export default {
    name: 'home',
    apollo: {
      getPosts: {
        query: gql`
        query {
          getPosts {
          _id
          title
          imageUrl
          description
          likes
          }
        }
      `
      }
    }
  }

</script>