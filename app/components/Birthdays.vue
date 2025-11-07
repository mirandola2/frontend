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
  var now = new Date();
	var start = new Date(now.getFullYear(), 0, 0);
	var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
	var day = Math.floor(diff / (1000 * 60 * 60 * 24));
  compleanni.value.text = birthdaysFormatter(
    await (await fetch(`https://people.mirandola2.workers.dev/birthday?t=7&d=${day}`)).json()
  );
});

function birthdaysFormatter(birthdays) {
  let returnBDString = "";
  let flagFarBDString = true;
  let counterFarBD = 0;
  const birthdaysReduced = birthdays.reduce(function (acc, curr) {
    let t = curr.t_minus
    acc[t] = acc[t] || [];
    acc[t].push(`${curr.name} ${curr.last_initial}.`);
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
      } gli anni ${namesString}! `;
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