<script setup>
import { isSameDay } from 'date-fns'
import { useWeatherStore } from '../stores/counter';
import { onUnmounted } from 'vue';


onUnmounted(() => {
  console.log("компонено был удален");
})

const store = useWeatherStore()


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
    <div class="block-day-temperature">
      <div v-for="item in getWeatherForToday(store.cityWeather.list)" :key="item.dt" class="weather-item">
        <div class="weather-info">
          <p>{{ item.dt_txt.split(' ')[1].substring(0, 5) }}</p>
          <div class="weather-details">
            <img
              :src="'http://openweathermap.org/img/wn/' + item.weather[0].icon + '.png'"
              alt=""
              class="weather-icon"
            />
            <div class="temp">
              <p class="weather-temp-day">{{ Math.round(item.main.temp) }}°C</p>
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
.temp .weather-temp-night{
 color: #acacac;
}
</style>
