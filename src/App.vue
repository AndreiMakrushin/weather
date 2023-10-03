<script setup>
import { RouterView } from 'vue-router'
import { useWeatherStore } from './stores/counter'
import CardToday from './components/CardToday.vue'
import Search from './components/Search.vue'
import CurrentData from './components/CurrentData.vue'
import Header from './components/Header.vue'
import Loader from './components/Loader.vue'

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
        <div v-else><Loader /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main{
  list-style: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.main-container{
  display: flex;
  max-width: 1320px;
}
.container{
  border-radius: 25px;
  border: 2px solid #2d2d31;
  background: #100E1C;
}
.today{
  display: flex;
  flex-direction: row;
}
.current-data{
  margin: 20px;
  width: 100%;
}

@media (max-width: 1315px) {
  .today{
    flex-direction: column;
  }
  .container{
    border-radius: 0px;
  }
}
</style>
