<script setup>
import { useWeatherStore } from './stores/counter'

const store = useWeatherStore()
</script>

<template>
  <div>
    <input type="text" v-model="store.citySelect" placeholder="Введите нужный вам город" />
    {{ store.cityWeather }}
  </div>
</template>
