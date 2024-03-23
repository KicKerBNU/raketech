<template>
  <h1>Google Maps</h1>
  <GoogleMap
    id="map"
    :api-key="googleApiKey"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="markerOptions" />
  </GoogleMap>
</template>
<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import { ref } from 'vue'

const googleApiKey = ref(import.meta.env.VITE_GOOGLE_API_KEY)

const center = { lat: 38.73306655883789, lng: -9.144887924194336 }
const markerOptions = {
  position: center,
  label: 'Neobrain Office',
  title: 'LADY LIBERTY'
}
</script>

<style scoped>
gmp-map {
  height: 100%;
}

html,
body {
  border-radius: 16px;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
