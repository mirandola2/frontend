# Sito web del Gruppo Scout Mirandola 2

⚠️ _Il sito è ancora in construzione. Tutte le informazioni qui o altrove riportate sono da ritenere provvisorie e potrebbero subire cambiamenti._

Frontend del sito web del Gruppo Agesci Mirandola 2. Built with Nuxt and Tailwind.

## Architecture

![](doc/architecture.png)

In questa repository si trova la parte nel blocco `frontend` comprensiva della documentazione necessaria per tenere aggiornato il sito anche senza saper usare Nuxt o Vue.  

## Local development

Per far partire il local server:

```sh
npm install
npm run dev
```

Pushando le modifiche su Github, il sito verrà automaticamente aggiornato.

## Content update

___Premessa__: Questo paragrafo vuole essere d'aiuto per chiunque voglia modificare il sito senza avere particolari rudimenti su [Nuxt](https://nuxt.com/) o Vue. Logicamente non si è potuto inserire tutto lo scibile sull'argomento; perciò si rimanda il lettore alla documentazione ufficiale nel caso si volessero fare modifiche più profonde al sito.

I contenuti del sito sono renderizzati a partire da file presenti in due fonti:

- la cartella `content` ospita le pagine in formato [Markdown](https://markdownguide.org/cheat-sheet/). Le pagine i cui file iniziano per _ o per . sono pagine particolari con funzioni specifiche.
- la cartella `pages` ospita tutte le pagine in formato Vue oltre che il template standard standard delle pagine al punto precedente.  

I contenuti nella carta __"In primo piano"__ presente nella home sono invece modificabili dal file `content/_home.md`.

Essendo il Markdown un linguaggio estremamente comodo, si è preferito usare il più possibile la cartella `content`, lasciando nei file Vue solamente cioò che era troppo complesso per essere scritto in Markdown. Questi ultimi file vanno esclusi dal contenuto generato dinamicamente modificando il file di configurazione ([documentazione](https://content.nuxtjs.org/api/configuration#ignores)) (solo per le nuove pagine Vue create).  

### MDC syntax

Le pagine in Markdown nella cartella `content` ammettono la sintassi MDC, ovvero un markdown "potenziato" che sfrutta componenti a blocchi. 
I blocchi possono essere utilizzati usando la seguente sintassi (Più info nella documentazione ufficiale).

```md
::<titolo>{<parametri>}
<contentuto>
::
```

I componenti si trovano nella cartella `/components/content` e attualmente sono i seguenti.

#### Cards & card

Due componenti da usare insieme, permettono di visualizzare tante _carte_ testuali in modalità galleria. Come si può vedere nell'esempio, il blocco `cards` contiene le single `card`.

```md
::cards

    :::card{title="La Legge" color="lc" big}
        Il lupetto pensa agli altri come a se stesso.  
        Il lupetto vive con gioia e lealtà insieme al branco.
    :::

    :::card{title="Il Motto" color="lc"}
        Del Nostro Meglio
    :::

```

I parametri di card sono:  

- `title`: stringa, opzionale, sarà visualizzato come il titolo della carta
- `color`: stringa, opzionale (lg|eg|rs|cc), rappresenta il colore della carta. Altrimenti sarà di colore neutro.
- `big`: boolean, opzionale. Se vero, la carta sarà grande il doppio su certi schermi

#### Table of contents

```md
:tableOfContents
```

Fa apparire un indice della pagina.  

#### Quoted

```md
::quoted
...e quando Hathi, l'elefante selvaggio che vive cento anni e più, vide affiorare una lunga e sottile cresta di Roccia Azzurrina, proprio nel bel mezzo della corrente, capì che quella era la roccia della pace ed immediatamente alzò la proboscide e proclamò la "tregua dell'acqua".  
::
```

Il blocco `quoted` permette di creare una citazione.

#### Staff

```md
:staff{staff='L' coca}
```

Parametri:  

- `staff`: stringa, indica quale staff mostrare [L | C | E | G | N | CF | CC ]
- `coca`: booleano, opzionale. Se vero, mostra solo i capi in CoCa.

Il blocco mostra tutti i capi di una certa staff. I capi sono inseriti in formato .csv nel file `/content/_capi.csv` rispettando la formattazione presentata nell'esempio seguente.

```csv
nome,nomeCaccia,ruolo,staff,coca,desc,img
Baden Powell,Impeesa,Capo Reparto,E,1,Impeesa ovvero l'animale che si sposta furtivamente di notte,bp.jpg
```

Da notare come il `nomeCaccia` indichi non il nome Totem ma bensì il personaggio interpretato dai capi in LC. Viene mostrato al posto del nome vero se e solo se `staff == {L, C}` e `coca==true`.

Il campo `img` è il nome del file della foto del capo che si deve trovare  nella cartella `/public/staff`.

### Menu

Il menu è gestito nel file `app.vue`, e in particolare nel dizionario presente nello _script setup_.

Esempio:

```js
 {
    "Home": "/",
    "Chi Siamo": {
        "L'Associazione": "/associazione",
        "Il Gruppo": "/gruppo",
        }
 }
```
