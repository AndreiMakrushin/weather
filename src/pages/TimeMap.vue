<script setup>
import { isSameDay } from 'date-fns'
import { useWeatherStore } from '../stores/counter';
import { onMounted, ref } from 'vue';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

const swiperContainer = ref(null);
const store = useWeatherStore()

onMounted(() => {
  new Swiper(swiperContainer.value, {
    slidesPerView: 'auto',
  });
});

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
    <div class="block-day-temperature" ref="swiperContainer">
      <div class="swiper-wrapper">
        <div v-for="item in getWeatherForToday(store.cityWeather.list)" :key="item.dt" class="swiper-slide">
          <div class="weather-item">
            <div class="weather-info">
              <p>{{ item.dt_txt.split(' ')[1].substring(0, 5) }}</p>
              <div class="weather-details">
                <img
                  :src="store.getWeatherImage(item.weather[0].icon)"
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
    </div>
  </div>
</template>



<style scoped>
.block-day-temperature {
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
}

.weather-item {
  height: 172px;
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

.temp {
  text-align: center;
  font-size: 14px;
}

.temp .weather-temp-night {
  color: #acacac;
}


.swiper-slide {
  width: auto;
}

</style>