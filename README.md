# Gestione Chimica Piscina

Un'applicazione React moderna per la gestione completa della chimica della piscina, con interfaccia intuitiva e funzionalità avanzate.

## Caratteristiche

### 🏠 Pagina Principale
- **Trattamento Manuale**: Inserimento e monitoraggio manuale dei parametri chimici
- **Trattamento con Centralina pH/Cloro**: Controllo automatico del pH e del cloro
- **Trattamento con Centralina pH/Sale**: Gestione della clorazione salina
- **Apertura Estiva**: Guida passo-passo per l'apertura stagionale
- **Chiusura Invernale**: Procedure complete per la chiusura invernale

### 🔧 Funzionalità Principali

#### Trattamento Manuale
- Inserimento parametri chimici (pH, cloro, alcalinità, durezza, stabilizzatore, temperatura)
- Validazione automatica dei valori
- Storico delle misurazioni
- Indicatori di stato per ogni parametro

#### Centralina pH/Cloro
- Controllo automatico in tempo reale
- Simulazione di variazione dei parametri
- Monitoraggio dello stato del sistema
- Regolazione dei target di pH e cloro

#### Centralina pH/Sale
- Gestione completa della clorazione salina
- Monitoraggio della cella elettrolitica
- Controllo del livello di sale
- Vantaggi della clorazione salina

#### Apertura Estiva
- Procedura guidata passo-passo
- Checklist interattiva
- Progresso delle operazioni
- Consigli utili per la stagione estiva

#### Chiusura Invernale
- Procedure complete di chiusura
- Registrazione dei dati finali
- Protezione degli impianti
- Preparazione per la stagione invernale

## Installazione

1. **Clona il repository**:
```bash
git clone <repository-url>
cd gestione-chimica-piscina
```

2. **Installa le dipendenze**:
```bash
npm install
```

3. **Avvia l'applicazione**:
```bash
npm start
```

L'applicazione sarà disponibile all'indirizzo `http://localhost:3000`

## Tecnologie Utilizzate

- **React 18**: Framework principale
- **Material-UI (MUI)**: Componenti UI moderni
- **React Router**: Navigazione tra le pagine
- **Emotion**: Styling avanzato

## Struttura del Progetto

```
src/
├── pages/
│   ├── HomePage.js              # Pagina principale con menu
│   ├── TrattamentoManuale.js    # Gestione manuale parametri
│   ├── TrattamentoPhCloro.js    # Centralina pH/Cloro
│   ├── TrattamentoPhSale.js     # Centralina pH/Sale
│   ├── AperturaEstiva.js        # Procedure apertura
│   └── ChiusuraInvernale.js     # Procedure chiusura
├── App.js                       # Componente principale
├── index.js                     # Entry point
└── index.css                    # Stili globali
```

## Utilizzo

### Navigazione
L'applicazione è organizzata in sezioni principali accessibili dalla pagina home:

1. **Trattamento Manuale**: Per inserire manualmente i parametri chimici
2. **Centralina pH/Cloro**: Per il controllo automatico con cloro tradizionale
3. **Centralina pH/Sale**: Per la gestione della clorazione salina
4. **Apertura Estiva**: Guida per l'apertura stagionale
5. **Chiusura Invernale**: Procedure per la chiusura invernale

### Funzionalità Avanzate

#### Simulazione in Tempo Reale
Le centraline includono simulazioni realistiche dei parametri chimici per dimostrare il funzionamento del sistema.

#### Validazione Dati
Tutti i campi di input includono validazione automatica e suggerimenti sui valori ottimali.

#### Storico e Registrazione
L'applicazione mantiene uno storico delle misurazioni e permette di esportare i dati.

## Personalizzazione

### Temi e Stili
L'applicazione utilizza Material-UI con un tema personalizzabile. Puoi modificare i colori e lo stile modificando il file `App.js`.

### Parametri Chimici
I valori di riferimento per i parametri chimici possono essere modificati nei rispettivi componenti.

## Supporto

Per supporto tecnico o suggerimenti, contatta il team di sviluppo.

## Licenza

Questo progetto è rilasciato sotto licenza MIT.

---

**Nota**: Questa applicazione è progettata per scopi educativi e dimostrativi. Per l'uso professionale, consultare sempre esperti del settore. 