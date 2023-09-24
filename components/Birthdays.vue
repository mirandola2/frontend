<template>
<span class="loading loading-spinner loading-xs" v-if="!compleanni.loaded"></span>
{{ compleanni.text }}
</template>
<script setup>
const compleanni = ref(
  {
    text: "",
    loaded: false
  }
);

watchEffect(async () => {
  compleanni.value.text = birthdaysFormatter(
    await (await fetch("https://people.mirandola2.workers.dev/birthday")).json()
  );
});

function birthdaysFormatter(birthdays) {
  let returnBDString = "";
  let flagFarBDString = true;
  let counterFarBD = 0;

  const birthdaysReduced = birthdays.reduce(function (acc, curr) {
    acc[curr.t_minus] = acc[curr.t_minus] || [];
    acc[curr.t_minus].push(curr.name);
    if (curr.t_minus > 1) {
      counterFarBD += 1;
    }
    return acc;
  }, Object.create(null));

  for (const [tminus, names] of Object.entries(birthdaysReduced)) {
    const length = names.length;

    let namesString = "";

    if (length === 0) {
      namesString = "";
    } else if (length === 1) {
      namesString = names[0];
    } else {
      const last = names.pop();
      namesString = names.join(", ") + " e " + last;
    }

    if (tminus === "0") {
      returnBDString += `Oggi è il compleanno di ${namesString}, auguri! `;
    } else if (tminus === "1") {
      returnBDString += `Domani ${
        length < 2 ? "compierà" : "compieranno"
      } gli anni ${namesString}. `;
    } else {
      returnBDString += `${
        flagFarBDString
          ? counterFarBD < 2
            ? "Il prossimo compleanno è di"
            : "I prossimi compleanni sono di"
          : ", "
      } ${namesString} fra ${tminus} giorni`;
      flagFarBDString = false;
    }
  }

  returnBDString +=
    returnBDString == ""
      ? "Nessuno compierà gli anni durante la prossima settimana."
      : counterFarBD != 0
      ? "."
      : "";
  
  compleanni.value.loaded = true
  return returnBDString;
}
</script>