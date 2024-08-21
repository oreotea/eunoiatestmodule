// src/components/Navbar.js
import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, p: 2, backgroundColor: '#f4f4f4' }}>
      <Button variant="contained" onClick={() => navigate('/session')}>
        Session Tester
      </Button>
      <Button variant="contained" onClick={() => navigate('/chat')}>
        Chat Tester
      </Button>
    </Box>
  );
};

export default Navbar;
