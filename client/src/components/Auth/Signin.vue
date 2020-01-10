<template>

    <b-container style="width: 50%; margin-top: 30px;">
        <b-card>
            <!-- Error Alert -->
            <div v-if="error">
                <form-alert :message="error.message"></form-alert>
            </div>

            <!-- Signin Title and form-->
            <h1>Sign In</h1>

            <div>
                <b-form @submit.prevent="handleSigninUser">
                    <b-form-group id="input-group-1" label="Username:" label-for="input-1">
                        <b-form-input id="input-1" v-model="username" type="text" :state="validate_username" required placeholder="Enter email"></b-form-input>
                    </b-form-group>
                    <b-form-invalid-feedback :state="validate_username">
                        Your user ID must be 3-12 characters long.
                    </b-form-invalid-feedback>

                    <b-form-group id="input-group-3" label="Password:" label-for="input-3">
                        <b-form-input id="input-3" v-model="password" type="password" :state="validate_password" required placeholder="Enter password"></b-form-input>
                    </b-form-group>
                    <b-form-invalid-feedback :state="validate_password">
                        Your user ID must be 6-12 characters long.
                    </b-form-invalid-feedback>

                    <!-- <b-button type="submit" variant="primary" style="margin-right: 20px;">Sign Up</b-button> -->
                    <b-button v-if="loading" variant="primary" disabled>
                        <b-spinner small type="grow"></b-spinner>
                        Signing In.
                    </b-button>

                    <b-button class="was-validated" v-else-if="!loading" :disabled="loading && state" variant="primary" type="submit">Sign In</b-button>
                </b-form>
            </div>

            <p style="margin-top: 15px;">Don't have an account yet?
                <router-link to="/signup">Sign up here</router-link>
            </p>
        </b-card>
    </b-container>

</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'Signin',
        data() {
            return {
                username: '',
                password: '',
                is_pw_valid: false
            }
        },
        computed: {
            ...mapGetters(["loading", "error", "user"]),
            validate_username() {
                return this.username.length > 2 && this.username.length < 13

            },
            validate_password() {
                return this.password.length > 5 && this.username.length < 13
            }
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