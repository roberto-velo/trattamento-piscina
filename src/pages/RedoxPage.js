import React, { useState } from 'react';
import { Container, Typography, Box, Button, Modal, IconButton } from '@mui/material';
import { ArrowBack, TrendingUp, Close, ZoomIn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';

const RedoxPage = () => {
  const navigate = useNavigate();
  const [imageModalOpen, setImageModalOpen] = useState(false);
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
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      py: 4,
      '@keyframes gradientShift': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' }
      }
    }}>
      <HeaderLogo />
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          aria-label="Torna alla pagina principale"
          sx={{ 
            mb: 3, 
            color: 'white', 
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            px: 3,
            py: 1.5,
            transition: 'all 0.3s ease',
            '&:hover': { 
              backgroundColor: 'rgba(255,255,255,0.2)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
            } 
          }}
        >
          Torna alla Home
        </Button>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: 'white', 
            textAlign: 'center', 
            fontWeight: '900', 
            mb: 6, 
            textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            animation: 'fadeInUp 1s ease-out',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <TrendingUp sx={{ mr: 2, verticalAlign: 'middle', fontSize: '2.5rem' }} />
          Cos'è il valore REDOX?
        </Typography>
        <Box sx={{ 
          background: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(20px)',
          borderRadius: 6, 
          p: { xs: 3, md: 5 }, 
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)', 
          mb: 6,
          border: '1px solid rgba(255,255,255,0.2)',
          animation: 'slideInUp 0.8s ease-out',
          '@keyframes slideInUp': {
            '0%': { opacity: 0, transform: 'translateY(50px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          }
        }}>
          <Typography variant="h4" sx={{ 
            mb: 3, 
            color: '#667eea', 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            Definizione
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 4, 
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333'
          }}>
            Il valore <b style={{color: '#667eea'}}>REDOX</b> (o potenziale di ossido-riduzione) misura la capacità dell'acqua di ossidare o ridurre le sostanze presenti. In pratica, indica quanto l'acqua è "disinfettante" e quindi sicura per i bagnanti.
          </Typography>
          
          <Box sx={{ 
            background: 'linear-gradient(135deg, #667eea20, #764ba220)', 
            borderRadius: 4, 
            p: 3, 
            mb: 4,
            border: '1px solid rgba(102,126,234,0.1)'
          }}>
            <Typography variant="h5" sx={{ 
              mb: 2, 
              color: '#667eea', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Box component="span" sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                background: '#667eea',
                display: 'inline-block'
              }} />
              Perché è importante?
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: 0, 
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: '#333'
            }}>
              Un valore REDOX adeguato garantisce che i disinfettanti (come il cloro) siano efficaci contro batteri, virus e alghe. Un REDOX troppo basso indica acqua poco sicura; troppo alto può causare irritazioni.
            </Typography>
          </Box>
          
          <Typography variant="h5" sx={{ 
            mb: 3, 
            color: '#667eea', 
            fontWeight: 700,
            textAlign: 'center'
          }}>
            Valori di riferimento
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 2, 
            mb: 4 
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #4caf5020, #8bc34a20)', 
              borderRadius: 4, 
              p: 2,
              border: '1px solid rgba(76,175,80,0.2)'
            }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#4caf50' }}>
                Piscine private: <b>650-850 mV</b>
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #ff980020, #ffc10720)', 
              borderRadius: 4, 
              p: 2,
              border: '1px solid rgba(255,152,0,0.2)'
            }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#ff9800' }}>
                Piscine pubbliche: <b>750-900 mV</b>
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #2196f320, #03a9f420)', 
              borderRadius: 4, 
              p: 2,
              border: '1px solid rgba(33,150,243,0.2)'
            }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#2196f3' }}>
                Fontane giochi d'acqua: <b>750-900 mV</b>
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #9c27b020, #e91e6320)', 
              borderRadius: 4, 
              p: 2,
              border: '1px solid rgba(156,39,176,0.2)'
            }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#9c27b0' }}>
                Fontane ornamentali: <b>600-900 mV</b>
              </Typography>
            </Box>
          </Box>
          <Typography variant="h5" sx={{ 
            mb: 3, 
            color: '#667eea', 
            fontWeight: 700,
            textAlign: 'center'
          }}>
            Da cosa dipende il REDOX?
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 3, 
            mb: 4 
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #ff572220, #f4433620)', 
              borderRadius: 4, 
              p: 3,
              border: '1px solid rgba(255,87,34,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(255,87,34,0.2)'
              }
            }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#ff5722', mb: 1 }}>
                Cloro e disinfettanti
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Presenza e concentrazione di cloro o altri disinfettanti
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #4caf5020, #8bc34a20)', 
              borderRadius: 4, 
              p: 3,
              border: '1px solid rgba(76,175,80,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(76,175,80,0.2)'
              }
            }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#4caf50', mb: 1 }}>
                pH dell'acqua
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Un pH fuori range abbassa il REDOX
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #ff980020, #ffc10720)', 
              borderRadius: 4, 
              p: 3,
              border: '1px solid rgba(255,152,0,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(255,152,0,0.2)'
              }
            }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#ff9800', mb: 1 }}>
                Sostanze organiche
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Presenza di sostanze organiche o inquinanti
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #2196f320, #03a9f420)', 
              borderRadius: 4, 
              p: 3,
              border: '1px solid rgba(33,150,243,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(33,150,243,0.2)'
              }
            }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#2196f3', mb: 1 }}>
                Temperatura
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Temperatura dell'acqua
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ 
            background: 'linear-gradient(135deg, #9c27b020, #e91e6320)', 
            borderRadius: 4, 
            p: 3, 
            mb: 4,
            border: '1px solid rgba(156,39,176,0.2)'
          }}>
            <Typography variant="h5" sx={{ 
              mb: 2, 
              color: '#9c27b0', 
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
              Come si misura?
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: 0, 
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: '#333'
            }}>
              Il REDOX si misura con appositi elettrodi e centraline elettroniche. È un parametro fondamentale per la regolazione automatica della disinfezione nelle piscine moderne.
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ mb: 2, color: '#f5576c', fontWeight: 700 }}>
            Relazione tra pH, Cloro e REDOX
          </Typography>
          {/* Rimuovo i grafici e inserisco l'immagine fornita */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            my: 6, 
            width: '100%',
            padding: '0 20px',
            position: 'relative'
          }}>
            <img 
              src={process.env.PUBLIC_URL ? process.env.PUBLIC_URL + "/IMG_4058.jpg" : "/IMG_4058.jpg"} 
              alt="Correlazione tra Cloro Libero, pH e Redox" 
              style={{ 
                width: '100%', 
                maxWidth: '1200px', 
                borderRadius: 20, 
                boxShadow: '0 12px 40px rgba(0,0,0,0.25)', 
                border: '6px solid #f5576c',
                display: 'block',
                margin: '0 auto',
                objectFit: 'contain',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onClick={() => setImageModalOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setImageModalOpen(true);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Clicca per ingrandire l'immagine della correlazione tra Cloro Libero, pH e Redox"
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 16px 50px rgba(0,0,0,0.35)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)';
              }}
            />
            <IconButton
              aria-label="Ingrandisci immagine"
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: '#f5576c',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease'
              }}
              onClick={() => setImageModalOpen(true)}
            >
              <ZoomIn />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, color: '#333', textAlign: 'center' }}>
            <b>Correlazione tra Cloro Libero, pH e Redox:</b> il grafico mostra come, a parità di cloro libero, il potenziale REDOX e l’efficacia disinfettante variano in base al pH.<br/>
            Il range ideale per la disinfezione è evidenziato in azzurro.
          </Typography>
        </Box>
      </Container>

      {/* Modal per immagine a tutto schermo */}
      <Modal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box sx={{
          position: 'relative',
          maxWidth: '95vw',
          maxHeight: '95vh',
          bgcolor: 'rgba(0,0,0,0.9)',
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconButton
            aria-label="Chiudi immagine ingrandita"
            onClick={() => setImageModalOpen(false)}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              bgcolor: 'rgba(255,255,255,0.9)',
              color: '#333',
              zIndex: 1,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,1)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Close />
          </IconButton>
          <img
            src={process.env.PUBLIC_URL ? process.env.PUBLIC_URL + "/IMG_4058.jpg" : "/IMG_4058.jpg"}
            alt="Correlazione tra Cloro Libero, pH e Redox - Vista ingrandita"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: 8
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default RedoxPage; 