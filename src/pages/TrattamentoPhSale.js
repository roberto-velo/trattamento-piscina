import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Divider,
  Chip,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ArrowBack, Science, TrendingUp, Warning, CheckCircle, Save, Settings, Pool } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import MenuItem from '@mui/material/MenuItem';

const TrattamentoPhSale = () => {
  const navigate = useNavigate();
  // Stato iniziale:
  const [formData, setFormData] = useState({
    volume: '',
    ph: '',
    cloro: '',
    sale: '',
    redox: '',
    alcalinita: '',
    tac: '',
    acidoCianurico: ''
  });

  const [analisi, setAnalisi] = useState(null);
  const [storico, setStorico] = useState([]);
  const [vasca, setVasca] = useState('privata');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVascaChange = (event) => {
    setVasca(event.target.value);
  };

  const analizzaAcqua = () => {
    if (!formData.volume || formData.volume <= 0) {
      alert('Inserisci un volume valido della piscina (obbligatorio)');
      return;
    }

    const volume = parseFloat(formData.volume);
    const ph = parseFloat(formData.ph) || 0;
    const cloro = parseFloat(formData.cloro) || 0;
    const sale = parseFloat(formData.sale) || 0;
    const redox = parseFloat(formData.redox) || 0;
    const alcalinita = parseFloat(formData.alcalinita) || 0;
    const tac = parseFloat(formData.tac) || 0;
    const acidoCianurico = parseFloat(formData.acidoCianurico) || 0;

    // Soglie normative italiane per tipologia vasca
    let limiti = {
      ph: [7.2, 7.6],
      cloro: [1.0, 3.0],
      sale: [3000, 5000],
      redox: [650, 850],
      alcalinita: [80, 200],
      tac: [80, 150],
      acidoCianurico: [20, 100]
    };
    if (vasca === 'pubblica') {
      limiti = {
        ph: [6.5, 7.5],
        cloro: [1.0, 1.5],
        sale: [3000, 5000],
        redox: [750, 900],
        alcalinita: [80, 200],
        tac: [80, 150],
        acidoCianurico: [0, 75]
      };
    } else if (vasca === 'fontana_giochi') {
      limiti = {
        ph: [6.5, 7.5],
        cloro: [1.0, 2.0],
        sale: [3000, 5000],
        redox: [750, 900],
        alcalinita: [80, 200],
        tac: [80, 150],
        acidoCianurico: [0, 75]
      };
    } else if (vasca === 'fontana') {
      limiti = {
        ph: [6.5, 8.0],
        cloro: [0.2, 1.0],
        sale: [3000, 5000],
        redox: [600, 900],
        alcalinita: [80, 200],
        tac: [80, 150],
        acidoCianurico: [0, 75]
      };
    }

    // Analisi dei parametri
    const problemi = [];
    const correzioni = [];
    const problemiBagnanti = [];
    const problemiPiscina = [];

    // Calcolo pH con pH polvere
    let phPlus = 0;
    let phMinus = 0;
    if (ph > 0) {
      if (ph < limiti.ph[0]) {
        // pH+ polvere: 10g per mc per aumentare di 0.1
        phPlus = (limiti.ph[0] - ph) * 0.1 * volume;
        problemi.push('pH troppo basso (acido)');
        correzioni.push(`Aggiungere ${Math.round(phPlus * 100) / 100} kg di pH+ polvere (carbonato di sodio)`);
        problemiBagnanti.push('Irritazione agli occhi e alla pelle');
        problemiPiscina.push('Corrosione delle parti metalliche');
      } else if (ph > limiti.ph[1]) {
        // pH- polvere: 10g per mc per diminuire di 0.1
        phMinus = (ph - limiti.ph[1]) * 0.1 * volume;
        problemi.push('pH troppo alto (basico)');
        correzioni.push(`Aggiungere ${Math.round(phMinus * 100) / 100} kg di pH- polvere (acido muriatico)`);
        problemiBagnanti.push('Formazione di incrostazioni sulla pelle');
        problemiPiscina.push('Formazione di calcare');
      }
    }

    // Analisi Cloro
    if (cloro > 0) {
      if (cloro < limiti.cloro[0]) {
        problemi.push('Cloro insufficiente');
        correzioni.push(`Aumentare la produzione di cloro dalla cella elettrolitica o aggiungere ${Math.round((limiti.cloro[1] - cloro) * 0.2 * volume * 100) / 100} kg di cloro granulare`);
        problemiBagnanti.push('Rischio di infezioni batteriche');
        problemiPiscina.push('Formazione di alghe');
      } else if (cloro > limiti.cloro[1]) {
        problemi.push('Cloro troppo alto');
        correzioni.push('Ridurre la produzione di cloro dalla cella elettrolitica');
        problemiBagnanti.push('Irritazione agli occhi e alle vie respiratorie');
        problemiPiscina.push('Deterioramento dei materiali');
      }
    }

    // Analisi Sale
    if (sale > 0) {
      if (sale < limiti.sale[0]) {
        problemi.push('Concentrazione sale insufficiente');
        correzioni.push(`Aggiungere ${Math.round((limiti.sale[1] - sale) * 0.001 * volume * 100) / 100} kg di sale per elettrolisi`);
        problemiBagnanti.push('Ridotta produzione di cloro');
        problemiPiscina.push('Inefficienza della cella elettrolitica');
      } else if (sale > limiti.sale[1]) {
        problemi.push('Concentrazione sale troppo alta');
        correzioni.push('Sostituire parzialmente l\'acqua della piscina');
        problemiBagnanti.push('Sapore salato eccessivo');
        problemiPiscina.push('Corrosione accelerata delle parti metalliche');
      }
    }

    // Analisi REDOX
    if (redox > 0) {
      if (redox < limiti.redox[0]) {
        problemi.push('Potenziale REDOX troppo basso');
        correzioni.push(`Aumentare la produzione di cloro dalla cella elettrolitica o aggiungere ${Math.round((limiti.redox[1] - redox) * 0.1 * volume * 100) / 100} kg di sale`);
        problemiBagnanti.push('Rischio di infezioni batteriche e virali');
        problemiPiscina.push('Formazione di biofilm e alghe');
      } else if (redox > limiti.redox[1]) {
        problemi.push('Potenziale REDOX troppo alto');
        correzioni.push('Ridurre la produzione di cloro dalla cella elettrolitica');
        problemiBagnanti.push('Irritazione eccessiva agli occhi e alla pelle');
        problemiPiscina.push('Accelerazione del deterioramento dei materiali');
      }
    }

    // Analisi Alcalinità
    if (alcalinita > 0) {
      if (alcalinita < limiti.alcalinita[0]) {
        problemi.push('Alcalinità troppo bassa');
        correzioni.push(`Aggiungere ${Math.round((limiti.alcalinita[1] - alcalinita) * 0.3 * volume * 100) / 100} kg di bicarbonato di sodio`);
        problemiBagnanti.push('Instabilità del pH');
        problemiPiscina.push('Corrosione delle superfici');
      } else if (alcalinita > limiti.alcalinita[1]) {
        problemi.push('Alcalinità troppo alta');
        correzioni.push(`Aggiungere ${Math.round((alcalinita - limiti.alcalinita[1]) * 0.2 * volume * 100) / 100} litri di acido muriatico`);
        problemiBagnanti.push('Difficoltà nel mantenere il pH stabile');
        problemiPiscina.push('Formazione di calcare');
      }
    }

    // Analisi TAC
    if (tac > 0) {
      if (tac < limiti.tac[0]) {
        problemi.push('TAC troppo bassa');
        correzioni.push(`Aggiungere ${Math.round((limiti.tac[1] - tac) * 0.3 * volume * 100) / 100} kg di bicarbonato di sodio`);
        problemiBagnanti.push('Instabilità del pH');
        problemiPiscina.push('Corrosione delle superfici');
      } else if (tac > limiti.tac[1]) {
        problemi.push('TAC troppo alta');
        correzioni.push(`Aggiungere ${Math.round((tac - limiti.tac[1]) * 0.2 * volume * 100) / 100} litri di acido muriatico`);
        problemiBagnanti.push('Difficoltà nel mantenere il pH stabile');
        problemiPiscina.push('Formazione di calcare');
      }
    }
    // Analisi Acido Cianurico
    if (acidoCianurico > 0) {
      if (acidoCianurico < limiti.acidoCianurico[0]) {
        problemi.push('Acido cianurico insufficiente');
        correzioni.push(`Aggiungere ${Math.round((limiti.acidoCianurico[1] - acidoCianurico) * 0.1 * volume * 100) / 100} kg di acido cianurico`);
        problemiBagnanti.push('Degradazione rapida del cloro');
        problemiPiscina.push('Consumo eccessivo di cloro');
      } else if (acidoCianurico > limiti.acidoCianurico[1]) {
        problemi.push('Acido cianurico troppo alto');
        correzioni.push('Sostituire parzialmente l\'acqua della piscina');
        problemiBagnanti.push('Ridotta efficacia del cloro');
        problemiPiscina.push('Formazione di cloro combinato');
      }
    }

    const risultatoAnalisi = {
      timestamp: new Date().toLocaleString(),
      parametri: { ...formData },
      problemi,
      correzioni,
      problemiBagnanti,
      problemiPiscina,
      volume
    };

    setAnalisi(risultatoAnalisi);
    setStorico(prev => [risultatoAnalisi, ...prev.slice(0, 9)]);
  };

  const salvaAnalisi = () => {
    if (analisi) {
      const salvate = JSON.parse(localStorage.getItem('analisiPhSale') || '[]');
      salvate.push(analisi);
      localStorage.setItem('analisiPhSale', JSON.stringify(salvate));
      alert('Analisi salvata con successo!');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4
    }}>
      <HeaderLogo />
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ 
            mb: 3,
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Torna alla Home
        </Button>

        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: 'white',
            textAlign: 'center',
            mb: 4,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          <Pool sx={{ mr: 2, verticalAlign: 'middle' }} />
          Analisi Chimica Acqua
        </Typography>

        <Card sx={{ 
          mb: 4,
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#333' }}>
              <TrendingUp sx={{ mr: 1, color: '#667eea' }} />
              Parametri dell'Acqua
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              <strong>Volume piscina (mc):</strong> Campo obbligatorio per calcolare le dosi corrette
            </Typography>

            {/* Riporto alla versione precedente con select sopra e nota sotto: */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  select
                  fullWidth
                  label={<span style={{fontWeight: 'bold'}}>Tipologia Vasca</span>}
                  value={vasca}
                  onChange={handleVascaChange}
                  helperText="Seleziona la tipologia di vasca per applicare le normative corrette"
                  sx={{
                    background: '#fff',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(102,126,234,0.08)',
                    mb: { xs: 2, md: 0 },
                    '& .MuiOutlinedInput-root': {
                      border: '2px solid #e0e0e0',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      background: '#fff',
                      transition: 'all 0.3s ease',
                    },
                    '& .MuiInputLabel-root': {
                      fontWeight: 'bold',
                      color: '#666',
                      '&.Mui-focused': {
                        color: '#1976d2'
                      }
                    },
                    '& .MuiSelect-select': {
                      fontWeight: '500',
                      color: '#333'
                    }
                  }}
                >
                  <MenuItem value="privata">Privata</MenuItem>
                  <MenuItem value="pubblica">Pubblica</MenuItem>
                  <MenuItem value="fontana_giochi">Fontana giochi d'acqua</MenuItem>
                  <MenuItem value="fontana">Fontana</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ flex: 1, p: 2, background: '#f0f4ff', borderRadius: 2, border: '1px solid #b3c6ff' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                  Limiti e normativa applicata:
                </Typography>
                {vasca === 'privata' && (
                  <>
                    <Typography variant="body2">Normativa: <b>UNI 10637</b> (piscine private ad uso domestico)</Typography>
                    <Typography variant="body2">pH: 7.2 - 7.6 | Cloro: 1.0 - 3.0 mg/l | Sale: 3000 - 5000 mg/l | REDOX: 650 - 850 mV</Typography>
                  </>
                )}
                {vasca === 'pubblica' && (
                  <>
                    <Typography variant="body2">Normativa: <b>DPR 59/2016</b> e <b>UNI 10637</b> (piscine pubbliche)</Typography>
                    <Typography variant="body2">pH: 6.5 - 7.5 | Cloro: 1.0 - 1.5 mg/l | Sale: 3000 - 5000 mg/l | REDOX: 750 - 900 mV</Typography>
                  </>
                )}
                {vasca === 'fontana_giochi' && (
                  <>
                    <Typography variant="body2">Normativa: <b>DPR 59/2016</b> (fontane giochi d'acqua)</Typography>
                    <Typography variant="body2">pH: 6.5 - 7.5 | Cloro: 1.0 - 2.0 mg/l | Sale: 3000 - 5000 mg/l | REDOX: 750 - 900 mV</Typography>
                  </>
                )}
                {vasca === 'fontana' && (
                  <>
                    <Typography variant="body2">Normativa: <b>DPR 59/2016</b> (fontane ornamentali)</Typography>
                    <Typography variant="body2">pH: 6.5 - 8.0 | Cloro: 0.2 - 1.0 mg/l | Sale: 3000 - 5000 mg/l | REDOX: 600 - 900 mV</Typography>
                  </>
                )}
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Volume piscina (mc) *"
                  type="number"
                  value={formData.volume}
                  onChange={(e) => handleInputChange('volume', e.target.value)}
                  required
                  helperText="Campo obbligatorio"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#444',
                        boxShadow: '0 2px 8px rgba(68,68,68,0.10)'
                      },
                      '&:hover fieldset': {
                        borderColor: '#888',
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="pH"
                  type="number"
                  inputProps={{ step: 0.1, min: 0, max: 14 }}
                  value={formData.ph}
                  onChange={(e) => handleInputChange('ph', e.target.value)}
                  helperText="Valore ideale: 7.2-7.6"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#444',
                        boxShadow: '0 2px 8px rgba(68,68,68,0.10)'
                      },
                      '&:hover fieldset': {
                        borderColor: '#888',
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Cloro libero (mg/l)"
                  type="number"
                  inputProps={{ step: 0.1, min: 0 }}
                  value={formData.cloro}
                  onChange={(e) => handleInputChange('cloro', e.target.value)}
                  helperText="Valore ideale: 1.0-3.0"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#444',
                        boxShadow: '0 2px 8px rgba(68,68,68,0.10)'
                      },
                      '&:hover fieldset': {
                        borderColor: '#888',
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Sale (mg/l)"
                  type="number"
                  inputProps={{ step: 100, min: 0 }}
                  value={formData.sale}
                  onChange={(e) => handleInputChange('sale', e.target.value)}
                  helperText="Valore ideale: 3000-5000"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#444',
                        boxShadow: '0 2px 8px rgba(68,68,68,0.10)'
                      },
                      '&:hover fieldset': {
                        borderColor: '#888',
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="REDOX (mV)"
                  type="number"
                  inputProps={{ step: 10, min: 0 }}
                  value={formData.redox}
                  onChange={(e) => handleInputChange('redox', e.target.value)}
                  helperText="Valore ideale: 650-850 mV"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#444',
                        boxShadow: '0 2px 8px rgba(68,68,68,0.10)'
                      },
                      '&:hover fieldset': {
                        borderColor: '#888',
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Alcalinità (mg/l)"
                  type="number"
                  inputProps={{ step: 10, min: 0 }}
                  value={formData.alcalinita}
                  onChange={(e) => handleInputChange('alcalinita', e.target.value)}
                  helperText="Valore ideale: 80-200"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#444',
                        boxShadow: '0 2px 8px rgba(68,68,68,0.10)'
                      },
                      '&:hover fieldset': {
                        borderColor: '#888',
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="TAC (mg/l)"
                  type="number"
                  inputProps={{ step: 10, min: 0 }}
                  value={formData.tac}
                  onChange={(e) => handleInputChange('tac', e.target.value)}
                  helperText="Valore ideale: 80-150"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#444',
                        boxShadow: '0 2px 8px rgba(68,68,68,0.10)'
                      },
                      '&:hover fieldset': {
                        borderColor: '#888',
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Acido Cianurico (mg/l)"
                  type="number"
                  inputProps={{ step: 5, min: 0 }}
                  value={formData.acidoCianurico}
                  onChange={(e) => handleInputChange('acidoCianurico', e.target.value)}
                  helperText="Valore ideale: 20-100"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: '#444',
                        boxShadow: '0 2px 8px rgba(68,68,68,0.10)'
                      },
                      '&:hover fieldset': {
                        borderColor: '#888',
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={analizzaAcqua}
                sx={{ 
                  mr: 2,
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                  }
                }}
              >
                <Science sx={{ mr: 1 }} />
                Analizza Acqua
              </Button>
              {analisi && (
                <Tooltip title="Salva analisi">
                  <IconButton
                    onClick={salvaAnalisi}
                    sx={{
                      backgroundColor: '#4caf50',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#45a049',
                      }
                    }}
                  >
                    <Save />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </CardContent>
        </Card>

        {analisi && (
          <Card sx={{ 
            mb: 4,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#333' }}>
                <CheckCircle sx={{ mr: 1, color: '#4caf50' }} />
                Risultati Analisi - Volume: {analisi.volume} mc
              </Typography>

              {analisi.problemi.length === 0 ? (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  <CheckCircle sx={{ mr: 1 }} />
                  Tutti i parametri sono nella norma! L'acqua è in perfette condizioni.
                </Alert>
              ) : (
                <Alert 
                  severity="warning" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  <Warning sx={{ mr: 1 }} />
                  Trovati {analisi.problemi.length} problema/i da correggere
                </Alert>
              )}

              {analisi.problemi.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2, color: '#d32f2f' }}>
                    Problemi Rilevati
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {analisi.problemi.map((problema, index) => (
                      <Chip
                        key={index}
                        label={problema}
                        color="error"
                        sx={{ 
                          mr: 1, 
                          mb: 1,
                          borderRadius: 2,
                          fontWeight: 'bold'
                        }}
                      />
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ mb: 2, color: '#1976d2' }}>
                    Correzioni Consigliate
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {analisi.correzioni.map((correzione, index) => (
                      <Chip
                        key={index}
                        label={correzione}
                        color="primary"
                        sx={{ 
                          mr: 1, 
                          mb: 1,
                          borderRadius: 2,
                          fontWeight: 'bold'
                        }}
                      />
                    ))}
                  </Box>
                </>
              )}

              {analisi.problemiBagnanti.length > 0 && (
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#333', mb: 1 }}>
                    Problemi per i Bagnanti
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {analisi.problemiBagnanti.map((problema, index) => (
                      <li key={index} style={{ marginBottom: 8 }}>{problema}</li>
                    ))}
                  </ul>
                </Box>
              )}
              {analisi.problemiPiscina.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#333', mb: 1 }}>
                    Problemi per la Piscina
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {analisi.problemiPiscina.map((problema, index) => (
                      <li key={index} style={{ marginBottom: 8 }}>{problema}</li>
                    ))}
                  </ul>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {storico.length > 0 && (
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#333' }}>
                Storico Misurazioni
              </Typography>
              {storico.map((item, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    mb: 2, 
                    p: 3, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 2,
                    backgroundColor: '#fafafa',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {item.timestamp} - Volume: {item.volume} mc
                  </Typography>
                  <Typography variant="body2">
                    pH: {item.parametri.ph || 'N/D'} | 
                    Sale: {item.parametri.sale || 'N/D'} mg/l | 
                    REDOX: {item.parametri.redox || 'N/D'} mV | 
                    Alcalinità: {item.parametri.alcalinita || 'N/D'} mg/l
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default TrattamentoPhSale; 