<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-5 col-lg-6 col-md-7">
          <div class="text-center">
            <h1 class="h2">Forgot password</h1>
            <p class="lead">Enter your email address to reset</p>
            <form>
              <div class="form-group">
                <input class="form-control" type="email" placeholder="Email" v-model="user.email">
              </div>
              <button class="btn btn-md btn-block btn-primary mb-2" role="button" type="submit">Send reset link</button>
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
      user: {
        email: null
      }
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