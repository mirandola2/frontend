import Birthdays from './Birthdays'
import Weather from './Weather'
import DailyWord from './DailyWord'

export default function Sidebar() {
  return (
    <div className="sticky top-24 w-full max-h-screen max-w-full lg:max-w-xs">
      <div className="card bg-neutral w-full text-neutral-content divide-y divide-base-100">
        <div className="card-body">
          <h2 className="card-title">Compleanni</h2>
          <p>
            <Birthdays />
          </p>
        </div>
        <div className="card-body">
          <h2 className="card-title">Meteo Mirandola</h2>
          <Weather />
        </div>
        <div className="card-body">
          <h2 className="card-title">S. Messa di Gruppo</h2>
          <p>Alla Domenica, alle 9.00 in Duomo, o al Sabato, alle 18.30 in Sala della Comunità.</p>
        </div>
        <div className="card-body">
          <h2 className="card-title">Liturgia del Giorno</h2>
          <p>
            <DailyWord />
          </p>
        </div>
      </div>
    </div>
  )
}
