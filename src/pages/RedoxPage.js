import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { ArrowBack, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';

const RedoxPage = () => {
  const navigate = useNavigate();
  const data = [
    { ph: 6.5, cloro: 3.0, redox: 900 },
    { ph: 7.0, cloro: 2.0, redox: 850 },
    { ph: 7.2, cloro: 1.5, redox: 800 },
    { ph: 7.4, cloro: 1.2, redox: 750 },
    { ph: 7.6, cloro: 1.0, redox: 700 },
    { ph: 8.0, cloro: 0.5, redox: 650 }
  ];
  // Sostituisco il grafico con uno a più curve (pH 6.5, 7.0, 7.2, 7.4, 7.6)
  const cloroData = [
    { cloro: 0.1, pH65: 95, pH70: 90, pH72: 85, pH74: 75, pH76: 65 },
    { cloro: 0.2, pH65: 96, pH70: 91, pH72: 87, pH74: 78, pH76: 68 },
    { cloro: 0.3, pH65: 97, pH70: 92, pH72: 88, pH74: 80, pH76: 70 },
    { cloro: 0.4, pH65: 98, pH70: 93, pH72: 89, pH74: 82, pH76: 72 },
    { cloro: 0.5, pH65: 98, pH70: 94, pH72: 90, pH74: 84, pH76: 74 },
    { cloro: 0.6, pH65: 98, pH70: 94, pH72: 91, pH74: 85, pH76: 75 },
    { cloro: 0.8, pH65: 99, pH70: 95, pH72: 92, pH74: 86, pH76: 76 },
    { cloro: 1.0, pH65: 99, pH70: 96, pH72: 93, pH74: 87, pH76: 77 },
    { cloro: 1.5, pH65: 99, pH70: 97, pH72: 94, pH74: 88, pH76: 78 },
    { cloro: 2.0, pH65: 99, pH70: 97, pH72: 95, pH74: 89, pH76: 79 }
  ];
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', py: 4 }}>
      <HeaderLogo />
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mb: 3, color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
        >
          Torna alla Home
        </Button>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', mb: 4, textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
          <TrendingUp sx={{ mr: 2, verticalAlign: 'middle' }} />
          Cos'è il valore REDOX?
        </Typography>
        <Box sx={{ background: 'rgba(255,255,255,0.97)', borderRadius: 4, p: { xs: 2, md: 4 }, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#f5576c', fontWeight: 700 }}>
            Definizione
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Il valore <b>REDOX</b> (o potenziale di ossido-riduzione) misura la capacità dell'acqua di ossidare o ridurre le sostanze presenti. In pratica, indica quanto l'acqua è "disinfettante" e quindi sicura per i bagnanti.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2, color: '#f5576c', fontWeight: 700 }}>
            Perché è importante?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Un valore REDOX adeguato garantisce che i disinfettanti (come il cloro) siano efficaci contro batteri, virus e alghe. Un REDOX troppo basso indica acqua poco sicura; troppo alto può causare irritazioni.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2, color: '#f5576c', fontWeight: 700 }}>
            Valori di riferimento
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            - Piscine private: <b>650-850 mV</b><br/>
            - Piscine pubbliche: <b>750-900 mV</b><br/>
            - Fontane giochi d'acqua: <b>750-900 mV</b><br/>
            - Fontane ornamentali: <b>600-900 mV</b>
          </Typography>
          <Typography variant="h5" sx={{ mb: 2, color: '#f5576c', fontWeight: 700 }}>
            Da cosa dipende il REDOX?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Il REDOX dipende da:
            <ul>
              <li>Presenza e concentrazione di cloro o altri disinfettanti</li>
              <li>pH dell'acqua (un pH fuori range abbassa il REDOX)</li>
              <li>Presenza di sostanze organiche o inquinanti</li>
              <li>Temperatura dell'acqua</li>
            </ul>
          </Typography>
          <Typography variant="h5" sx={{ mb: 2, color: '#f5576c', fontWeight: 700 }}>
            Come si misura?
          </Typography>
          <Typography variant="body1">
            Il REDOX si misura con appositi elettrodi e centraline elettroniche. È un parametro fondamentale per la regolazione automatica della disinfezione nelle piscine moderne.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2, color: '#f5576c', fontWeight: 700 }}>
            Relazione tra pH, Cloro e REDOX
          </Typography>
          {/* Rimuovo i grafici e inserisco l'immagine fornita */}
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <img src="/IMG_4058.jpg" alt="Correlazione tra Cloro Libero, pH e Redox" style={{ width: '100%', maxWidth: '1000px', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '4px solid #f5576c' }} />
          </Box>
          <Typography variant="body2" sx={{ mt: 2, color: '#333', textAlign: 'center' }}>
            <b>Correlazione tra Cloro Libero, pH e Redox:</b> il grafico mostra come, a parità di cloro libero, il potenziale REDOX e l’efficacia disinfettante variano in base al pH.<br/>
            Il range ideale per la disinfezione è evidenziato in azzurro.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RedoxPage; 