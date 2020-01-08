<template>
    <b-container style="width: 50%; background-color:#f2f0f0; border-radius: 2%; padding: 8px; margin-top: 30px;">

        <!-- Error Alert -->
        <div v-if="error">
            <form-alert :message="error.message"></form-alert>
        </div>

        <!-- Signup Title and form-->

        <h1>Sign Up</h1>

        <div>
            <b-form @submit.prevent="handleSignupUser">
                <b-form-group id="input-group-1" label="Username:" label-for="input-1">
                    <b-form-input id="input-1" v-model="username" type="text" required placeholder="Enter email"></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Email address:" label-for="input-2">
                    <b-form-input id="input-2" v-model="email" type="email" required placeholder="Enter email"></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-3" label="Password:" label-for="input-3">
                    <b-form-input id="input-3" v-model="password" type="password" required placeholder="Enter password"></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-4" label=" Re Enter password:" label-for="input-4">
                    <b-form-input id="input-4" v-model="passwordConfirmation" type="password" required placeholder="Enter password"></b-form-input>
                </b-form-group>

                <!-- <b-button type="submit" variant="primary" style="margin-right: 20px;">Sign Up</b-button> -->
                <b-button v-if="loading" variant="primary" disabled>
                <b-spinner small type="grow"></b-spinner>
                Signing Up.
            </b-button>

            <b-button v-else-if="!loading" :disabled="loading" variant="primary" type="submit">Sign Up</b-button>
            </b-form>
        </div>

        <p style="margin-top: 20px;">Already have an account?
            <router-link to="/signin">Sign In here</router-link>
        </p>

    </b-container>

</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'Signup',
        data() {
            return {
                username: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            }
        },
        computed: {
            ...mapGetters(['loading', 'error', 'user'])
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
                //Signup user action
                this.$store.dispatch('signupUser', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
            }
        }
    };

</script>