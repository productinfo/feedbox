<template>
  <div class="col-md-8 col-lg-7 col-xl-6 offset-md-2 offset-lg-2 offset-xl-2 offset-xl-3 u-space-3 u-space-0-lg">
    <form class="mt-5" v-on:submit.prevent="forgot">
      <div class="mb-7">
        <h2 class="h3 text-primary font-weight-normal mb-3">
          Forgot password
        </h2>
        <div class="alert alert-success" role="alert" v-if="success">
              {{ success }}
        </div>
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
      <div class="row align-items-center mb-5">
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Sent reset link
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
