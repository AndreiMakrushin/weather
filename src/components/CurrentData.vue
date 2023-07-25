<script setup>
    import { useWeatherStore } from '../stores/counter'
    const store = useWeatherStore()
</script>
<template>
    <div>
      <div class="main-container">
        <div class="container">
          <div class="wind">
            <p>Скорость ветра</p>
            <h1>{{ Math.ceil(store.cityWeather.list[0].wind.speed) }} М/с</h1>
          </div>
          <div class="visibility wind">
            <p>Видимость</p>
            <h1>{{ (store.cityWeather.list[0].visibility / 1000).toFixed(1)}} К/м</h1>
          </div>
          <div class="humidity wind">
            <p>Влажность</p>
            <h1>{{ store.cityWeather.list[0].main.humidity }} %</h1>
          </div>
          <div class="pressure wind">
            <p>Давление</p>
            <h1>{{ store.cityWeather.list[0].main.pressure }} мм.рт.ст</h1>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
<style scoped>
    .main-container{
        width: 100%;
        display: flex;
        color: white;
    }
    .wind{
        display:inline-block;
        font-size: 20px;
        padding: 30px;
        text-align: center;
        border-radius: 20px;
        background-color: #212331;
        margin: 15px;
    }
    .wind h1{
        margin-top: 20px;
    }
</style>