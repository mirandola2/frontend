<template>
  <span class="loading loading-spinner loading-xs" v-if="!weather.loaded"></span>
  <table v-else class="text-center">
    <tr>
      <td v-for="day in weather.daily.time">
        {{ new Date(day).toLocaleString("it-IT", {weekday: "short", day: "2-digit"}).toUpperCase() }}
      </td>
    </tr>
    <tr>
      <td v-for="day in weather.daily.weathercode" class="text-5xl mt-1">
        {{ codes[day] }}
      </td>
    </tr>
  </table>
</template>
<script setup>
const weather = ref(
  {
    daily: "",
    loaded: false
  }
);

watchEffect(async () => {
  fetch("https://api.open-meteo.com/v1/forecast?latitude=44.8909&longitude=11.0671&daily=weathercode&timezone=Europe%2FBerlin&forecast_days=3").then(
    res=>res.json()
  ).then( res=>{
    weather.value.loaded=true
    weather.value.daily=res.daily
  
  }
  ).catch(error => console.log("A causa di un errore non siamo riusciti a recuperare i dati."));
})


const codes = {
'0': '☀️',
'1': '🌤️',
'2': '⛅️',
'3': '☁️',
'45': '🌫️',
'48': '🌫️',
'51': '🌦️',
'53': '🌧️',
'55': '🌧️',
'56': '🌧️',
'57': '🌧️',
'61': '🌧️',
'63': '🌧️',
'65': '🌧️',
'66': '🌧️',
'67': '🌧️',
'71': '🌨️',
'73': '🌨️',
'75': '🌨️',
'77': '🌨️',
'77': '🌨️',
'80': '🌧️',
'81': '⛈️',
'82': '⛈️',
'85': '🌨️',
'86': '🌨️',
'95': '🌩️',
'96': '🌩️',
'99': '🌩️'
}

</script>
