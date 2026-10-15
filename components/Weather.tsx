'use client'

import { useCachedFetch } from '@/hooks/useCachedFetch'
import LoadingState from './LoadingState'
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Sun, type Icon } from '@phosphor-icons/react'

interface WeatherResponse {
  daily: {
    time: string[]
    weathercode: number[]
  }
}

// Open-Meteo WMO weather codes -> icon
// https://open-meteo.com/en/docs#weathervariables
function weatherIcon(code: number): { Icon: Icon; label: string } {
  if (code === 0) return { Icon: Sun, label: 'Sereno' }
  if (code <= 2) return { Icon: CloudSun, label: 'Poco nuvoloso' }
  if (code === 3) return { Icon: Cloud, label: 'Nuvoloso' }
  if (code === 45 || code === 48) return { Icon: CloudFog, label: 'Nebbia' }
  if (code >= 95) return { Icon: CloudLightning, label: 'Temporale' }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { Icon: CloudSnow, label: 'Neve' }
  if (code === 81 || code === 82) return { Icon: CloudLightning, label: 'Rovesci forti' }
  return { Icon: CloudRain, label: 'Pioggia' }
}

export default function Weather() {
  const { data, error } = useCachedFetch<WeatherResponse>(
    'https://api.open-meteo.com/v1/forecast?latitude=44.8909&longitude=11.0671&daily=weathercode&timezone=Europe%2FBerlin&forecast_days=3',
    30 * 60 * 1000,
  )

  if (!data) return <LoadingState error={error} />

  return (
    <table className="w-full table-fixed text-center">
      <tbody>
        <tr>
          {data.daily.time.map((day) => (
            <td key={day}>
              {new Date(day)
                .toLocaleString('it-IT', { weekday: 'short', day: '2-digit' })
                .toUpperCase()}
            </td>
          ))}
        </tr>
        <tr>
          {data.daily.weathercode.map((code, i) => {
            const { Icon, label } = weatherIcon(code)
            return (
              <td key={i} className="pt-1">
                <Icon size={44} weight="light" className="mx-auto block" aria-label={label} />
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}
