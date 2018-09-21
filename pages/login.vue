<template>
  <div class="col-md-8 col-lg-7 col-xl-6 offset-md-2 offset-lg-2 offset-xl-2 offset-xl-3 u-space-3 u-space-0-lg">
    <form class="mt-5" v-on:submit.prevent="login">
      <div class="mb-7">
        <h2 class="h3 text-primary font-weight-normal mb-2">
          Welcome <span class="font-weight-bold">back</span>
        </h2>
        <p>Login to start reading news.</p>
        <div class="alert alert-danger" role="alert" v-if="error">
          <ul class="mb-0">
            <li v-for="message in error" :key="message.msg">{{ message.msg }}</li>
          </ul>
        </div>
      </div>
      <div class="mb-4">
        <label class="h6 small d-block text-uppercase">Email address</label>
        <div class="input-group u-form">
          <input type="email" class="form-control" name="email" v-model="user.email">
        </div>
      </div>
      <div class="mb-4">
        <div class="d-flex justify-content-between align-items-center">
          <label class="h6 small d-block text-uppercase">Password</label>
          <div class="mb-2">
            <nuxt-link class="small u-link-muted" to="/forgot">Forgot password?</nuxt-link>
          </div>
        </div>
        <div class="input-group u-form">
          <input type="password" name="password" v-model="user.password" class="form-control">
        </div>
      </div>
      <div class="row align-items-center mb-5">
        <div class="col-6">
          <span class="small text-muted">Don't have an account?</span>
          <nuxt-link class="small u-link-muted" to="/register"> Signup</nuxt-link>
        </div>
        <div class="col-6 text-right">
          <button type="submit" class="btn btn-primary">
            Login
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
      user: {
        email: null,
        password: null
      },
      error: null
    }
  },
  computed: {
    redirect () {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    }
  },
  methods: {
    login () {
      this.error = null

      return this.$auth.loginWith('local', {
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
        .catch(e => {
          console.log(e.response)
          this.error = e.response.data
        })
    }
  }
}
</script>
