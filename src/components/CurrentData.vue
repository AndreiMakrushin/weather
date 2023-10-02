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
            <h1>{{ Math.ceil(store.cityWeather.list[0].wind.speed)}}<span> M/с</span></h1>
          </div>
          <div class="wind">
            <p>Видимость</p>
            <h1>{{ (store.cityWeather.list[0].visibility / 1000).toFixed(1)}}<span> Км</span> </h1>
          </div>
        </div>
        <div class="rigth-block">
          <div class="wind">
            <p>Влажность</p>
            <h1>{{ store.cityWeather.list[0].main.humidity }}<span> %</span></h1>
          </div>
          <div class="wind">
            <p>Давление</p>
            <h1>{{ store.cityWeather.list[0].main.pressure }}<span> мм.рт.ст</span></h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<style scoped>
.main-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.container {
  display: flex;
  flex-direction: row;
}
.container p {
  font-size: 18px;
}
.container h1 {
  font-weight: 800;
  font-size: 64px;
}
.left-block,
.rigth-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 50px;
}
h1 span {
  font-size: 18px;
  font-weight: 900;
}
.wind {
  text-align: center;
  background-color: #212331;
  border-radius: 20px;
  padding: 35px 60px 35px 60px;
  width: 100%;
  margin: 20px;
}

@media (max-width: 1000px) {
  .container {
    flex-direction: column;
  }
}
</style>

