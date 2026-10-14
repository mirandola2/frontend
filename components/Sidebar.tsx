import Birthdays from './Birthdays'
import Weather from './Weather'
import DailyWord from './DailyWord'

export default function Sidebar() {
  return (
    <aside className="w-full max-w-full lg:max-w-xs lg:sticky lg:top-24 lg:self-start">
      <div className="card bg-neutral w-full text-neutral-content divide-y divide-base-100">
        <section className="card-body">
          <h2 className="card-title">Compleanni</h2>
          <p>
            <Birthdays />
          </p>
        </section>
        <section className="card-body">
          <h2 className="card-title">Meteo Mirandola</h2>
          <Weather />
        </section>
        <section className="card-body">
          <h2 className="card-title">S. Messa di Gruppo</h2>
          <p>Alla Domenica, alle 9.00 in Duomo, o al Sabato, alle 18.30 in Sala della Comunità.</p>
        </section>
        <section className="card-body">
          <h2 className="card-title">Liturgia del Giorno</h2>
          <p>
            <DailyWord />
          </p>
        </section>
      </div>
    </aside>
  )
}
