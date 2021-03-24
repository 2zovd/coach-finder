<template>
  <div>
    <base-dialog :show="!!error" title="Error" @close="handleError">
      {{ error }}
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticationg" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input id="email" v-model.trim="login" type="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input id="password" v-model.trim="password" type="password" />
        </div>
        <p v-if="!formIsValid">Please enter valid email and password</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="swithAuthMode">{{
          switchModeButton
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    }
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Signup'
    },
    switchModeButton() {
      return this.mode === 'login' ? 'Signup instead' : 'Login instead'
    }
  },
  methods: {
    async submitForm() {
      this.formIsValid = true
      if(this.login === '' && !this.login.includes('@') && this.password.length < 6) {
        this.formIsValid = false
        return
      }
      this.isLoading = true

      const actionPayload = {
            email: this.login,
            password: this.password
          }

      try {
        if(this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload)
        } else {
          await this.$store.dispatch('signUp', actionPayload)
        }

        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
        this.$router.replace((redirectUrl))

      } catch(err) {
        this.error = err.message || 'Failed to authenticate'
      }

      this.isLoading = false
    },
    swithAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup'
      } else {
        this.mode = 'login'
      }
    },
    handleError() {
      this.error = null
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>