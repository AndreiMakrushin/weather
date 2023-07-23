<script setup>
import { useWeatherStore } from '../stores/counter'
const store = useWeatherStore()
</script>
<template>
  <div>
    <div class="container-weather">
      <div class="weather">
        <div class="block-search">
          <input type="text" placeholder="Введите город" v-model="store.citySelect" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container-weather {
  font-family: 'Poppins', sans-serif;
  color: aliceblue;
  background-color: #212331;
  display: flex;
  max-width: 390px;
  padding: 10px;
  height: 590px;
}
.weather {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.block-search input {
  padding: 5px;
  margin-top: 120px;
  width: 96%;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  color: aliceblue;
  background-color: #212331;
}
</style>
