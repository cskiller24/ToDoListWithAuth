<template>
  <input type="submit" value="Logout" @click="this.$store.dispatch('logout')">
  <router-view></router-view>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>