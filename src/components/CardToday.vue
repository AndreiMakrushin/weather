<script setup>
import { useWeatherStore } from '../stores/counter'
const props = defineProps(['Today'])

const store = useWeatherStore()
</script>

<template>
  <div>
    <div class="container-weather">
      <div class="weather">
        <div class="search-btm">
          <div class="button">
            <button @click="store.SearchCity = true">Поиск города</button>
          </div>
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="main-block">
          <div class="main" v-for="item in props" :key="item.dt">
            <img :src="store.getWeatherImage(item.weather[0].icon)" class="weather-icon" />
            <h1>{{ Math.round(item.main.temp) }}°C</h1>
            <h3>{{ item.weather[0].description }}</h3>
            <p>Ощущается как {{ Math.round(item.main.feels_like) }} °C</p>
            <div class="today">
              <p>Сегодня</p>
              <p>{{ store.getWeekday(item.dt_txt).join(' ') }}</p>
            </div>
          </div>
        </div>
        <div class="location">
          <div class="img-location">
            <img
              src="https://campussafetyconference.com/wp-content/uploads/2021/02/Perks_Location.png"
              alt=""
            />
          </div>
          <p>{{ store.citySelect }}</p>
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
  padding: 15px;
  max-width: 700px;
  height: 100%;
}
.weather {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-btm {
  margin: 15px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.button {
  cursor: pointer;
  margin-right: 200px;
}
h1 {
  margin: 0 120px;
  font-weight: 900;
  font-size: 130px;
}
h3 {
  font-size: 35px;
  font-weight: 800;
  letter-spacing: 4px;
}
.main {
  text-align: center;
}
.main img {
  width: 350px;
  height: 350px;
}
.location {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
}

.img-location img {
  width: 50px;
  height: 50px;
}
.today {
  margin: 0 auto;
  max-width: 400px;
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
p {
  font-size: 25px;
  color: #acacac;
}
.today p {
  margin: 5px;
}
button {
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  background-color: #212331;
  font-size: 20px;
  font-weight: 500;
  color: #e6e6e6;
  width: 180px;
  height: 50px;
  top: 42px;
  left: 41px;
}
.switch {
  margin-top: 8px;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  border: 1px solid #ccc;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightcyan;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-image: url('https://catherineasquithgallery.com/uploads/posts/2021-03/1614546217_107-p-solntse-na-belom-fone-112.png');
  background-size: cover;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #212331;
}

input:checked + .slider:before {
  transform: translateX(26px);
  background-image: url('https://zamanilka.ru/wp-content/uploads/2022/12/kartinki-luna-moon-27.jpg');
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
