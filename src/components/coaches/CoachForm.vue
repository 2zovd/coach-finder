<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First name</label>
      <input
        id="firstname"
        v-model.trim="firstName.val"
        type="text"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">First name is required</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Last name</label>
      <input
        id="lastname"
        v-model.trim="lastName.val"
        type="text"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Last name is required</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model.trim="description.val"
        rows="5"
        @blur="clearValidity('description')"
      />
      <p v-if="!description.isValid">Description is required</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly rate</label>
      <input
        id="rate"
        v-model.number="rate.val"
        type="number"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid">Rate is required</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of expertise</h3>
      <div>
        <input
          id="frontend"
          v-model="areas.val"
          type="checkbox"
          value="frontend"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend development</label>
      </div>
      <div>
        <input
          id="backend"
          v-model="areas.val"
          type="checkbox"
          value="backend"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend development</label>
      </div>
      <div>
        <input
          id="career"
          v-model="areas.val"
          type="checkbox"
          value="career"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career advisory</label>
      </div>
      <p v-if="!areas.isValid">At least one area should be selected</p>
    </div>
    <p v-if="!formIsValid">Please insert correct data</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-coach'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true
      },
      lastName: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      formIsValid: true
    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true
    },
    validateForm() {
      this.formIsValid = true
      if(this.firstName.val === '') {
        this.firstName.isValid = false
        this.formIsValid = false
      }
      if(this.lastName.val === '') {
        this.lastName.isValid = false
        this.formIsValid = false
      }
      if(this.description.val === '') {
        this.description.isValid = false
        this.formIsValid = false
      }
      if(!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false
        this.formIsValid = false
      }
      if(this.areas.val.length === 0) {
        this.areas.isValid = false
        this.formIsValid = false
      }
    },
    submitForm() {
      this.validateForm()
      if(!this.formIsValid) return
      const formData = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        description: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      }
      this.$emit('save-coach', formData)
    }
  }
}
</script>