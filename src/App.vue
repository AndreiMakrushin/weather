<script setup>
import { useWeatherStore } from './stores/counter'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import CardToday from './components/CardToday.vue'
import TimeMap from './components/TimeMap.vue'

const store = useWeatherStore()

const currentDate = new Date()
const month = format(currentDate, 'w d MMMM', { locale: ru })

const isTomorrow = (date) => {
  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const tomorrow = format(tomorrowDate, 'yyyy-MM-dd', { locale: ru })
  return date.includes(tomorrow)
}



</script>

<template>
  <div class="weather-app">
    <input type="text" v-model="store.citySelect" placeholder="Введите нужный вам город" />

    <div v-if="store.cityWeather" class="weather-container">
      <CardToday :Today="store.cityWeather.list[0]" />
      <TimeMap :timemap="store.cityWeather.list" />

      <div v-for="item in store.cityWeather.list.slice(1)" :key="item.dt" class="weather-item">
        <div class="weather-info">
          <div class="weather-date">{{ isTomorrow(item.dt_txt) ? 'Завтра' : item.dt_txt }}</div>
          <div class="weather-details">
            <div class="weather-temperature">Температура: {{ Math.round(item.main.temp) }}°C</div>
            <div class="weather-pressure">Давление: {{ item.main.pressure }} мм</div>
            <div class="weather-wind">Скорость ветра: {{ item.wind.speed }} м/с</div>
            <div class="weather-humidity">Влажность: {{ item.main.humidity }}</div>
            <div class="weather-description">Погода: {{ item.weather[0].description }}</div>
          </div>
        </div>
        <img
          :src="'http://openweathermap.org/img/wn/' + item.weather[0].icon + '.png'"
          alt=""
          class="weather-icon"
        />
      </div>
    </div>
    <div class="weather-date">{{ month }}</div>
  </div>
</template>

<style>
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
