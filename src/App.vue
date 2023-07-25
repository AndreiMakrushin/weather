<script setup>
import { useWeatherStore } from './stores/counter'
import CardToday from './components/CardToday.vue'
import TimeMap from './components/TimeMap.vue'
import DayliMap from './components/DayliMap.vue'
import Search from './components/Search.vue'

const store = useWeatherStore()
</script>

<template>
  <div class="main-container">
    <div class="container">

        <div v-if="store.SearchCity">
          <Search />
        </div>

        <div v-if="store.cityWeather" class="weather-container">
          <div class="today">
            <CardToday :Today="store.cityWeather.list[0]" />
          </div>
          <div class="timeMap">
            <TimeMap :timemap="store.cityWeather.list" />
          </div>
          <div class="dailyMap">
            <DayliMap :daymap="store.cityWeather.list" />
          </div>
        </div>
        <div v-else>идет загрузка</div>

    </div>
  </div>
</template>

<style scoped>
.main-container {
  max-width: 1700px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.weather-container {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.today {
  flex: 1;
}

.timeMap {
  flex: 1;
}

.dailyMap {
  flex: 1;
}
</style>

