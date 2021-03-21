<template>
  <li>
    <div>
      <a :href="emailLink">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
  </li>
</template>

<script>
export default {
  name: 'RequestItem',
  props: {
    email: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  },
  computed: {
    emailLink() {
      return 'mailto:' + this.email
    }
  }
}
</script>