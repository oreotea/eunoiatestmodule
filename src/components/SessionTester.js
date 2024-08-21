// src/components/SessionTester.js
import React, { useState } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import useVapi from '../hooks/useVapi';

const assistantOptions = process.env.REACT_APP_ASSISTANT_KEY;

const SessionTester = () => {
  const {
    connecting,
    connected,
    startCall,
    endCall,
    progress,
    summaryOpen,
    getDuration,
    handleCloseSummary
  } = useVapi(assistantOptions);

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5">Session Tester</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
        <IconButton onClick={startCall} disabled={connecting || connected} sx={{ mr: 2 }}>
          <MicIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={endCall} disabled={!connected}>
          <StopIcon fontSize="large" />
        </IconButton>
      </Box>
      {connected && <Typography>Session in progress...</Typography>}
      {summaryOpen && (
        <Box>
          <Typography>Session Duration: {getDuration()}</Typography>
          <Button onClick={handleCloseSummary}>Close Summary</Button>
        </Box>
      )}
    </Box>
  );
};

export default SessionTester;
