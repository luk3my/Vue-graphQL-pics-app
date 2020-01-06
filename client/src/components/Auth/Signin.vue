<template>
    <div class="container">
        <!-- Signin Title -->
        <h1>Sign In</h1>
        <b-form inline>
            <label class="sr-only" for="inline-form-input-name">Name</label>
            <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="User Name"></b-input>

            <label class="sr-only" for="inline-form-input-name">Pasword</label>
            <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Password"></b-input>

            <b-button variant="primary">Sign In</b-button>
        </b-form>
    </div>

</template>

<script>
    export default {
        name: 'Signin'
    }
</script>