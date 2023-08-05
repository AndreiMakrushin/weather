<script setup>
    import { useWeatherStore } from '../stores/counter'
    const store = useWeatherStore()
</script>
<template>
    <div>
      <div class="main-container">
        <div class="container">
          <div class="left-block">
            <div class="wind">
            <p>Скорость ветра</p>
            <h1>{{ Math.ceil(store.cityWeather.list[0].wind.speed) }} М/с</h1>
          </div>
          <div class="visibility wind">
            <p>Видимость</p>
            <h1>{{ (store.cityWeather.list[0].visibility / 1000).toFixed(1)}} К/м</h1>
          </div>
          </div>
          <div class="rigth-block">
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
    </div>
  </template>
  
  
  <style scoped>
.main-container {
  display: flex;
  color: white;
  justify-content: center; /* Добавлено */
  align-items: center; /* Добавлено */
}

.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center; /* Добавлено */
  align-items: center; /* Добавлено */
}

.left-block {
  width: 50%;
  margin-right: 8px;
}

.rigth-block {
  margin-left: 8px;
  width: 50%;
}

.wind {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 268.7px;
  font-size: 30px;
  padding: 20px;
  border-radius: 20px;
  background-color: #212331;
  margin: 15px;
}

.wind h1 {
  margin-top: 20px;
}

@media (max-width: 1200px) {
  .main-container {
    flex-direction: column;
  }

  .container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .wind {
    width: 260px;
    margin: 15px auto; /* Добавлено */
  }
}
</style>

