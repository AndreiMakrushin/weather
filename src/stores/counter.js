import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, onMounted, watch } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
  const weather = async (city) => {
    const response = await axios(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=62b5e8a6b5a21591deb1e27b136f6910`
    )
    return response.data
  }
  const citySelect = ref('Тюмень')
  const cityWeather = ref(null)

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

  return { weather, citySelect, cityWeather }
})
