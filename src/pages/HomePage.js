import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Paper,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import {
  Science,
  Settings,
  Pool,
  BeachAccess,
  AcUnit,
  ArrowForward,
  WaterDrop,
  TrendingUp,
  Spa
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Analisi Chimica Acqua',
      description: 'Controlla e analizza tutti i parametri chimici della piscina con clorazione salina',
      icon: <Pool />,
      path: '/trattamento-ph-sale',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      hoverGradient: 'linear-gradient(135deg, #45a1f0 0%, #00e6f0 100%)',
      iconColor: '#ffffff',
      badge: 'Analisi',
      badgeColor: '#4facfe'
    },
    {
      title: 'Apertura Estiva',
      description: 'Procedure complete per l\'apertura stagionale e messa in funzione',
      icon: <BeachAccess />,
      path: '/apertura-estiva',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      hoverGradient: 'linear-gradient(135deg, #f0658a 0%, #f5d636 100%)',
      iconColor: '#ffffff',
      badge: 'Stagionale',
      badgeColor: '#fa709a'
    },
    {
      title: 'Chiusura Invernale',
      description: 'Procedure per la chiusura invernale e protezione della piscina',
      icon: <AcUnit />,
      path: '/chiusura-invernale',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      hoverGradient: 'linear-gradient(135deg, #9ce1de 0%, #f5c8d5 100%)',
      iconColor: '#2c3e50',
      badge: 'Invernale',
      badgeColor: '#a8edea'
    },
    {
      title: 'REDOX',
      description: 'Scopri cos’è il valore REDOX e perché è importante per la qualità dell’acqua',
      icon: <TrendingUp />,
      path: '/redox',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      hoverGradient: 'linear-gradient(135deg, #e085e7 0%, #e04a5f 100%)',
      iconColor: '#ffffff',
      badge: 'Info',
      badgeColor: '#f5576c'
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <HeaderLogo />
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(180deg)' }
          }
        }}
      />
      
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 3 }, position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={{ xs: 4, md: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 2,
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3.5rem' }
            }}
          >
            <WaterDrop sx={{ mr: { xs: 1, md: 2 }, verticalAlign: 'middle', fontSize: { xs: '2rem', md: '3rem' } }} />
            Gestione Chimica Piscina
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 300,
              mb: 3,
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }
            }}
          >
            Sistema professionale per la gestione dell'acqua
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    '& .card-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                    '& .card-arrow': {
                      transform: 'translateX(8px)',
                      opacity: 1,
                    }
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => navigate(item.path)}
                  sx={{ 
                    height: '100%',
                    p: 0,
                    position: 'relative'
                  }}
                >
                  {/* Header with gradient */}
                  <Box
                    sx={{
                      background: item.gradient,
                      p: { xs: 2, md: 3 },
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      className="card-icon"
                      sx={{
                        transition: 'all 0.4s ease',
                        display: 'inline-block',
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      {React.cloneElement(item.icon, {
                        sx: { 
                          fontSize: { xs: 40, md: 60 }, 
                          color: item.iconColor,
                          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                        }
                      })}
                    </Box>
                    
                    {/* Floating badge */}
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: { xs: 8, md: 16 },
                        right: { xs: 8, md: 16 },
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        color: item.badgeColor,
                        fontWeight: 'bold',
                        fontSize: { xs: '0.6rem', md: '0.75rem' },
                        backdropFilter: 'blur(10px)'
                      }}
                    />

                    {/* Animated background pattern */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        animation: 'pulse 3s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%, 100%': { opacity: 0.3 },
                          '50%': { opacity: 0.6 }
                        }
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <CardContent sx={{ p: { xs: 2, md: 3 }, textAlign: 'center' }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        mb: 2,
                        fontSize: { xs: '1.2rem', md: '1.4rem' }
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.6,
                        mb: 3,
                        fontSize: '0.95rem'
                      }}
                    >
                      {item.description}
                    </Typography>
                    
                    {/* Action indicator */}
                    <Box
                      className="card-arrow"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'all 0.3s ease',
                        color: item.badgeColor
                      }}
                    >
                      <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold' }}>
                        Accedi
                      </Typography>
                      <ArrowForward sx={{ fontSize: 20 }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Footer info */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem'
            }}
          >
            <Spa sx={{ mr: 1, verticalAlign: 'middle', fontSize: '1rem' }} />
            Sistema professionale per la gestione chimica della piscina
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage; 