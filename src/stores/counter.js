import axios from 'axios'
import { getDay } from 'date-fns'
import key from '../../key'
import { defineStore } from 'pinia'
import { ref, onMounted, watch } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
  const SearchCity = ref(false)
  const citySelect = ref('Москва')
  const cityWeather = ref(null)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        axios
          .get(
            `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${longitude},${latitude}&apikey=${key.keyYandex}`
          )
          .then((response) => {
            const city = response.data.response.GeoObjectCollection.featureMember[3].GeoObject.name
            citySelect.value = city
          })
          .catch((error) => {
            console.log('Error:', error)
          })
      },
      (error) => {
        console.log('Error:', error)
      }
    )
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
  const weather = async (city) => {
    try {
      const response = await axios(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=${key.key}`
      )
      return response.data
    } catch (error) {
      console.log('Error:', error)
    }
  }
  onMounted(async () => {
    await fetchWeather()
    useDebounce(citySelect, 500)
  })

  async function fetchWeather() {
    try {
      const res = await weather(citySelect.value)
      cityWeather.value = res
    } catch (error) {
      console.error('Error fetching weather:', error)
    }
  }
  function useDebounce(value, delay) {
    const debouncedValue = ref(value)
    let timeoutId

    watch(value, () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        fetchWeather()
        debouncedValue.value = value.value
      }, delay)
    })

    return debouncedValue
  }

  const getWeekday = (date) => {
    const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    const currentDate = new Date()
    const dayIndex = getDay(new Date(date)) + 1

    if (currentDate.getDate()+1 === new Date(date).getDate()) {
      return 'Завтра'
    }
    return dayIndex === 7 ? 'Вс' : weekdays[dayIndex]
  }

  

  return { weather, citySelect, cityWeather, getWeekday, SearchCity }
})
