<script setup>
import { useWeatherStore } from '../stores/counter'
const props = defineProps(['Today'])

const store = useWeatherStore()
</script>

<template>
  <div>
    <div class="container-weather">
      <div class="weather">
        <div class="search-btm">
          <div class="button">
            <button @click="store.SearchCity = true">Поиск города</button>
          </div>
        </div>
        <div class="main-block">
          <div class="main" v-for="item in props" :key="item.dt">
            <img :src="store.getWeatherImage(item.weather[0].icon)" class="weather-icon" />
            <h1>{{ Math.round(item.main.temp) }}°C</h1>
            <h3>{{ item.weather[0].description }}</h3>
            <p>Ощущается как {{ Math.round(item.main.feels_like) }} °C</p>
            <div class="today">
              <p>Сегодня</p>
              <p>{{ store.getWeekday(item.dt_txt).join(' ') }}</p>
            </div>
          </div>

          <div class="location">
            <div class="img-location">
              <img
                src="https://campussafetyconference.com/wp-content/uploads/2021/02/Perks_Location.png"
                alt=""
              />
            </div>
            <span>{{ store.citySelect.charAt(0).toUpperCase() + store.citySelect.slice(1) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-weather {
  height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #212331;
  width: 400px;
  display: flex;
  flex-direction: column;
}
.weather {
  padding: 7px;
}
.search-btm {
  display: flex;
  position: relative;
  margin: 30px 0px 20px 30px;
}
button {
  border: 2px solid #acacac;
  border-radius: 10px;
  color: #e6e6e6;
  padding: 10px 22px 10px 22px;
  font-size: 20px;
  background-color: #212331;
}
.main-block {
  color: #acacac;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.main-block img {
  width: 250px;
}
.main-block h1 {
  color: #e6e6e6;
  font-size: 96px;
  font-weight: 900;
}
.main-block h3 {
  color: #e6e6e6;
  font-size: 36px;
  font-weight: 700;
}
.main-block p {
  margin-top: 15px;
  margin-bottom: 35px;
}
.main-block .today {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.location {
  align-items: center;
  color: #acacac;
  display: flex;
  flex-direction: row;
}
.location img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

@media (max-width: 1350px) {
  .container-weather{
    width: 100%;
    border-bottom-right-radius: 20px;
  }
}
</style>
