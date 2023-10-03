<script setup>
import { ref, onMounted } from 'vue'
import { useWeatherStore } from '../stores/counter'
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'

const swiperContainer = ref(null)

onMounted(() => {
  new Swiper(swiperContainer.value, {
    slidesPerView: 'auto'
  })
})

const store = useWeatherStore()
const getWeatherForTodays = (daymap) => {
  const currentDate = new Date().toISOString().split('T')[0]

  return daymap.reduce((acc, time) => {
    const forecastDate = time.dt_txt.split(' ')[0]

    if (forecastDate !== currentDate) {
      const existingDay = acc.find((item) => item.date === forecastDate)

      if (!existingDay) {
        acc.push({
          date: forecastDate,
          temperature: time.main.temp,
          pressure: time.main.pressure,
          speed: time.wind.speed,
          humidity: time.main.humidity,
          desc: time.weather[0].description,
          image: time.weather[0].icon,
          minTemperaturee: time.main.temp_min
        })
      } else if (time.main.temp > existingDay.temperature) {
        existingDay.temperature = time.main.temp
      }
    }

    return acc
  }, [])
}
</script>

<template>
  <div>
    <div class="block">
      <div class="block-day-temperature" ref="swiperContainer">
      <div class="swiper-wrapper">
        <div
          v-for="item in getWeatherForTodays(store.cityWeather.list)"
          :key="item.dt"
          class="swiper-slide"
        >
          <div class="weather-item">
            <div class="weather-info">
              <p class="weather-date">
                {{
                  [store.getWeekday(item.date)[0]]
                    .concat(store.getWeekday(item.date).slice(1))
                    .join(' ')
                }}
              </p>
              <div class="weather-details">
                <img :src="store.getWeatherImage(item.image)" class="weather-icon" />
                <div class="temp">
                  <p class="weather-temp-day">{{ Math.round(item.temperature) }}°C</p>
                  <p class="weather-temp-night">{{ Math.round(item.minTemperaturee) }}°C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<style scoped>
.swiper-slide {
  width: auto;
}
.block{
  width: 100vw;
  display: flex;
}
.block-day-temperature {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}
.weather-item {
  width: 134px;
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
  width: 100px;
  height: 100px;
}
.weather-date {
  font-weight: 400;
  font-size: 14px;
}
.weather-info {
  text-align: center;
}
.temp {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.temp .weather-temp-night {
  color: #acacac;
}
</style>
