<script setup>
import { RouterView } from 'vue-router'
import { useWeatherStore } from './stores/counter'
import CardToday from './components/CardToday.vue'
import Search from './components/Search.vue'
import CurrentData from './components/CurrentData.vue'
import Header from './components/Header.vue'

const store = useWeatherStore()
</script>

<template>
  <div class="main">
    <div class="main-container">
      <div class="container">
        <div v-if="store.SearchCity">
          <Search />
        </div>

        <div v-if="store.cityWeather" class="weather-container">
          <div class="today">
            <CardToday :Today="store.cityWeather.list[0]" />
            <div class="current-data">
              <Header />
              <RouterView />
              <CurrentData :current="store.cityWeather.list[0]" />
            </div>
          </div>
        </div>
        <div v-else>идет загрузка</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: #100e1c;
  justify-content: center;
  align-items: center;
}
.main-container {
  display: flex;
  height: 100%;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.weather-container {
  
  flex: 1;
  display: flex;
  flex-direction: column;
}
.current-data {
  margin-top: 25px;
  margin-left: 50px;
}
.today {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.timeMap {
  flex: 1;
}

.dailyMap {
  flex: 1;
}
@media (max-width: 1200px) {
  .today {
  background-color: #100e1c;
  flex-direction: column;
  margin: 0 auto;
}
}
</style>
