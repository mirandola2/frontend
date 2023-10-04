<template>
   <div class="sticky top-24 w-full max-h-screen max-w-full lg:max-w-xs">
   <div
          class="card  bg-neutral w-full text-neutral-content divide-y divide-base-100"
        >
          <div class="card-body">
            <h2 class="card-title">Compleanni</h2>
            <p>
              <Birthdays />
            </p>
          </div>
          <div class="card-body">
            <h2 class="card-title">Meteo Mirandola</h2>
            <Weather />
          </div>
          <div class="card-body">
            <h2 class="card-title">S. Messa di Gruppo</h2>
            <p>Ogni Domenica, alle 9.00 in Duomo</p>
          </div>
          <div class="card-body">
            <h2 class="card-title">Liturgia del Giorno</h2>
            <p>
              <DailyWord />
            </p>
          </div>
        </div>
    </div>
</template>