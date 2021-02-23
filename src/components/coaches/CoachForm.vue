<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstname">First name</label>
      <input id="firstname" v-model.trim="firstName" type="text" />
    </div>
    <div class="form-control">
      <label for="lastname">Last name</label>
      <input id="lastname" v-model.trim="lastName" type="text" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea id="description" v-model.trim="description" rows="5" />
    </div>
    <div class="form-control">
      <label for="rate">Hourly rate</label>
      <input id="rate" v-model.number="rate" type="number" />
    </div>
    <div class="form-control">
      <h3>Areasof expertise</h3>
      <div>
        <input id="frontend" v-model="areas" type="checkbox" value="frontend" />
        <label for="frontend">Frontend development</label>
      </div>
      <div>
        <input id="backend" v-model="areas" type="checkbox" value="backend" />
        <label for="backend">Backend development</label>
      </div>
      <div>
        <input id="career" v-model="areas" type="checkbox" value="career" />
        <label for="career">Career advisory</label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      career: '',
      description: '',
      rate: null,
      areas: []
    }
  },
  methods: {
    submitForm() {
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        career: this.career,
        description: this.description,
        rate: this.rate,
        areas: this.areas
      }
      console.log(formData)
    }
  }
}
</script>