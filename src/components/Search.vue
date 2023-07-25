<script setup>
import { useWeatherStore } from '../stores/counter'
const store = useWeatherStore()
</script>
<template>
  <div>
    <div class="container-weather">
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
.container-weather {
  position: absolute;
  font-family: 'Poppins', sans-serif;
  color: aliceblue;
  background-color: #212331;
  display: flex;
  max-width: 390px;
  padding: 10px;
  height: 630px;
}
.close {
  cursor: pointer;
  position: absolute;
  top: 4%;
}
.weather {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.block-search input {
  font-size: 35px;
  padding: 5px;
  margin-top: 100px;
  width: 96%;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  color: aliceblue;
  background-color: #212331;
}
h3 {
  margin: 0;
  padding: 0;
}
</style>
