// src/hooks/useVapi.js
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Vapi from '@vapi-ai/web';

const useVapi = (assistantOptions) => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const timerRef = useRef(null);
  const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);

  useEffect(() => {
    const onCallStart = () => {
      setConnecting(false);
      setConnected(true);
      startProgressBar();
      setStartTime(new Date());
    };

    const onCallEnd = () => {
      setConnecting(false);
      setConnected(false);
      stopProgressBar();
      setEndTime(new Date());
      setSummaryOpen(true);
    };

    const onError = (error) => {
      setConnecting(false);
      console.error('Vapi error', error);
    };

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('error', onError);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('error', onError);
      stopProgressBar();
    };
  }, []);

  const startCall = () => {
    setConnecting(true);
    vapi.start(assistantOptions)
      .then((res) => {
        console.log('call', res);
      })
      .catch((err) => {
        console.error('Error starting call', err);
      });
  };

  const endCall = async () => {
    vapi.stop();
    const duration = (new Date() - startTime) / 60000; // Duration in minutes
    try {
      await axios.post('/user/session', { date: startTime, duration });
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const startProgressBar = () => {
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (30 * 60));
        if (newProgress >= 100) {
          clearInterval(timerRef.current);
          return 100;
        }
        return newProgress;
      });
    }, 1000);
  };

  const stopProgressBar = () => {
    clearInterval(timerRef.current);
    setProgress(0);
  };

  const handleCloseSummary = () => {
    setSummaryOpen(false);
  };

  const getDuration = () => {
    if (startTime && endTime) {
      const duration = (endTime - startTime) / 1000;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      return `${minutes} minutes and ${seconds} seconds`;
    }
    return '';
  };

  return {
    connecting,
    connected,
    progress,
    summaryOpen,
    startCall,
    endCall,
    handleCloseSummary,
    getDuration,
  };
};

export default useVapi;
