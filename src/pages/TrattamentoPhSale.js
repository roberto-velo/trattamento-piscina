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
import { ArrowBack, Science, TrendingUp, Warning, CheckCircle, Save, Settings, Pool, History } from '@mui/icons-material';
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

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
      setShowAlert(true);
      setAlertMessage('Inserisci un volume valido della piscina (obbligatorio)');
      setAlertSeverity('error');
      setTimeout(() => setShowAlert(false), 4000);
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
      sale: [3, 5],
      redox: [650, 850],
      alcalinita: [80, 120],
      tac: [80, 120],
      acidoCianurico: [20, 80]
    };
    if (vasca === 'pubblica') {
      limiti = {
        ph: [6.5, 7.5],
        cloro: [1.0, 1.5],
        sale: [3, 5],
        redox: [750, 900],
        alcalinita: [80, 120],
        tac: [80, 120],
        acidoCianurico: [0, 80]
      };
    } else if (vasca === 'fontana_giochi') {
      limiti = {
        ph: [6.5, 7.5],
        cloro: [1.0, 2.0],
        sale: [3, 5],
        redox: [750, 900],
        alcalinita: [80, 120],
        tac: [80, 120],
        acidoCianurico: [0, 80]
      };
    } else if (vasca === 'fontana') {
      limiti = {
        ph: [6.5, 8.0],
        cloro: [0.2, 1.0],
        sale: [3, 5],
        redox: [600, 900],
        alcalinita: [80, 120],
        tac: [80, 120],
        acidoCianurico: [0, 80]
      };
    }

    // Analisi dei parametri
    const problemi = [];
    const correzioni = [];
    const problemiBagnanti = [];
    const problemiPiscina = [];

    // Calcolo pH con pH polvere (target: 7.3)
    let phPlus = 0;
    let phMinus = 0;
    if (ph > 0) {
      if (ph < 7.3) {
        // pH+ polvere: 10g per mc per aumentare di 0.1
        phPlus = (7.3 - ph) * 0.1 * volume;
        problemi.push('pH troppo basso (acido)');
        correzioni.push(`Aggiungere ${Math.round(phPlus * 100) / 100} kg di pH+ polvere (carbonato di sodio) per portare a 7.3`);
        problemiBagnanti.push('Irritazione agli occhi e alla pelle');
        problemiPiscina.push('Corrosione delle parti metalliche');
      } else if (ph > 7.3) {
        // pH- polvere: 10g per mc per diminuire di 0.1
        phMinus = (ph - 7.3) * 0.1 * volume;
        problemi.push('pH troppo alto (basico)');
        correzioni.push(`Aggiungere ${Math.round(phMinus * 100) / 100} kg di pH- polvere (acido muriatico) per portare a 7.3`);
        problemiBagnanti.push('Formazione di incrostazioni sulla pelle');
        problemiPiscina.push('Formazione di calcare');
      }
    }

    // Analisi Cloro (target: 1 ppm)
    if (cloro > 0) {
      if (cloro < 1) {
        problemi.push('Cloro insufficiente');
        correzioni.push(`Aumentare la produzione di cloro dalla cella elettrolitica o aggiungere ${Math.round((1 - cloro) * 0.2 * volume * 100) / 100} kg di cloro granulare per portare a 1 ppm`);
        problemiBagnanti.push('Rischio di infezioni batteriche');
        problemiPiscina.push('Formazione di alghe');
      } else if (cloro > 1) {
        problemi.push('Cloro troppo alto');
        correzioni.push('Ridurre la produzione di cloro dalla cella elettrolitica per portare a 1 ppm');
        problemiBagnanti.push('Irritazione agli occhi e alle vie respiratorie');
        problemiPiscina.push('Deterioramento dei materiali');
      }
    }

    // Analisi Sale (target: 4 kg/m³)
    if (sale > 0) {
      if (sale < 4) {
        problemi.push('Concentrazione sale insufficiente');
        correzioni.push(`Aggiungere ${Math.round((4 - sale) * volume * 100) / 100} kg di sale per elettrolisi per portare a 4 kg/m³`);
        problemiBagnanti.push('Ridotta produzione di cloro');
        problemiPiscina.push('Inefficienza della cella elettrolitica');
      } else if (sale > 4) {
        problemi.push('Concentrazione sale troppo alta');
        correzioni.push('Sostituire parzialmente l\'acqua della piscina per portare a 4 kg/m³');
        problemiBagnanti.push('Sapore salato eccessivo');
        problemiPiscina.push('Corrosione accelerata delle parti metalliche');
      }
    }

    // Analisi REDOX (target: 700 mV)
    if (redox > 0) {
      if (redox < 700) {
        problemi.push('Potenziale REDOX troppo basso');
        correzioni.push(`Aumentare la produzione di cloro dalla cella elettrolitica o aggiungere ${Math.round((700 - redox) * 0.1 * volume * 100) / 100} kg di sale per portare a 700 mV`);
        problemiBagnanti.push('Rischio di infezioni batteriche e virali');
        problemiPiscina.push('Formazione di biofilm e alghe');
      } else if (redox > 700) {
        problemi.push('Potenziale REDOX troppo alto');
        correzioni.push('Ridurre la produzione di cloro dalla cella elettrolitica per portare a 700 mV');
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
      try {
        const salvate = JSON.parse(localStorage.getItem('analisiPhSale') || '[]');
        salvate.push(analisi);
        localStorage.setItem('analisiPhSale', JSON.stringify(salvate));
        setShowAlert(true);
        setAlertMessage('Analisi salvata con successo!');
        setAlertSeverity('success');
        setTimeout(() => setShowAlert(false), 4000);
      } catch (error) {
        setShowAlert(true);
        setAlertMessage('Errore nel salvataggio dell\'analisi');
        setAlertSeverity('error');
        setTimeout(() => setShowAlert(false), 4000);
      }
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

        {showAlert && (
          <Alert 
            severity={alertSeverity} 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              fontSize: '1.1rem'
            }}
            onClose={() => setShowAlert(false)}
          >
            {alertMessage}
          </Alert>
        )}

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
                    <Typography variant="body2">pH: 7.2 - 7.6 | Cloro: 1.0 - 3.0 ppm | Sale: 3 - 5 kg/m³ | REDOX: 650 - 850 mV</Typography>
                  </>
                )}
                {vasca === 'pubblica' && (
                  <>
                    <Typography variant="body2">Normativa: <b>DPR 59/2016</b> e <b>UNI 10637</b> (piscine pubbliche)</Typography>
                    <Typography variant="body2">pH: 6.5 - 7.5 | Cloro: 1.0 - 1.5 ppm | Sale: 3 - 5 kg/m³ | REDOX: 750 - 900 mV</Typography>
                  </>
                )}
                {vasca === 'fontana_giochi' && (
                  <>
                    <Typography variant="body2">Normativa: <b>DPR 59/2016</b> (fontane giochi d'acqua)</Typography>
                    <Typography variant="body2">pH: 6.5 - 7.5 | Cloro: 1.0 - 2.0 ppm | Sale: 3 - 5 kg/m³ | REDOX: 750 - 900 mV</Typography>
                  </>
                )}
                {vasca === 'fontana' && (
                  <>
                    <Typography variant="body2">Normativa: <b>DPR 59/2016</b> (fontane ornamentali)</Typography>
                    <Typography variant="body2">pH: 6.5 - 8.0 | Cloro: 0.2 - 1.0 ppm | Sale: 3 - 5 kg/m³ | REDOX: 600 - 900 mV</Typography>
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
                                      label="Cloro libero (ppm)"
                  type="number"
                  inputProps={{ step: 0.1, min: 0 }}
                  value={formData.cloro}
                  onChange={(e) => handleInputChange('cloro', e.target.value)}
                  helperText="Valore ideale: 1.0-3.0 ppm"
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
                                      label="Sale (kg/m³)"
                  type="number"
                  inputProps={{ step: 0.1, min: 0 }}
                  value={formData.sale}
                  onChange={(e) => handleInputChange('sale', e.target.value)}
                  helperText="Valore ideale: 3-5 kg/m³"
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
                  helperText="Valore ideale: 80-120 mg/l"
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
                  helperText="Valore ideale: 80-120 mg/l"
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
                  helperText="Valore ideale: 20-80 mg/l"
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
            borderRadius: 6,
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            animation: 'slideInUp 0.8s ease-out',
            '@keyframes slideInUp': {
              '0%': { opacity: 0, transform: 'translateY(50px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4,
                background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                borderRadius: 4,
                p: 3,
                border: '1px solid rgba(102,126,234,0.1)'
              }}>
                <CheckCircle sx={{ mr: 2, color: '#4caf50', fontSize: 32 }} />
                <Box>
                  <Typography variant="h4" sx={{ 
                    color: '#333', 
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Risultati Analisi
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#666', fontWeight: 500 }}>
                    Volume: {analisi.volume} mc
                  </Typography>
                </Box>
              </Box>

              {analisi.problemi.length === 0 ? (
                <Box sx={{ 
                  background: 'linear-gradient(135deg, #4caf5020, #8bc34a20)', 
                  borderRadius: 6, 
                  p: 4, 
                  mb: 4,
                  border: '1px solid rgba(76,175,80,0.2)',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(76,175,80,0.4)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(76,175,80,0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(76,175,80,0)' }
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircle sx={{ mr: 2, color: '#4caf50', fontSize: 28 }} />
                    <Typography variant="h5" sx={{ color: '#4caf50', fontWeight: 700 }}>
                      Perfetto! 🎉
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: '#333'
                  }}>
                    Tutti i parametri sono nella norma! L'acqua è in perfette condizioni per il nuoto.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ 
                  background: 'linear-gradient(135deg, #ff980020, #ffc10720)', 
                  borderRadius: 6, 
                  p: 4, 
                  mb: 4,
                  border: '1px solid rgba(255,152,0,0.2)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Warning sx={{ mr: 2, color: '#ff9800', fontSize: 28 }} />
                    <Typography variant="h5" sx={{ color: '#ff9800', fontWeight: 700 }}>
                      Attenzione! ⚠️
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: '#333'
                  }}>
                    Trovati <b>{analisi.problemi.length}</b> problema/i da correggere per ottimizzare la qualità dell'acqua.
                  </Typography>
                </Box>
              )}

              {analisi.problemi.length > 0 && (
                <>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ 
                      mb: 3, 
                      color: '#d32f2f', 
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <Box component="span" sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        background: '#d32f2f',
                        display: 'inline-block'
                      }} />
                      Problemi Rilevati
                    </Typography>
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
                      gap: 2 
                    }}>
                      {analisi.problemi.map((problema, index) => (
                        <Box
                          key={index}
                          sx={{
                            background: 'linear-gradient(135deg, #ff572220, #f4433620)',
                            borderRadius: 4,
                            p: 3,
                            border: '1px solid rgba(255,87,34,0.2)',
                            transition: 'all 0.3s ease',
                            animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`,
                            '@keyframes slideInLeft': {
                              '0%': { opacity: 0, transform: 'translateX(-30px)' },
                              '100%': { opacity: 1, transform: 'translateX(0)' }
                            },
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: '0 8px 25px rgba(255,87,34,0.2)'
                            }
                          }}
                        >
                          <Typography variant="body1" sx={{ 
                            fontWeight: 600, 
                            color: '#d32f2f',
                            fontSize: '1rem'
                          }}>
                            {problema}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ 
                      mb: 3, 
                      color: '#1976d2', 
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <Box component="span" sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        background: '#1976d2',
                        display: 'inline-block'
                      }} />
                      Correzioni Consigliate
                    </Typography>
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
                      gap: 2 
                    }}>
                      {analisi.correzioni.map((correzione, index) => (
                        <Box
                          key={index}
                          sx={{
                            background: 'linear-gradient(135deg, #2196f320, #03a9f420)',
                            borderRadius: 4,
                            p: 3,
                            border: '1px solid rgba(33,150,243,0.2)',
                            transition: 'all 0.3s ease',
                            animation: `slideInRight 0.5s ease-out ${index * 0.1}s both`,
                            '@keyframes slideInRight': {
                              '0%': { opacity: 0, transform: 'translateX(30px)' },
                              '100%': { opacity: 1, transform: 'translateX(0)' }
                            },
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: '0 8px 25px rgba(33,150,243,0.2)'
                            }
                          }}
                        >
                          <Typography variant="body1" sx={{ 
                            fontWeight: 600, 
                            color: '#1976d2',
                            fontSize: '1rem'
                          }}>
                            {correzione}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </>
              )}

              {(analisi.problemiBagnanti.length > 0 || analisi.problemiPiscina.length > 0) && (
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                  gap: 4 
                }}>
                  {analisi.problemiBagnanti.length > 0 && (
                    <Box sx={{ 
                      background: 'linear-gradient(135deg, #ff980020, #ffc10720)', 
                      borderRadius: 6, 
                      p: 4,
                      border: '1px solid rgba(255,152,0,0.2)',
                      animation: 'fadeInUp 0.8s ease-out'
                    }}>
                      <Typography variant="h6" sx={{ 
                        color: '#ff9800', 
                        mb: 2, 
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Box component="span" sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          background: '#ff9800',
                          display: 'inline-block'
                        }} />
                        Problemi per i Bagnanti
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {analisi.problemiBagnanti.map((problema, index) => (
                          <Typography key={index} variant="body2" sx={{ 
                            color: '#666',
                            padding: '8px 12px',
                            background: 'rgba(255,255,255,0.5)',
                            borderRadius: 3,
                            borderLeft: '4px solid #ff9800'
                          }}>
                            {problema}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {analisi.problemiPiscina.length > 0 && (
                    <Box sx={{ 
                      background: 'linear-gradient(135deg, #9c27b020, #e91e6320)', 
                      borderRadius: 6, 
                      p: 4,
                      border: '1px solid rgba(156,39,176,0.2)',
                      animation: 'fadeInUp 0.8s ease-out 0.2s both'
                    }}>
                      <Typography variant="h6" sx={{ 
                        color: '#9c27b0', 
                        mb: 2, 
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Box component="span" sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          background: '#9c27b0',
                          display: 'inline-block'
                        }} />
                        Problemi per la Piscina
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {analisi.problemiPiscina.map((problema, index) => (
                          <Typography key={index} variant="body2" sx={{ 
                            color: '#666',
                            padding: '8px 12px',
                            background: 'rgba(255,255,255,0.5)',
                            borderRadius: 3,
                            borderLeft: '4px solid #9c27b0'
                          }}>
                            {problema}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {storico.length > 0 && (
          <Card sx={{ 
            borderRadius: 6,
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            animation: 'slideInUp 0.8s ease-out 0.3s both'
          }}>
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4,
                background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                borderRadius: 4,
                p: 3,
                border: '1px solid rgba(102,126,234,0.1)'
              }}>
                <History sx={{ mr: 2, color: '#667eea', fontSize: 32 }} />
                <Typography variant="h4" sx={{ 
                  color: '#333', 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Storico Misurazioni
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                gap: 3 
              }}>
                {storico.map((item, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))',
                      borderRadius: 6, 
                      p: 4, 
                      border: '1px solid rgba(102,126,234,0.1)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                      '&:hover': {
                        transform: 'translateY(-8px) rotate(1deg)',
                        boxShadow: '0 20px 40px rgba(102,126,234,0.2)',
                        border: '1px solid rgba(102,126,234,0.3)'
                      }
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 2 
                    }}>
                      <Typography variant="subtitle1" sx={{ 
                        color: '#667eea', 
                        fontWeight: 700,
                        fontSize: '0.9rem'
                      }}>
                        {item.timestamp}
                      </Typography>
                      <Box sx={{ 
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 3,
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {item.volume} mc
                      </Box>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr', 
                      gap: 2 
                    }}>
                      <Box sx={{ 
                        background: 'rgba(102,126,234,0.1)', 
                        p: 2, 
                        borderRadius: 4,
                        textAlign: 'center'
                      }}>
                        <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                          pH
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                          {item.parametri.ph || 'N/D'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        background: 'rgba(76,175,80,0.1)', 
                        p: 2, 
                        borderRadius: 4,
                        textAlign: 'center'
                      }}>
                        <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                          Sale
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                          {item.parametri.sale || 'N/D'} kg/m³
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        background: 'rgba(255,152,0,0.1)', 
                        p: 2, 
                        borderRadius: 4,
                        textAlign: 'center'
                      }}>
                        <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                          REDOX
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                          {item.parametri.redox || 'N/D'} mV
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        background: 'rgba(156,39,176,0.1)', 
                        p: 2, 
                        borderRadius: 4,
                        textAlign: 'center'
                      }}>
                        <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                          Alcalinità
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                          {item.parametri.alcalinita || 'N/D'} mg/l
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default TrattamentoPhSale; 