import React from 'react';
import ReactDOM from 'react-dom/client';
import FusionChatWidget from '@/components/chat/FusionChatWidget';

const initFusionChat = () => {
  let host = document.getElementById('fusion-ai-chat-root');
  if (!host) {
    host = document.createElement('div');
    host.id = 'fusion-ai-chat-root';
    document.body.appendChild(host);
  }

  if (host.shadowRoot) return;

  const shadow = host.attachShadow({ mode: 'open' });
  const container = document.createElement('div');
  container.id = 'fusion-widget-mount';
  // 💡 Ensure the container itself has a height/width context
  container.style.display = 'block'; 
  shadow.appendChild(container);

  // 🚀 THE ULTIMATE STYLE INJECTION
  // We grab all styles and check for Tailwind markers
  const allStyles = Array.from(document.querySelectorAll('style'));
  allStyles.forEach((style) => {
    // Vite-plugin-css-injected-by-js and Tailwind usually leave these clues
    const isTailwind = style.textContent?.includes('tailwindcss') || 
                      style.textContent?.includes('--tw-') ||
                      style.hasAttribute('data-vite-plugin-css-injected-by-js');
    
    if (isTailwind) {
      const newStyle = document.createElement('style');
      newStyle.textContent = style.textContent;
      shadow.appendChild(newStyle);
    }
  });

  const root = ReactDOM.createRoot(container);
  root.render(<FusionChatWidget />);
};

if (document.readyState === 'complete') {
  initFusionChat();
} else {
  window.addEventListener('load', initFusionChat);
}