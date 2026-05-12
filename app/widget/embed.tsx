import React from 'react';
import ReactDOM from 'react-dom/client';
import FusionChatWidget from '@/components/chat/FusionChatWidget';
// Note: We don't import globals.css here because the bundler 
// will inject it into the shadow root automatically via our logic below.

const initFusionChat = () => {
  let host = document.getElementById('fusion-ai-chat-root');
  if (!host) {
    host = document.createElement('div');
    host.id = 'fusion-ai-chat-root';
    document.body.appendChild(host);
  }

  const shadow = host.attachShadow({ mode: 'open' });

  const emotionRoot = document.createElement('div');
  emotionRoot.id = 'fusion-widget-container';
  shadow.appendChild(emotionRoot);

  const styles = document.querySelectorAll('style[data-vite-plugin-css-injected-by-js]');
  styles.forEach(style => {
    shadow.appendChild(style.cloneNode(true));
  });
  const root = ReactDOM.createRoot(emotionRoot);
  root.render(<FusionChatWidget />);
};

if (document.readyState === 'complete') {
  initFusionChat();
} else {
  window.addEventListener('load', initFusionChat);
}