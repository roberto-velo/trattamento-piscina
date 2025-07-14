import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  IconButton,
  Divider
} from '@mui/material';
import {
  ArrowBack,
  Science,
  Save,
  Refresh
} from '@mui/icons-material';

const TrattamentoManuale = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ph: '',
    cloro: '',
    alcalinita: '',
    durezza: '',
    stabilizzatore: '',
    temperatura: ''
  });
  const [savedData, setSavedData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const timestamp = new Date().toLocaleString('it-IT');
    const newEntry = {
      ...formData,
      timestamp,
      id: Date.now()
    };
    setSavedData(prev => [newEntry, ...prev]);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleReset = () => {
    setFormData({
      ph: '',
      cloro: '',
      alcalinita: '',
      durezza: '',
      stabilizzatore: '',
      temperatura: ''
    });
  };

  const getPhStatus = (ph) => {
    const phValue = parseFloat(ph);
    if (phValue < 7.2) return { status: 'Basso', color: 'error' };
    if (phValue > 7.6) return { status: 'Alto', color: 'error' };
    return { status: 'Normale', color: 'success' };
  };

  const getCloroStatus = (cloro) => {
    const cloroValue = parseFloat(cloro);
    if (cloroValue < 1.0) return { status: 'Basso', color: 'error' };
    if (cloroValue > 3.0) return { status: 'Alto', color: 'warning' };
    return { status: 'Normale', color: 'success' };
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Box display="flex" alignItems="center">
            <Science sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
            <Typography variant="h4" component="h1">
              Trattamento Manuale
            </Typography>
          </Box>
        </Box>

        {showAlert && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Dati salvati con successo!
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Inserimento Parametri
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="pH"
                      type="number"
                      value={formData.ph}
                      onChange={(e) => handleInputChange('ph', e.target.value)}
                      inputProps={{ step: 0.1, min: 0, max: 14 }}
                      helperText="Valore ideale: 7.2-7.6"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Cloro (mg/l)"
                      type="number"
                      value={formData.cloro}
                      onChange={(e) => handleInputChange('cloro', e.target.value)}
                      inputProps={{ step: 0.1, min: 0 }}
                      helperText="Valore ideale: 1.0-3.0"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Alcalinità (mg/l)"
                      type="number"
                      value={formData.alcalinita}
                      onChange={(e) => handleInputChange('alcalinita', e.target.value)}
                      inputProps={{ min: 0 }}
                      helperText="Valore ideale: 80-120"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Durezza (mg/l)"
                      type="number"
                      value={formData.durezza}
                      onChange={(e) => handleInputChange('durezza', e.target.value)}
                      inputProps={{ min: 0 }}
                      helperText="Valore ideale: 200-400"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Stabilizzatore (mg/l)"
                      type="number"
                      value={formData.stabilizzatore}
                      onChange={(e) => handleInputChange('stabilizzatore', e.target.value)}
                      inputProps={{ min: 0 }}
                      helperText="Valore ideale: 30-80"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Temperatura (°C)"
                      type="number"
                      value={formData.temperatura}
                      onChange={(e) => handleInputChange('temperatura', e.target.value)}
                      inputProps={{ step: 0.5, min: 0 }}
                    />
                  </Grid>
                </Grid>
                <Box mt={3} display="flex" gap={2}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    disabled={!formData.ph || !formData.cloro}
                  >
                    Salva Dati
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Stato Attuale
                </Typography>
                {formData.ph && (
                  <Alert 
                    severity={getPhStatus(formData.ph).color} 
                    sx={{ mb: 2 }}
                  >
                    pH: {formData.ph} - {getPhStatus(formData.ph).status}
                  </Alert>
                )}
                {formData.cloro && (
                  <Alert 
                    severity={getCloroStatus(formData.cloro).color}
                    sx={{ mb: 2 }}
                  >
                    Cloro: {formData.cloro} mg/l - {getCloroStatus(formData.cloro).status}
                  </Alert>
                )}
                {formData.alcalinita && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Alcalinità: {formData.alcalinita} mg/l
                  </Typography>
                )}
                {formData.durezza && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Durezza: {formData.durezza} mg/l
                  </Typography>
                )}
                {formData.stabilizzatore && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Stabilizzatore: {formData.stabilizzatore} mg/l
                  </Typography>
                )}
                {formData.temperatura && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Temperatura: {formData.temperatura} °C
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {savedData.length > 0 && (
          <Box mt={4}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Storico Misurazioni
            </Typography>
            <Grid container spacing={2}>
              {savedData.slice(0, 5).map((entry) => (
                <Grid item xs={12} key={entry.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        {entry.timestamp}
                      </Typography>
                      <Typography variant="body2">
                        pH: {entry.ph} | Cloro: {entry.cloro} mg/l | 
                        Alcalinità: {entry.alcalinita} mg/l | 
                        Durezza: {entry.durezza} mg/l
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default TrattamentoManuale; 