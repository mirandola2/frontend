'use client'

import { useState, useEffect } from 'react'

interface WeatherData {
  daily: {
    time: string[]
    weathercode: number[]
  } | null
  loaded: boolean
}

const codes: Record<string, string> = {
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
  '80': '🌧️',
  '81': '⛈️',
  '82': '⛈️',
  '85': '🌨️',
  '86': '🌨️',
  '95': '🌩️',
  '96': '🌩️',
  '99': '🌩️',
}

export default function Weather() {
  const [data, setData] = useState<WeatherData>({ daily: null, loaded: false })

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=44.8909&longitude=11.0671&daily=weathercode&timezone=Europe%2FBerlin&forecast_days=3',
    )
      .then((res) => res.json())
      .then((res) => {
        setData({ daily: res.daily, loaded: true })
      })
      .catch(() => console.log('A causa di un errore non siamo riusciti a recuperare i dati.'))
  }, [])

  if (!data.loaded) {
    return <span className="loading loading-spinner loading-xs" />
  }

  return (
    <table className="text-center">
      <tbody>
        <tr>
          {data.daily!.time.map((day) => (
            <td key={day}>
              {new Date(day)
                .toLocaleString('it-IT', { weekday: 'short', day: '2-digit' })
                .toUpperCase()}
            </td>
          ))}
        </tr>
        <tr>
          {data.daily!.weathercode.map((code, i) => (
            <td key={i} className="text-5xl mt-1">
              {codes[String(code)] || ''}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
