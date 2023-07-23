<script setup>
import { useWeatherStore } from './stores/counter'
import CardToday from './components/CardToday.vue'
import TimeMap from './components/TimeMap.vue'
import DayliMap from './components/DayliMap.vue'
import Search from './components/Search.vue'

const store = useWeatherStore()


</script>

<template>
  <div class="weather-app">
    <div v-if="store.SearchCity">
      <Search />
    </div>

    <div v-if="store.cityWeather" class="weather-container">
      <CardToday :Today="store.cityWeather.list[0]" />
      <TimeMap :timemap="store.cityWeather.list" />
      <DayliMap :daymap="store.cityWeather.list" />
    </div>
  </div>
</template>

<style>
input {
  font-size: 35px;
  font-family: 'poppins';
}
.weather-app {
  text-align: center;
}

.weather-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.weather-item {
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.weather-item:hover {
  transform: scale(1.05);
}

.weather-icon {
  width: 80px;
  height: 80px;
  margin-top: 10px;
}

.weather-date {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.weather-details {
  margin-top: 20px;
}

.weather-temperature,
.weather-pressure,
.weather-wind,
.weather-humidity,
.weather-description {
  margin-bottom: 10px;
}

.weather-temperature {
  font-size: 18px;
}

.weather-pressure,
.weather-wind,
.weather-humidity,
.weather-description {
  font-size: 14px;
  color: #666;
}
</style>
