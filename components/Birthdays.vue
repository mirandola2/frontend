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
    let t = curr.t_minus > 0 ? curr.t_minus-1 : curr.t_minus+364
    acc[t] = acc[t] || [];
    acc[t].push(curr.name);
    if (t > 1) {
      counterFarBD += 1;
    }
    return acc;
  }, Object.create(null));

  for (const [t_minus_key, names] of Object.entries(birthdaysReduced)) {
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

    if (t_minus_key === "0") {
      returnBDString += `Oggi è il compleanno di ${namesString}, auguri! `;
    } else if (t_minus_key === "1") {
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
      } ${namesString} fra ${t_minus_key} giorni`;
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