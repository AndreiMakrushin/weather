<script setup>
const props = defineProps(['Today'])


console.log(props);
</script>

<template>
  <div>
    <div>
      <h1>текущие данные</h1>
      <div class="active-day" v-for="item in props" :key="item.dt">
        <div class="weather-details">
          <div class="weather-temperature">Температура: {{ Math.round(item.main.temp) }}°C</div>
          <div class="weather-pressure">Давление: {{ item.main.pressure }} мм</div>
          <div class="weather-wind">Скорость ветра: {{ item.wind.speed }} м/с</div>
          <div class="weather-humidity">Влажность: {{ item.main.humidity }}</div>
          <div class="weather-description">Погода: {{ item.weather[0].description }}</div>
          <img
          :src="'http://openweathermap.org/img/wn/' + item.weather[0].icon + '.png'"
          alt=""
          class="weather-icon"
        />
        </div>
      </div>
    </div>
  </div>
</template>
