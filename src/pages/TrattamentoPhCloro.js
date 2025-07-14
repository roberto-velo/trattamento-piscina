import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Slider,
  Button,
  Alert,
  IconButton,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  ArrowBack,
  Settings,
  PlayArrow,
  Pause,
  Warning,
  CheckCircle,
  Error
} from '@mui/icons-material';

const TrattamentoPhCloro = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phValue, setPhValue] = useState(7.4);
  const [cloroValue, setCloroValue] = useState(2.0);
  const [phTarget, setPhTarget] = useState(7.4);
  const [cloroTarget, setCloroTarget] = useState(2.0);
  const [phCorrection, setPhCorrection] = useState(false);
  const [cloroCorrection, setCloroCorrection] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        // Simulazione variazione valori
        setPhValue(prev => {
          const variation = (Math.random() - 0.5) * 0.2;
          const newValue = prev + variation;
          return Math.max(6.8, Math.min(8.2, newValue));
        });
        
        setCloroValue(prev => {
          const variation = (Math.random() - 0.5) * 0.3;
          const newValue = prev + variation;
          return Math.max(0.5, Math.min(4.0, newValue));
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    // Controllo automatico pH
    if (isActive && Math.abs(phValue - phTarget) > 0.1) {
      setPhCorrection(true);
      setStatus('correcting_ph');
    } else {
      setPhCorrection(false);
    }

    // Controllo automatico cloro
    if (isActive && Math.abs(cloroValue - cloroTarget) > 0.2) {
      setCloroCorrection(true);
      setStatus('correcting_cloro');
    } else {
      setCloroCorrection(false);
    }

    if (!phCorrection && !cloroCorrection && isActive) {
      setStatus('stable');
    }
  }, [phValue, cloroValue, phTarget, cloroTarget, isActive, phCorrection, cloroCorrection]);

  const getStatusColor = () => {
    switch (status) {
      case 'stable': return 'success';
      case 'correcting_ph': return 'warning';
      case 'correcting_cloro': return 'warning';
      default: return 'info';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'stable': return <CheckCircle />;
      case 'correcting_ph': return <Warning />;
      case 'correcting_cloro': return <Warning />;
      default: return <Settings />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'stable': return 'Sistema Stabile';
      case 'correcting_ph': return 'Correzione pH in corso';
      case 'correcting_cloro': return 'Correzione Cloro in corso';
      default: return 'Sistema Inattivo';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Box display="flex" alignItems="center">
            <Settings sx={{ fontSize: 40, color: '#388e3c', mr: 2 }} />
            <Typography variant="h4" component="h1">
              Centralina pH/Cloro
            </Typography>
          </Box>
        </Box>

        <Alert 
          severity={getStatusColor()} 
          icon={getStatusIcon()}
          sx={{ mb: 3 }}
        >
          {getStatusText()}
        </Alert>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Controllo Sistema
                </Typography>
                
                <Box mb={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Attiva Centralina"
                  />
                </Box>

                <Box mb={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    Target pH: {phTarget}
                  </Typography>
                  <Slider
                    value={phTarget}
                    onChange={(e, value) => setPhTarget(value)}
                    min={7.0}
                    max={7.8}
                    step={0.1}
                    marks
                    valueLabelDisplay="auto"
                    disabled={!isActive}
                  />
                </Box>

                <Box mb={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    Target Cloro: {cloroTarget} mg/l
                  </Typography>
                  <Slider
                    value={cloroTarget}
                    onChange={(e, value) => setCloroTarget(value)}
                    min={1.0}
                    max={3.0}
                    step={0.1}
                    marks
                    valueLabelDisplay="auto"
                    disabled={!isActive}
                  />
                </Box>

                <Button
                  variant="contained"
                  startIcon={isActive ? <Pause /> : <PlayArrow />}
                  onClick={() => setIsActive(!isActive)}
                  fullWidth
                  color={isActive ? "secondary" : "primary"}
                >
                  {isActive ? 'Pausa Sistema' : 'Avvia Sistema'}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monitoraggio Tempo Reale
                </Typography>

                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2">pH Attuale</Typography>
                    <Chip 
                      label={phValue.toFixed(1)} 
                      color={Math.abs(phValue - phTarget) <= 0.1 ? "success" : "warning"}
                      size="small"
                    />
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={((phValue - 6.8) / (8.2 - 6.8)) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Range: 6.8 - 8.2
                  </Typography>
                </Box>

                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2">Cloro Attuale</Typography>
                    <Chip 
                      label={`${cloroValue.toFixed(1)} mg/l`} 
                      color={Math.abs(cloroValue - cloroTarget) <= 0.2 ? "success" : "warning"}
                      size="small"
                    />
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={((cloroValue - 0.5) / (4.0 - 0.5)) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Range: 0.5 - 4.0 mg/l
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Azioni Automatiche
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Chip
                      icon={phCorrection ? <Warning /> : <CheckCircle />}
                      label="Correzione pH"
                      color={phCorrection ? "warning" : "success"}
                      variant={phCorrection ? "filled" : "outlined"}
                    />
                    <Chip
                      icon={cloroCorrection ? <Warning /> : <CheckCircle />}
                      label="Correzione Cloro"
                      color={cloroCorrection ? "warning" : "success"}
                      variant={cloroCorrection ? "filled" : "outlined"}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Informazioni Sistema
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="primary">
                    Sensori Attivi
                  </Typography>
                  <Typography variant="body2">
                    • Sensore pH digitale<br/>
                    • Sensore cloro amperometrico<br/>
                    • Sensore temperatura
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="primary">
                    Attuatori
                  </Typography>
                  <Typography variant="body2">
                    • Dosatore pH+ (acido)<br/>
                    • Dosatore pH- (base)<br/>
                    • Dosatore cloro liquido
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="primary">
                    Sicurezza
                  </Typography>
                  <Typography variant="body2">
                    • Controllo livelli serbatoi<br/>
                    • Allarme valori fuori range<br/>
                    • Protezione sovradosaggio
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default TrattamentoPhCloro; 