// src/components/ChatTester.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { fastAPI } from '../api/api';

const ChatTester = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fastAPI.post('/chat/text_completion', {
        metadata: { user: 'Test User' },
        messages: [...messages, newMessage],
      });
      const aiMessage = response.data.messages.find((msg) => msg.role === 'assistant');
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5">Chat Tester</Typography>
      <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 2, p: 2, backgroundColor: '#f4f4f4' }}>
        {messages.map((message, index) => (
          <Typography key={index} align={message.role === 'user' ? 'right' : 'left'}>
            {message.content}
          </Typography>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button variant="contained" onClick={sendMessage} disabled={loading}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatTester;
