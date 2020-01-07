<template>
    <div class="container">
        <!-- Signin Title and form-->
        <h1>Sign In</h1>
        <b-form inline @submit.prevent="handleSigninUser" style="margin-top: 20px;">
            <label class="sr-only" for="inline-form-input-name">Name</label>
            <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="User Name" v-model="username"></b-input>

            <label class="sr-only" for="inline-form-input-name">Pasword</label>
            <b-input id="inline-form-input-password" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Password" v-model="password"></b-input>

            <b-button variant="primary" type="submit">Sign In</b-button>
        </b-form>

        <p style="margin-top: 20px;">Don't have an account yet?
            <router-link to="/signup">Sign up here</router-link>
        </p>

    </div>

</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'Signin',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        computed: {
            ...mapGetters(["user"])
        },
        watch: {
            user(value) {
                //If user value changes -redirect to the home page
                if (value) {
                    this.$router.push("./");
                }
            }
        },
        methods: {
            handleSigninUser() {
                this.$store.dispatch('signinUser', {
                    username: this.username,
                    password: this.password
                });
            }
        }
    };

</script>