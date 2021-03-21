<template>
  <div>
    <base-dialog title="Error" :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests recieved</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="!isLoading && hasRequests">
          <request-item
            v-for="request in recievedRequests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          ></request-item>
        </ul>
        <h3 v-else>You don't have any requests</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem'
export default {
  components: {
    RequestItem
  },
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    recievedRequests() {
      return this.$store.getters['requests/requests']
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests']
    }
  },
  created() {
    this.loadRequests()
  },
  methods: {
    async loadRequests() {
      this.isLoading = true
      try {
        await this.$store.dispatch('requests/loadRequests')
      } catch(error) {
        this.error = error.message || 'Something went wrong'
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>