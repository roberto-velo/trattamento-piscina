import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
  IconButton,
  LinearProgress,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Fade,
  Zoom,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  ArrowBack,
  AcUnit,
  CheckCircle,
  PlayArrow,
  Pause,
  Science,
  TrendingUp,
  Warning,
  Info,
  WaterDrop,
  Pool,
  Settings,
  Timer,
  Calculate,
  Save,
  Security,
  CleaningServices
} from '@mui/icons-material';

const ChiusuraInvernale = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDosageDialog, setShowDosageDialog] = useState(false);
  const [completedPhases, setCompletedPhases] = useState([]);

  // Dati dell'acqua
  const [waterData, setWaterData] = useState({
    volume: '',
    ph: '',
    cloro: '',
    sale: '',
    temperatura: '',
    redox: '',
    tac: '',
    acidoCianurico: ''
  });

  // Dosi calcolate
  const [dosages, setDosages] = useState({
    cloroShock: 0,
    phPlus: 0,
    phMinus: 0,
    alcalinitaPlus: 0,
    antigelo: 0,
    copertura: ''
  });

  // Consigli basati sui dati
  const [advice, setAdvice] = useState([]);

  const phases = [
    {
      id: 0,
      title: 'Rilevamento Dati',
      description: 'Inserisci i parametri dell\'acqua per calcolare le dosi corrette',
      icon: <Science />,
      color: '#667eea',
      duration: 2
    },
    {
      id: 1,
      title: 'Calcolo Dosi',
      description: 'Calcolo automatico delle quantità di prodotti necessari',
      icon: <Calculate />,
      color: '#f093fb',
      duration: 3
    },
    {
      id: 2,
      title: 'Pulizia Finale',
      description: 'Pulizia approfondita della piscina e degli impianti',
      icon: <Pool />,
      color: '#4facfe',
      duration: 6
    },
    {
      id: 3,
      title: 'Trattamento Chimico',
      description: 'Aggiunta dei prodotti per la protezione invernale',
      icon: <TrendingUp />,
      color: '#fa709a',
      duration: 5
    },
    {
      id: 4,
      title: 'Programmare Filtrazione',
      description: 'Impostare orologio filtrazione: 30 minuti ogni 4 ore',
      icon: <Timer />,
      color: '#fee140',
      duration: 3
    },
    {
      id: 5,
      title: 'Pastiglie Multifunzioni',
      description: 'Mettere 2 pastiglie multifunzioni per skimmer (ripetere a gennaio/febbraio)',
      icon: <CleaningServices />,
      color: '#a8edea',
      duration: 2
    },
    {
      id: 6,
      title: 'Protezione Antigelo',
      description: 'Applicazione di antigelo e protezioni termiche',
      icon: <Security />,
      color: '#4caf50',
      duration: 3
    },
    {
      id: 7,
      title: 'Copertura e Sicurezza',
      description: 'Installazione copertura e misure di sicurezza',
      icon: <AcUnit />,
      color: '#ff9800',
      duration: 4
    }
  ];

  const handleWaterDataChange = (field, value) => {
    setWaterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateDosages = () => {
    const volume = parseFloat(waterData.volume) || 0;
    const ph = parseFloat(waterData.ph) || 0;
    const cloro = parseFloat(waterData.cloro) || 0;
    const sale = parseFloat(waterData.sale) || 0;
    const tac = parseFloat(waterData.tac) || 0;
    const acidoCianurico = parseFloat(waterData.acidoCianurico) || 0;

    // Cloro granulare shock: calcolo basato su target 3-5 ppm per chiusura
    let cloroShock = 0;
    if (cloro > 0 && cloro < 3) {
      cloroShock = (4 - cloro) * 0.2 * volume; // 0.2 kg per mc per aumentare di 1 ppm
    }
    let phPlus = 0;
    let phMinus = 0;
    let alcalinitaPlus = 0;
    let salePlus = 0;
    let antigelo = volume * 0.001; // 1kg per mc
    let copertura = '';

    // Calcolo pH per chiusura con pH polvere (target: 7.3)
    if (ph > 0) {
      if (ph < 7.3) {
        // pH+ polvere: 10g per mc per aumentare di 0.1
        phPlus = (7.3 - ph) * 0.1 * volume;
      } else if (ph > 7.3) {
        // pH- polvere: 10g per mc per diminuire di 0.1
        phMinus = (ph - 7.3) * 0.1 * volume;
      }
    }

    // Calcolo TAC (alcalinità) con bicarbonato granulare (target: 100 mg/l)
    if (tac > 0 && tac < 100) {
      // Bicarbonato granulare: 1.5g per mc per aumentare di 10 mg/l
      alcalinitaPlus = (100 - tac) * 0.0015 * volume;
    }

    // Calcolo sale (target: 4 kg/m³)
    if (sale > 0 && sale < 4) {
      salePlus = (4 - sale) * volume; // kg di sale da aggiungere
    }

    // Tipo di copertura in base al volume
    if (volume < 50) {
      copertura = 'Copertura telo + rete';
    } else if (volume < 100) {
      copertura = 'Copertura telo + rete + galleggianti';
    } else {
      copertura = 'Copertura telo + rete + galleggianti + ancoraggio';
    }

    setDosages({
      cloroShock: Math.round(cloroShock * 100) / 100,
      phPlus: Math.round(phPlus * 100) / 100,
      phMinus: Math.round(phMinus * 100) / 100,
      alcalinitaPlus: Math.round(alcalinitaPlus * 100) / 100,
      salePlus: Math.round(salePlus * 100) / 100,
      antigelo: Math.round(antigelo * 100) / 100,
      copertura
    });

    // Genera consigli
    generateAdvice();
  };

  const generateAdvice = () => {
    const newAdvice = [];
    const ph = parseFloat(waterData.ph);
    const cloro = parseFloat(waterData.cloro);
    const sale = parseFloat(waterData.sale);
    const temperatura = parseFloat(waterData.temperatura);
    const redox = parseFloat(waterData.redox);
    const tac = parseFloat(waterData.tac);
    const acidoCianurico = parseFloat(waterData.acidoCianurico);

    if (ph > 0) {
      if (ph < 7.2) {
        newAdvice.push({
          type: 'warning',
          message: 'pH troppo basso per chiusura. Aggiungere pH+ per portare il valore a 7.3'
        });
      } else if (ph > 7.4) {
        newAdvice.push({
          type: 'warning',
          message: 'pH troppo alto per chiusura. Aggiungere pH- per portare il valore a 7.3'
        });
      } else {
        newAdvice.push({
          type: 'success',
          message: 'pH nella norma per chiusura (7.2-7.4)'
        });
      }
    }

    if (tac > 0) {
      if (tac < 80) {
        newAdvice.push({
          type: 'warning',
          message: 'TAC troppo bassa per chiusura. Aggiungere alcalinità+ per portare il valore tra 80-120 mg/l'
        });
      } else if (tac > 120) {
        newAdvice.push({
          type: 'warning',
          message: 'TAC troppo alta. Considerare l\'uso di pH- per ridurre'
        });
      } else {
        newAdvice.push({
          type: 'success',
          message: 'TAC nella norma per chiusura (80-120 mg/l)'
        });
      }
    }

    if (temperatura > 0) {
      if (temperatura < 15) {
        newAdvice.push({
          type: 'info',
          message: 'Temperatura bassa. La disinfezione potrebbe essere meno efficace'
        });
      } else if (temperatura > 30) {
        newAdvice.push({
          type: 'info',
          message: 'Temperatura alta. Monitorare più frequentemente i parametri'
        });
      } else {
        newAdvice.push({
          type: 'success',
          message: 'Temperatura nella norma (15-30°C)'
        });
      }
    }

    if (cloro > 0) {
      if (cloro < 2) {
        newAdvice.push({
          type: 'warning',
          message: 'Cloro shock insufficiente per chiusura. Aggiungere cloro shock per portare il valore a 3-5 ppm'
        });
      } else if (cloro > 6) {
        newAdvice.push({
          type: 'warning',
          message: 'Cloro shock troppo alto. Attendere che scenda prima di procedere'
        });
      } else {
        newAdvice.push({
          type: 'success',
          message: 'Cloro shock nella norma per chiusura (2-6 ppm)'
        });
      }
    }

    if (redox > 0) {
      if (redox < 680) {
        newAdvice.push({
          type: 'warning',
          message: 'Potenziale redox basso. Aumentare la disinfezione per portare il valore a 700 mV'
        });
      } else if (redox > 720) {
        newAdvice.push({
          type: 'info',
          message: 'Potenziale redox alto. Disinfezione efficace per la chiusura'
        });
      } else {
        newAdvice.push({
          type: 'success',
          message: 'Potenziale redox nella norma (680-720 mV)'
        });
      }
    }

    if (sale > 0) {
      if (sale < 4) {
        const saleDaAggiungere = (4 - sale) * volume; // kg di sale da aggiungere
        newAdvice.push({
          type: 'info',
          message: `Concentrazione sale bassa. Aggiungere ${Math.round(saleDaAggiungere * 100) / 100} kg di sale per portare a 4 kg/m³ (non critico per chiusura)`
        });
      } else if (sale > 4) {
        newAdvice.push({
          type: 'warning',
          message: 'Concentrazione sale troppo alta. Considerare diluizione'
        });
      } else {
        newAdvice.push({
          type: 'success',
          message: 'Concentrazione sale nella norma (4 kg/m³)'
        });
      }
    }

    if (acidoCianurico > 0) {
      if (acidoCianurico > 80) {
        newAdvice.push({
          type: 'warning',
          message: 'Acido cianurico troppo alto. Considerare diluizione o sequestrante'
        });
      } else if (acidoCianurico < 20) {
        newAdvice.push({
          type: 'info',
          message: 'Acido cianurico basso. Il cloro potrebbe degradarsi più velocemente'
        });
      } else {
        newAdvice.push({
          type: 'success',
          message: 'Acido cianurico nella norma (20-80 mg/l)'
        });
      }
    }

    setAdvice(newAdvice);
  };

  const completePhase = (phaseId) => {
    if (!completedPhases.includes(phaseId)) {
      setCompletedPhases([...completedPhases, phaseId]);
    }
  };

  const resetProcess = () => {
    setCompletedPhases([]);
  };

  // Calcola il progresso basato sulle fasi completate
  const progressPercentage = (completedPhases.length / phases.length) * 100;

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
          <AcUnit sx={{ mr: 2, verticalAlign: 'middle' }} />
          Chiusura Invernale Piscina
        </Typography>

        {/* Sezione inserimento dati e consigli */}
        <Card sx={{ 
          mb: 4,
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#333' }}>
              <Science sx={{ mr: 1, color: '#667eea' }} />
              Rilevamento Dati Acqua
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              <strong>Volume piscina (mc):</strong> Campo obbligatorio per calcolare le dosi corrette
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Volume piscina (mc) *"
                  type="number"
                  value={waterData.volume}
                  onChange={(e) => handleWaterDataChange('volume', e.target.value)}
                  required
                  helperText="Campo obbligatorio per calcolare le dosi"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#667eea',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="pH"
                  type="number"
                  inputProps={{ step: 0.1, min: 0, max: 14 }}
                  value={waterData.ph}
                  onChange={(e) => handleWaterDataChange('ph', e.target.value)}
                  helperText="Valore ideale per chiusura: 7.4-7.8"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                                        label="Cloro libero (ppm)"
                  type="number"
                  inputProps={{ step: 0.1, min: 0 }}
                  value={waterData.cloro}
                  onChange={(e) => handleWaterDataChange('cloro', e.target.value)}
                  helperText="Valore ideale per chiusura: 1-5 ppm"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                                        label="Sale (kg/m³)"
                  type="number"
                                      inputProps={{ step: 0.1, min: 0 }}
                  value={waterData.sale}
                  onChange={(e) => handleWaterDataChange('sale', e.target.value)}
                  helperText="Valore ideale: 3-5 kg/m³"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Temperatura (°C)"
                  type="number"
                  inputProps={{ step: 1, min: 0 }}
                  value={waterData.temperatura}
                  onChange={(e) => handleWaterDataChange('temperatura', e.target.value)}
                  helperText="Temperatura dell'acqua"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Potenziale REDOX (mV)"
                  type="number"
                  inputProps={{ step: 10, min: 0 }}
                  value={waterData.redox}
                  onChange={(e) => handleWaterDataChange('redox', e.target.value)}
                  helperText="Valore ideale: 650-750"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="TAC (mg/l)"
                  type="number"
                  inputProps={{ step: 10, min: 0 }}
                  value={waterData.tac}
                  onChange={(e) => handleWaterDataChange('tac', e.target.value)}
                  helperText="Valore ideale per chiusura: 100-200"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Acido Cianurico (mg/l)"
                  type="number"
                  inputProps={{ step: 5, min: 0 }}
                  value={waterData.acidoCianurico}
                  onChange={(e) => handleWaterDataChange('acidoCianurico', e.target.value)}
                  helperText="Valore ideale: 20-80 mg/l"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Calculate />}
                  onClick={() => {
                    calculateDosages();
                    setShowDosageDialog(true);
                  }}
                  disabled={!waterData.volume}
                  sx={{
                    background: 'linear-gradient(45deg, #f093fb 30%, #f5576c 90%)',
                    borderRadius: 3,
                    py: 2,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(240, 147, 251, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #e085e7 30%, #e04a5f 90%)',
                      boxShadow: '0 6px 20px rgba(240, 147, 251, 0.6)',
                    }
                  }}
                >
                  Calcola Dosi
                </Button>
              </Grid>
            </Grid>

            {/* Consigli */}
            {advice.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#333', mb: 2 }}>
                  <Info sx={{ mr: 1, color: '#667eea' }} />
                  Analisi e Consigli
                </Typography>
                <Grid container spacing={2}>
                  {advice.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Alert 
                        severity={item.type} 
                        sx={{ 
                          borderRadius: 2,
                          '& .MuiAlert-icon': {
                            fontSize: '1.2rem'
                          }
                        }}
                      >
                        {item.message}
                      </Alert>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Barra di progresso generale */}
        <Card sx={{ 
          mb: 4,
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ color: '#333' }}>
                <TrendingUp sx={{ mr: 1, color: '#667eea' }} />
                Progresso Chiusura
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {completedPhases.length} di {phases.length} fasi completate
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ 
                height: 12, 
                borderRadius: 6,
                backgroundColor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #667eea, #764ba2)',
                  borderRadius: 6
                }
              }} 
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Button
                variant="outlined"
                onClick={resetProcess}
                sx={{
                  borderRadius: 2,
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#5a6fd8',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  }
                }}
              >
                Reset Progresso
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Fasi del processo come lista da spuntare */}
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
              Fasi del Processo
            </Typography>
            
            <List>
              {phases.map((phase, index) => (
                <React.Fragment key={phase.id}>
                  <ListItem 
                    button
                    onClick={() => {
                      if (!completedPhases.includes(phase.id)) {
                        completePhase(phase.id);
                      }
                    }}
                    sx={{ 
                      borderRadius: 2,
                      mb: 1,
                      backgroundColor: completedPhases.includes(phase.id) 
                        ? 'rgba(76, 175, 80, 0.1)' 
                        : 'transparent',
                      border: completedPhases.includes(phase.id)
                        ? `2px solid ${phase.color}` 
                        : '1px solid rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      cursor: completedPhases.includes(phase.id) ? 'default' : 'pointer',
                      '&:hover': {
                        backgroundColor: completedPhases.includes(phase.id) 
                          ? 'rgba(76, 175, 80, 0.1)' 
                          : 'rgba(102, 126, 234, 0.05)',
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          background: phase.color,
                          borderRadius: '50%',
                          width: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 20
                        }}
                      >
                        {phase.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                          {phase.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {phase.description}
                        </Typography>
                      }
                    />
                    <Box display="flex" alignItems="center" gap={1}>
                      {completedPhases.includes(phase.id) ? (
                        <Chip
                          icon={<CheckCircle />}
                          label="Completato"
                          color="success"
                          sx={{ borderRadius: 2, fontWeight: 'bold' }}
                        />
                      ) : (
                        <Chip
                          label="Clicca per completare"
                          variant="outlined"
                          sx={{ 
                            borderRadius: 2, 
                            fontWeight: 'bold',
                            borderColor: '#667eea',
                            color: '#667eea'
                          }}
                        />
                      )}
                    </Box>
                  </ListItem>
                  {index < phases.length - 1 && <Divider sx={{ my: 1 }} />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Dialog per dosi calcolate */}
        <Dialog open={showDosageDialog} onClose={() => setShowDosageDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ background: 'linear-gradient(45deg, #f093fb 30%, #f5576c 90%)', color: 'white' }}>
            <Calculate sx={{ mr: 1, verticalAlign: 'middle' }} />
            Dosi Calcolate - Volume: {waterData.volume} mc
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ p: 2, textAlign: 'center', background: '#fff3e0' }}>
                  <Typography variant="h6" color="#f57c00" gutterBottom>
                    Cloro Granulare Shock
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                    {dosages.cloroShock} kg
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Per protezione invernale (12g/mc)
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ p: 2, textAlign: 'center', background: '#e8f5e8' }}>
                  <Typography variant="h6" color="#388e3c" gutterBottom>
                    pH+ Polvere (se necessario)
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                    {dosages.phPlus} kg
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Carbonato di sodio polvere (10g/mc per 0.1)
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ p: 2, textAlign: 'center', background: '#ffebee' }}>
                  <Typography variant="h6" color="#d32f2f" gutterBottom>
                    pH- Polvere (se necessario)
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                    {dosages.phMinus} kg
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Acido muriatico polvere (10g/mc per 0.1)
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ p: 2, textAlign: 'center', background: '#e3f2fd' }}>
                  <Typography variant="h6" color="#1976d2" gutterBottom>
                    TAC+ Granulare (se necessario)
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {dosages.alcalinitaPlus} kg
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bicarbonato di sodio granulare
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ p: 2, textAlign: 'center', background: '#fce4ec' }}>
                  <Typography variant="h6" color="#c2185b" gutterBottom>
                    Antigelo
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#c2185b' }}>
                    {dosages.antigelo} kg
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Per protezione termica
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ p: 2, textAlign: 'center', background: '#e8f5e8' }}>
                  <Typography variant="h6" color="#388e3c" gutterBottom>
                    Tipo Copertura
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                    {dosages.copertura}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sistema di copertura consigliato
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDosageDialog(false)}>Chiudi</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ChiusuraInvernale; 