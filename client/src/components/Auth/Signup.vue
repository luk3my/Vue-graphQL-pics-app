<template>
    <div class="container">

        <!-- Error Alert -->
        <div v-if="error">
            <form-alert :message="error.message"></form-alert>
        </div>

        <!-- Signup Title and form-->

        <h1>Sign Up</h1>

        <b-form inline @submit.prevent="handleSignupUser" style="margin-top: 20px;">

            <label class="sr-only" for="inline-form-input-name">Name</label>
            <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="User Name" v-model="username"></b-input>

            <label class="sr-only" for="inline-form-input-name">Pasword</label>
            <b-input id="inline-form-input-password" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Password" v-model="password"></b-input>

             <label class="sr-only" for="inline-form-input-name">Email</label>
            <b-input id="inline-form-input-password" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Email" v-model="email"></b-input>

            <!-- Spinner in button if loading -->

            <b-button v-if="loading" variant="primary" disabled>
                <b-spinner small type="grow"></b-spinner>
                Loading...
            </b-button>

            <b-button v-else-if="!loading" variant="primary" type="submit">Sign Up</b-button>

        </b-form>

        <p style="margin-top: 20px;">Already have an account?
            <router-link to="/signin">Sign In here</router-link>
        </p>

    </div>

</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'Signup',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        computed: {
            ...mapGetters(["loading", "error", "user"])
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
            handleSignupUser() {
                this.$store.dispatch('signupUser', {
                    username: this.username,
                    password: this.password
                });
            }
        }
    };

</script>