<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-5 col-lg-6 col-md-7">
        <h1 class="h2 text-center">Welcome Back 👋</h1>
        <p class="lead text-center">Log in to your account to continue</p>
        <div class="alert alert-danger" role="alert" v-if="error">
          <ul class="mb-0">
            <li v-for="message in error">{{ message.msg }}</li>
          </ul>
        </div>
        <form v-on:submit.prevent="login">
          <div class="form-group">
            <input class="form-control" type="email" placeholder="Email" v-model="user.email">
          </div>
          <div class="form-group">
            <input class="form-control" type="password" placeholder="Password" v-model="user.password">
            <div class="text-right mt-2">
              <small>
                <nuxt-link to="/forgot">Forgot password?</nuxt-link>
              </small>
            </div>
          </div>
          <button class="btn btn-md btn-block btn-primary mb-2" role="button" type="submit" @click="login">Log in</button>
          <small>
            Don't have an account yet?
            <nuxt-link to="/register">Create one</nuxt-link>
          </small>
        </form>
      </div>
    </div>
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
<style lang="scss">
.lead {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 400;
  color: #6c757d;
  line-height: 1.5;
}
</style>
