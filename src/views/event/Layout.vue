<script setup>
import { onMounted, ref } from 'vue'
import EventService from '@/services/EventService.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const { id } = defineProps(['id'])

const event = ref(null)
onMounted(() => {
  EventService.getEvent(id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
      if (error.response && error.response.status == 404) {
        router.push({
          name: '404Resource',
          params: { resource: 'event' },
        })
      } else {
        router.push({ name: 'NetworkError' })
      }
    })
})
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'event-details' }">Details</router-link>
      |
      <router-link :to="{ name: 'event-register' }">Register</router-link>
      |
      <router-link :to="{ name: 'event-edit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>
