<script setup>
import { useWeatherStore } from '../stores/counter'
import { defineProps } from 'vue'

const store = useWeatherStore()

const props = defineProps(['daymap'])

const getWeatherForTodays = (daymap) => {
  const maxTemperatures = daymap.reduce((acc, time) => {
    const forecastDate = time.dt_txt.split(' ')[0]
    const temperature = time.main.temp
    const minTemperaturee = time.main.temp_min
    const pressure = time.main.pressure
    const speed = time.wind.speed
    const humidity = time.main.humidity
    const desc = time.weather[0].description
    const image = time.weather[0].icon

    const currentDate = new Date().toISOString().split('T')[0]

    if (forecastDate === currentDate) {
      return acc
    }

    const existingDay = acc.find((item) => item.date === forecastDate)

    if (!existingDay) {
      acc.push({
        date: forecastDate,
        temperature,
        pressure,
        speed,
        humidity,
        desc,
        image,
        minTemperaturee
      })
    } else if (temperature > existingDay.temperature) {
      existingDay.temperature = temperature
    }

    return acc
  }, [])

  return maxTemperatures
}
</script>

<template>
  <div>
    <div class="block-day-temperature">
      <div v-for="item in getWeatherForTodays(props.daymap)" :key="item.dt" class="weather-item">
        <div class="weather-info">
          <p class="weather-date">{{ store.getWeekday(item.date) }}</p>
          <div class="weather-details">
            <img
              :src="'http://openweathermap.org/img/wn/' + item.image + '.png'"
              alt=""
              class="weather-icon"
            />
            <div class="temp">
              <p class="weather-temp-day">{{ Math.round(item.temperature) }}°C</p>
              <p class="weather-temp-night">{{ Math.round(item.minTemperaturee) }}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.block-day-temperature {
  display: flex;
  flex-direction: row;
}
.weather-item {
  margin: 20px;
  color: white;
  background-color: #212331;
  border-radius: 20px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.weather-details .weather-icon {
  width: 100px;
  height: 100px;
}
.weather-info {
  text-align: center;
}
.temp{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.temp .weather-temp-night{
 color: #acacac;
}
</style>
