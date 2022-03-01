<template>
  <form @submit="register">
    <h1 class="mb-3">Register</h1>
    <div class="mb-3">
      <label for="Username" class="form-label">Name</label>
      <input type="text" class="form-control text-center" required v-model="name">
    </div>
    <div class="mb-3">
      <label for="Username" class="form-label">Email</label>
      <input type="email" class="form-control text-center" required v-model="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control text-center" required v-model="password">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password Confirm</label>
      <input type="password" class="form-control text-center" required v-model="password_confirmation">
    </div>
    <input type="submit" value="Register" class="btn btn-block w-100 btn-primary"> 
  </form>
  <div class="mt-3 mb-5">
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    },
    methods: {
      register(e) {
        e.preventDefault()
        const user = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
        this.$store.dispatch('register', user)
      }
    },
}
</script>

<style scoped>
  form {
    margin-top: 75px;
    display: grid;
    align-content: center;
    justify-content: center;
  }
</style>