<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-5 col-lg-6 col-md-7">
            <h1 class="h2 text-center">Forgot password</h1>
            <p class="lead text-center">Enter your email address to reset</p>
            <div class="alert alert-success" role="alert" v-if="success">
              {{ success }}
            </div>
            <div class="alert alert-danger" role="alert" v-if="error">
              <ul class="mb-0">
                <li v-for="message in error">{{ message.msg }}</li>
              </ul>
            </div>
            <form v-on:submit.prevent="forgot">
              <div class="form-group">
                <input class="form-control" type="email" placeholder="Email" v-model="user.email">
              </div>
              <button class="btn btn-md btn-block btn-primary mb-2" role="button" type="submit">Send reset link</button>
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
      error: null,
      success: null,
      user: {
        email: null
      }
    }
  },
  methods: {
    forgot () {
      this.error = null
      this.success = null
      this.$axios.$post('/api/forgot', {
        email: this.user.email
      }).then(data => {
        this.success = data.msg
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
