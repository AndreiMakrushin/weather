<script setup>
import { useWeatherStore } from '../stores/counter'
const store = useWeatherStore()
</script>
<template>
  <div>
    <div class="container-weather" :class="{ active: store.SearchCity }">
      <div class="weather">
        <div class="close" @click="store.SearchCity = false">
          <h3>X</h3>
        </div>
        <div class="block-search">
          <input type="text" placeholder="Введите город" v-model="store.citySelect" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container-weather.active {
  width: 400px;
  transition: width 0.5s ease;
}
.container-weather {
  z-index: 1;
  position: absolute;
  height: 79%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #212331;
  width: 0px;
  display: flex;
  flex-direction: column;
  transition: width 0.5s ease;
}
.weather {
  margin: 30px 0px 30px 0px;
  padding: 7px;
}
.close {
  font-size: 20px;
  margin-left: 90%;
  cursor: pointer;
  color: #e6e6e6;
  padding: 15px;
}
h3 {
  font-size: 30px;
}
.block-search input {
  width: 100%;
  margin-top: 20px;
  padding: 9px;
  font-size: 27px;
  border-radius: 20px;
  font-weight: 100;
}

@media (max-width: 1000px) {
  .container-weather.active {
    height: 700px;
    width: 910px;
    border-bottom-right-radius: 20px;
  }
}

@media (max-width: 800px) {
  .container-weather.active {
    height: 700px;
    max-width: 100%;
    border-bottom-right-radius: 20px;
  }
}
</style>
