<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-5 col-lg-6 col-md-7">
            <h1 class="h2 text-center">Reset password</h1>
            <p class="lead text-center">Please enter new password</p>
            <div class="alert alert-danger" role="alert" v-if="error">
              <ul class="mb-0">
                <li v-for="message in error">{{ message.msg }}</li>
              </ul>
            </div>
            <form v-on:submit.prevent="reset">
              <div class="form-group">
                <input class="form-control" type="password" placeholder="Enter new password" v-model="user.newpassword">
              </div>
              <button class="btn btn-md btn-block btn-primary mb-2" role="button" type="submit">Reset</button>
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
  name: 'token',
  data () {
    return {
      error: null,
      token: null,
      user: {
        newpassword: null
      }
    }
  },
  async asyncData ({ redirect, app, params, error }) {
    return app.$axios.$get('/api/reset/' + params.token)
      .then(() => {
        return { token: params.token }
      })
      .catch((e) => {
        return redirect('/')
      })
  },
  methods: {
    reset () {
      this.error = null
      this.$axios.$post(`/api/reset/${this.token}`, {
        password: this.user.newpassword
      }).then(() => {
        return this.$router.push('/login')
      }).catch(e => {
        this.error = e.response.data
      })
    }
  }
}
</script>
