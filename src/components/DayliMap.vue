<script setup>
import { getDay } from 'date-fns'
import { defineProps } from 'vue'

const props = defineProps(['daymap'])

const getWeatherForTodays = (daymap) => {
  const maxTemperatures = daymap.reduce((acc, time) => {
    const forecastDate = time.dt_txt.split(' ')[0]
    const temperature = time.main.temp
    const pressure = time.main.pressure
    const speed = time.wind.speed
    const humidity = time.main.humidity
    const desc = time.weather[0].description
    const image = time.weather[0].icon

    const existingDay = acc.find((item) => item.date === forecastDate)

    if (!existingDay) {
      acc.push({
        date: forecastDate,
        temperature,
        pressure,
        speed,
        humidity,
        desc,
        image
      })
    } else if (temperature > existingDay.temperature) {
      existingDay.temperature = temperature
    }

    return acc
  }, [])

  return maxTemperatures
}

const getWeekday = (date) => {
  const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  const currentDate = new Date()
  const dayIndex = getDay(new Date(date)) + 1

  if (currentDate.getDate() === new Date(date).getDate()) {
    return 'Завтра'
  }
  return dayIndex === 7 ? 'Вс' : weekdays[dayIndex]
}
</script>

<template>
  <div>
    <div
      v-for="item in getWeatherForTodays(props.daymap.slice(1))"
      :key="item.dt"
      class="weather-item"
    >
      <div class="weather-info">
        <div class="weather-date">{{ getWeekday(item.date) }}</div>
        <div class="weather-details">
          <div class="weather-temperature">Температура: {{ Math.round(item.temperature) }}°C</div>
          <div class="weather-pressure">Давление: {{ item.pressure }} мм</div>
          <div class="weather-wind">Скорость ветра: {{ item.speed }} м/с</div>
          <div class="weather-humidity">Влажность: {{ item.humidity }}</div>
          <div class="weather-description">Погода: {{ item.desc }}</div>
        </div>
      </div>
      <img
        :src="'http://openweathermap.org/img/wn/' + item.image + '.png'"
        alt=""
        class="weather-icon"
      />
    </div>
  </div>
</template>
