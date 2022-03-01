<template>
  <form @submit="login">
    <h1 class="mb-3">Login</h1>
    <div class="mb-3">
      <label for="Username" class="form-label" >Email</label>
      <input type="text" class="form-control text-center" required v-model="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label" >Password</label>
      <input type="password" class="form-control text-center" v-model="password">
    </div>
    <input type="submit" value="Login" class="btn btn-block w-100 btn-primary">
  </form>
  <div class="mt-3">
    <router-link to="/register">Register</router-link>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login(e) {
      e.preventDefault()

      const user = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('login', user)
    }
  }

}
</script>s

<style scoped>
  form {
    margin-top: 150px;
    display: grid;
    align-content: center;
    justify-content: center;
  }
</style>