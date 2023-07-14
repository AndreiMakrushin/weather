<script setup>
import { isSameDay } from 'date-fns'
import { defineProps } from 'vue'

const props = defineProps(['timemap'])

const getWeatherForToday = (timemap) => {
  const currentDate = new Date()

  const todayWeather = timemap.filter((time) => {
    const forecastDate = new Date(time.dt_txt)
    return isSameDay(currentDate, forecastDate)
  })

  return todayWeather
}
</script>

<template>
  <div>
    почасовые данные
    <div v-for="time in getWeatherForToday(props.timemap)" :key="time.date">
      <div class="weather-details">
        {{ time.dt_txt.split(' ')[1].substring(0, 5) }}
        <div class="weather-temperature">Температура: {{ Math.round(time.main.temp) }}°C</div>
        <div class="weather-pressure">Давление: {{ time.main.pressure }} мм</div>
        <div class="weather-wind">Скорость ветра: {{ time.wind.speed }} м/с</div>
        <div class="weather-humidity">Влажность: {{ time.main.humidity }}</div>
        <div class="weather-description">Погода: {{ time.weather[0].description }}</div>
        <img
          :src="'http://openweathermap.org/img/wn/' + time.weather[0].icon + '.png'"
          alt=""
          class="weather-icon"
        />
      </div>
    </div>
  </div>
</template>
