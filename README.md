# Sito web del Gruppo Scout Mirandola 2

⚠️ _Il sito è ancora in construzione. Tutte le informazioni qui o altrove riportate sono da ritenere provvisorie e potrebbero subire cambiamenti._

Frontend del sito web del Gruppo Agesci Mirandola 2. Built with Nuxt and Tailwind.

## Architecture

![](doc/architecture.png)

In questa repository si trova la parte nel blocco `frontend` comprensiva della documentazione necessaria per tenere aggiornato il sito anche senza saper usare Nuxt o Vue. 

## Local development

Per far partire il local server:

```
npm install
npm run dev
```

Pushando le modifiche su Github, il sito verrà automaticamente aggiornato.

## Content update

___Premessa__: Questo paragrafo vuole essere d'aiuto per chiunque voglia modificare il sito senza avere particolari rudimenti su [Nuxt](https://nuxt.com/) o Vue. Logicamente, non si è potuto inserire tutto lo scibile sull'argomento, e perciò si rimanda il lettore alla documentazione ufficiale nel caso questi volesse fare modifiche più profonde nel sito._

I contenuti del sito sono renderizzati a partire da file presenti in due fonti:

- la cartella `content` ospita le pagine in formato [Markdown](https://markdownguide.org/cheat-sheet/). Le pagine i cui file iniziano per _ o per . sono pagine particolari con funzioni specifiche.
- la cartella `pages` ospita tutte le pagine in formato Vue oltre che il template standard standard delle pagine al punto precedente. 

I contenuti nella carta **"In primo piano"** presente nella home sono invece modificabili dal file `content/_home.md`.

Essendo il Markdown un linguaggio estremamente comodo, si è preferito usare il più possibile la cartella `content`, lasciando nei file Vue solamente cioò che era troppo complesso per essere scritto in Markdown. Questi ultimi file vanno esclusi dal contenuto generato dinamicamente modificando il file di configurazione ([documentazione](https://content.nuxtjs.org/api/configuration#ignores)) (solo per le nuove pagine Vue create). 

### MDC syntax

Le pagine in Markdown nella cartella `content` ammettono la sintassi MDC, ovvero un markdown "potenziato" che sfrutta componenti a blocchi. 
I blocchi possono essere utilizzati usando la seguente sintassi.
```
::<titolo>{<parametri>}
<contentuto>
::
```
Più info nella documentazione ufficiale

I componenti si trovano nella cartella `components/content` e attualmente sono i seguenti.

#### Cards & card

Due componenti da usare insieme, permettono di visualizzare tante _carte_ testuali in modalità galleria. Come si può vedere nell'esempio, il blocco `cards` contiene le single `card`.

```
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

```
:tableOfContents
```
Fa apparire un indice della pagina.  

#### Quoted

```
::quoted
...e quando Hathi, l'elefante selvaggio che vive cento anni e più, vide affiorare una lunga e sottile cresta di Roccia Azzurrina, proprio nel bel mezzo della corrente, capì che quella era la roccia della pace ed immediatamente alzò la proboscide e proclamò la "tregua dell'acqua".  
::
```
Il blocco `quoted` permette di creare una citazione.


### Menu
Il menu è gestito nel file `app.vue`, e in particolare nel dizionario presente nello _script setup_.

Esempio:
```
 {
    "Home": "/",
    "Chi Siamo": {
        "L'Associazione": "/associazione",
        "Il Gruppo": "/gruppo",
        }
 }
```