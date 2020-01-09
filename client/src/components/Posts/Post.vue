<template>
    <b-container v-if="getPost">
        <div class="card text-center">
            <div class="card-header" style="background-color: white">
                <span style="font-weight: bold; font-size: 22px; float: left;">{{getPost.title}} <b-badge v-if="user" style="cursor: pointer">Like</b-badge> <small style="color: grey">{{getPost.likes}} Likes</small></span>
                <a @click="goToPreviousPage" class="btn" style="float: right; background-color: lightgrey; color: white;"><span>Back</span></a>
            </div>
            <div class="card-body">
                <b-img :src="getPost.imageUrl" fluid style="height: 50vh" alt="user post image"></b-img>
            </div>
            <div class="card-footer text-muted" style="background-color: white;">
                <div style="float: left;">
                    Categories: <span v-for="(category, index) in getPost.categories" :key="index">
                       <b-badge style="margin-left: 5px;">{{category}}</b-badge>
                    </span>
                </div>
                <span style="font-weight: bold; font-size: 18px; margin-left: -20%">{{getPost.description}}</span>
            </div>
        </div>
    </b-container>
</template>

<script>
    import { GET_POST } from '../../queries';
    import { mapGetters } from 'vuex';

    export default {
        name: "Post",
        props: ["postId"],
        computed: {
            ...mapGetters(['user']),
        },
        apollo: {
            getPost: {
                query: GET_POST,
                variables() {
                    return {
                        postId: this.postId
                    }
                }
            }
        },
        methods: {
            goToPreviousPage() {
                this.$router.go(-1);
            },
        }
    }

</script>