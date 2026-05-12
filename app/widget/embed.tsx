import React from 'react';
import ReactDOM from 'react-dom/client';
import FusionChatWidget from '@/components/chat/FusionChatWidget';
import '../globals.css';

const initFusionChat = () => {
  let container = document.getElementById('fusion-ai-chat-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'fusion-ai-chat-root';
    document.body.appendChild(container);
  }

  // 2. Render Sarah
  const root = ReactDOM.createRoot(container);
  root.render(<FusionChatWidget />);
};

if (document.readyState === 'complete') {
  initFusionChat();
} else {
  window.addEventListener('load', initFusionChat);
}