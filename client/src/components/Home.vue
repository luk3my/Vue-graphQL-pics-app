<template>
  <div class="container">

    <!-- <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="./lake.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="./asphalt-autumn.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="./lake.jpg" alt="Third slide">
        </div>
      </div>
    </div> -->

   <!-- <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img class="d-block w-100" src="https://placeimg.com/1080/500/animals" alt="First slide">
            <div class="carousel-caption d-none d-md-block">
                <h5>My Caption Title (1st Image)</h5>
                <p>The whole caption will only show up if the screen is at least medium size.</p>
            </div>
        </div>
        <div class="carousel-item">
            <img class="d-block w-100" src="https://placeimg.com/1080/500/arch" alt="Second slide">
        </div>
        <div class="carousel-item">
            <img class="d-block w-100" src="https://placeimg.com/1080/500/nature" alt="Third slide">
        </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div> -->

    <!-- <ApolloQuery :query="getPostsQuery">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">ERROR! {{error.message}}</div>
        <ul v-else v-for="post in data.getPosts" :key="post._id">
          <li>
            {{post.title}} {{post.imageUrl}} {{post.likes}}
          </li>
        </ul>
      </template>
    </ApolloQuery> -->

  </div>
</template>

<script>
  import { gql } from 'apollo-boost';

  export default {
    name: 'home',
    data() {
      return {
        getPostsQuery: gql`
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