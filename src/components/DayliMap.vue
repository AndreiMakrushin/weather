<script setup>
import { getDay } from 'date-fns'
import { ref } from 'vue'
import { defineProps } from 'vue'

const props = defineProps(['daymap'])




const getWeatherForTodays = (daymap) => {
     const uniqueDates = new Set()
     const todayWeather = daymap.filter((time) => {
       const forecastDate = time.dt_txt.split(" ")[0]
       if (!uniqueDates.has(forecastDate)) {
         uniqueDates.add(forecastDate)
         return true
       }
       return false
     })
     return todayWeather
   }
   const getWeekday = (date) => {
     const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
     const dayIndex = getDay(new Date(date))
     return weekdays[dayIndex]
   }

</script>

<template>
  <div>
    <div v-for="item in getWeatherForTodays(props.daymap)" :key="item.dt" class="weather-item">
        <div class="weather-info">
          <div class="weather-date">{{ getWeekday(item.dt_txt) }}</div>
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
</template>