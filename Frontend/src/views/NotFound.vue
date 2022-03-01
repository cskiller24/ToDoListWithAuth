<template>
    <h1>Page Not Found</h1>
    <div v-if="token">
      <router-link to="/tasks">Home</router-link>
    </div>
    <div v-if="!token">
      <router-link to="/login">Login</router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NotFound',
    computed: {
      ...mapState(['token'])
    }
}
</script>