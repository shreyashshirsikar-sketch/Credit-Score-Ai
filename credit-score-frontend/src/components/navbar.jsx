// Navbar.jsx - Updated with better styling
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  useTheme,
  useScrollTrigger,
  Slide,
  IconButton
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import MenuIcon from '@mui/icons-material/Menu';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const theme = useTheme();
  
  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        elevation={1}
        sx={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <CreditScoreIcon 
                sx={{ 
                  mr: 2, 
                  color: theme.palette.primary.main,
                  fontSize: 32
                }} 
              />
              <Typography
                variant="h5"
                component={RouterLink}
                to="/"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  textDecoration: 'none',
                  letterSpacing: '-0.5px',
                }}
              >
                Credit<span style={{ color: theme.palette.primary.main }}>AI</span>
              </Typography>
            </Box>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button
                component={RouterLink}
                to="/"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent',
                  }
                }}
              >
                Home
              </Button>
              <Button
                component={RouterLink}
                to="/predict"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent',
                  }
                }}
              >
                Predict
              </Button>
              <Button
                component={RouterLink}
                to="/dashboard"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent',
                  }
                }}
              >
                Analytics
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent',
                  }
                }}
              >
                About
              </Button>
              <Button
                variant="contained"
                component={RouterLink}
                to="/predict"
                sx={{
                  ml: 2,
                  px: 3,
                  borderRadius: 2,
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 4px 14px 0 ${theme.palette.primary.main}33`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px 0 ${theme.palette.primary.main}66`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started
              </Button>
            </Box>
            
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;