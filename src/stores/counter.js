import axios from 'axios'
import key from '../../key'
import { defineStore } from 'pinia'
import { ref, onMounted, watch } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
    const SearchCity = ref(false)
    const citySelect = ref('Тюмень')
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
    const weather = async(city) => {
        try {
            const response = await axios(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=${key.key}`
            )
            return response.data
        } catch (error) {
            console.log('Error:', error)
        }
    }
    onMounted(async() => {
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
        const dayIndex = new Date(date).getDay()
        const day = new Date(date).getDate()
        const month = getMonthName(currentDate.getMonth())
        if (currentDate.getDate() + 1 === new Date(date).getDate()) {
            return ' Завтра'
        }

        function getMonthName(month) {
            const months = [
                'января',
                'февраля',
                'марта',
                'апреля',
                'мая',
                'июня',
                'июля',
                'августа',
                'сентября',
                'октября',
                'ноября',
                'декабря'
            ]
            return months[month]
        }
        return dayIndex === 7 ? 'Вс' : [weekdays[dayIndex], String(day), month]
    }
    const getWeatherImage = (weather) => {
        return weather === '01d' ? 'https://cdn.icon-icons.com/icons2/1370/PNG/512/if-weather-3-2682848_90785.png' :
            weather === '02d' ? 'https://cdn.icon-icons.com/icons2/1250/PNG/512/1494258080-sunclouddaycloudysunnyweatherforecast_84350.png' :
            weather === '03d' ? 'https://cdn.icon-icons.com/icons2/720/PNG/512/clouds_icon-icons.com_62491.png' :
            weather === '04d' ? 'https://cdn.icon-icons.com/icons2/3191/PNG/512/cloudy_clouds_cloud_weather_sky_icon_194252.png' :
            weather === '09d' ? 'https://cdn.icon-icons.com/icons2/799/PNG/512/cloudy-havyrain_icon-icons.com_65781.png' :
            weather === '10d' ? 'https://cdn.icon-icons.com/icons2/1250/PNG/512/1494258097-rainrainfalldrizzlesuncloudweatherforecast_84357.png' :
            weather === '11d' ? 'https://cdn.icon-icons.com/icons2/33/PNG/256/weather_storms_storm_rain_thunder_2783.png' :
            weather === '13d' ? 'https://cdn.icon-icons.com/icons2/1074/PNG/512/2_snowflake__christmas_xmas_winter_snow_decoration_celebration_icon-icons.com_77037.png' :
            weather === '50d' ? 'https://cdn.icon-icons.com/icons2/8/PNG/256/fog_weather_1469.png' :
            weather === '01n' ? 'https://cdn.icon-icons.com/icons2/2283/PNG/512/nature_moon_stars_night_icon_141120.png' :
            weather === '02n' ? 'https://cdn.icon-icons.com/icons2/2138/PNG/512/cloudy_moon_weather_icon_131719.png' :
            weather === '03n' ? 'https://cdn.icon-icons.com/icons2/720/PNG/512/clouds_icon-icons.com_62491.png' :
            weather === '04n' ? 'https://cdn.icon-icons.com/icons2/3191/PNG/512/cloudy_clouds_cloud_weather_sky_icon_194252.png' :
            weather === '09n' ? 'https://cdn.icon-icons.com/icons2/799/PNG/512/cloudy-havyrain_icon-icons.com_65781.png' :
            weather === '10n' ? 'https://cdn.icon-icons.com/icons2/3609/PNG/512/climate_forecast_weather_cloud_moon_night_rain_icon_226630.png' :
            weather === '11n' ? 'https://cdn.icon-icons.com/icons2/33/PNG/256/weather_storms_storm_rain_thunder_2783.png' :
            weather === '13n00' ? 'https://cdn.icon-icons.com/icons2/1074/PNG/512/2_snowflake__christmas_xmas_winter_snow_decoration_celebration_icon-icons.com_77037.png' :
            'https://cdn.icon-icons.com/icons2/8/PNG/256/fog_weather_1469.png'
    }



    return { weather, citySelect, cityWeather, getWeekday, SearchCity, getWeatherImage }
})