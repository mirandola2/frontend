import { CakeIcon, CloudSunIcon, ChurchIcon, HandsPrayingIcon } from '@phosphor-icons/react/ssr'
import Birthdays from './Birthdays'
import Weather from './Weather'
import DailyWord from './DailyWord'

export default function Sidebar() {
  return (
    <aside className="w-full max-w-full lg:max-w-xs lg:sticky lg:top-24 lg:self-start">
      <div className="card bg-neutral w-full text-neutral-content divide-y divide-base-100">
        <section className="card-body">
          <h2 className="card-title">
            <CakeIcon size={24} weight="duotone" aria-hidden />
            Compleanni
          </h2>
          <p>
            <Birthdays />
          </p>
        </section>
        <section className="card-body">
          <h2 className="card-title">
            <CloudSunIcon size={24} weight="duotone" aria-hidden />
            Meteo Mirandola
          </h2>
          <Weather />
        </section>
        <section className="card-body">
          <h2 className="card-title">
            <ChurchIcon size={24} weight="duotone" aria-hidden />
            S. Messa di Gruppo
          </h2>
          <p>Alla Domenica, alle 9.00 in Duomo, o al Sabato, alle 18.30 in Sala della Comunità.</p>
        </section>
        <section className="card-body">
          <h2 className="card-title">
            <HandsPrayingIcon size={24} weight="duotone" aria-hidden />
            Liturgia del Giorno
          </h2>
          <p>
            <DailyWord />
          </p>
        </section>
      </div>
    </aside>
  )
}
