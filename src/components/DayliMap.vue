<script setup>
import { useWeatherStore } from '../stores/counter'

const store = useWeatherStore()
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

    console.log(time.weather[0].icon)

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
      <div
        v-for="item in getWeatherForTodays(store.cityWeather.list)"
        :key="item.dt"
        class="weather-item"
       >
        <div class="weather-info">
          <p class="weather-date">
            {{
              [store.getWeekday(item.date)[0]]
                .concat(store.getWeekday(item.date).slice(1))
                .join(' ')
            }}
          </p>

          <div class="weather-details">
            <img :src="store.getWeatherImage(item.image)" alt="" class="weather-icon" />
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
  padding: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.weather-details .weather-icon {
  width: 150px;
  height: 150px;
}
.weather-date {
  font-size: 25px;
}
.weather-info {
  text-align: center;
}
.temp {
  font-size: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.temp .weather-temp-night {
  color: #acacac;
}
</style>
