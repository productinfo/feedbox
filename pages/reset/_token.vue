<template>
  <div class="col-md-8 col-lg-7 col-xl-6 offset-md-2 offset-lg-2 offset-xl-2 offset-xl-3 u-space-3 u-space-0-lg">
    <form class="mt-5" v-on:submit.prevent="reset">
      <div class="mb-7">
        <h2 class="h3 text-primary font-weight-normal mb-3">
          Reset password
        </h2>
        <p>Please enter new password.</p>
        <div class="alert alert-danger" role="alert" v-if="error">
          <ul class="mb-0">
            <li v-for="message in error" :key="message.msg">{{ message.msg }}</li>
          </ul>
        </div>
      </div>
      <div class="mb-4">
        <label class="h6 small d-block text-uppercase">New Password</label>
        <div class="input-group u-form">
          <input type="password" class="form-control" name="email" v-model="user.newpassword">
        </div>
      </div>
      <div class="row align-items-center mb-5">
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Reset
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
