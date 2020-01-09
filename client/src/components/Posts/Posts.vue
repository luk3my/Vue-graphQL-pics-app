<template>

     <b-container v-if="infiniteScrollPosts"> 
         <div v-for="post in infiniteScrollPosts.posts" :key="post._id">
            <img :src="post.imageUrl" height="100px">
            <h5>{{post.title}}</h5>
        </div> 
        <b-button @click="showMorePosts" v-if="showMoreEnabled">Fetch More</b-button>
    </b-container>
</template>

<script>
    import { INFINITE_SCROLL_POSTS } from '../../queries';

    const pageSize = 2;

    export default {
        name: "Posts",
        data() {
            return {
                pageNum: 1,
                showMoreEnabled: true
            }
        },
        apollo: {
            infiniteScrollPosts: {
                query: INFINITE_SCROLL_POSTS,
                variables: {
                    pageNum: 1,
                    pageSize
                }
            }
        },
        methods: {
            showMorePosts() {
                this.pageNum += 1;
                //Fetch more data and transform original result
                this.$apollo.queries.infiniteScrollPosts.fetchMore({
                    variables: {
                        //PageNum incrememted by 1
                        pageNum: this.pageNum,
                        pageSize
                    },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                        const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
                        const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;
                        this.showMoreEnabled = hasMore;

                        return {
                            infiniteScrollPosts: {
                                __typename: prevResult.infiniteScrollPosts.__typename,
                                //Merge previous posts with new posts
                                posts: [
                                    ...prevResult.infiniteScrollPosts.posts,
                                    ...newPosts
                                ],
                                hasMore
                            }
                        }
                    }
                })
            }
        }
    };

</script>