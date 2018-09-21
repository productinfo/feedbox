<template>
  <div class="col-md-8 col-lg-7 col-xl-6 offset-md-2 offset-lg-2 offset-xl-2 offset-xl-3 u-space-3 u-space-0-lg">
    <form class="mt-5" v-on:submit.prevent="register">
      <div class="mb-7">
        <h2 class="h3 text-primary font-weight-normal mb-2">
          Welcome to <span class="font-weight-bold logo-text">Feedbox</span>
        </h2>
        <p>Fill out form to get started.</p>
        <div class="alert alert-danger" role="alert" v-if="error">
          <ul class="mb-0">
            <li v-for="message in error" :key="message.msg">{{ message.msg }}</li>
          </ul>
        </div>
      </div>
      <div class="mb-4">
        <label class="h6 small d-block text-uppercase">Name</label>
        <div class="input-group u-form">
          <input type="text" class="form-control" name="name" v-model="user.name">
        </div>
      </div>
      <div class="mb-4">
        <label class="h6 small d-block text-uppercase">Email address</label>
        <div class="input-group u-form">
          <input type="email" class="form-control" name="email" v-model="user.email">
        </div>
      </div>
      <div class="mb-4">
        <label class="h6 small d-block text-uppercase">Password</label>
        <div class="input-group u-form">
          <input type="password" class="form-control" name="password" v-model="user.password">
        </div>
      </div>
      <div class="row align-items-center mb-5">
        <div class="col-7">
          <span class="small text-muted">Already have an account?</span>
          <nuxt-link class="small u-link-muted" to="/login"> Login</nuxt-link>
        </div>
        <div class="col-5 text-right">
          <button type="submit" class="btn btn-primary">
            Register
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  layout (context) {
    return 'auth'
  },
  data () {
    return {
      error: null,
      user: {
        name: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    register () {
      this.$axios.$post('/api/register', {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      }).then(data => {
        return this.$auth.loginWith('local', {
          data: {
            email: this.user.email,
            password: this.user.password
          }
        })
      }).catch(e => {
        this.error = e.response.data
      })
    }
  }
}
</script>
<style lang="scss">
.lead {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 400;
  color: #6c757d;
  line-height: 1.5;
}
</style>
