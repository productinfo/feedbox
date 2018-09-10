<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-5 col-lg-6 col-md-7">
          <div class="text-center">
            <h1 class="h2">Create account</h1>
            <p class="lead">Create account to start reading news</p>
            <div class="alert alert-danger" role="alert" v-if="error">
              {{ error }}
            </div>
            <form v-on:submit.prevent="register">
              <div class="form-group">
                <input class="form-control" type="text" placeholder="Name" v-model="user.name">
              </div>
              <div class="form-group">
                <input class="form-control" type="email" placeholder="Email" v-model="user.email">
              </div>
              <div class="form-group">
                <input class="form-control" type="password" placeholder="Password" v-model="user.password">
                <div class="text-left mt-2">
                  <small>
                    Your password should be at least 8 characters
                  </small>
                </div>
              </div>
              <button class="btn btn-md btn-block btn-primary mb-2" role="button" type="submit">Create account</button>
              <small>
                By clicking 'Create Account' you agree to our <a href="#">Terms of Use</a>
              </small>
            </form>
          </div>
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
        this.error = e.response.data.msg
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
