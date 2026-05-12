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

  // 💡 Check if we already initialized to prevent double-rendering
  if (host.shadowRoot) return;

  const shadow = host.attachShadow({ mode: 'open' });
  const container = document.createElement('div');
  container.id = 'fusion-widget-mount';
  shadow.appendChild(container);

  // 🚀 THE FIX: Find the Tailwind styles and move them into the Shadow Root
  // Vite-plugin-css-injected-by-js puts styles in a <style> tag in the <head>
  const tailwindStyles = document.querySelectorAll('style');
  tailwindStyles.forEach((style) => {
    // We look for the tag that contains Tailwind or Vite injected markers
    if (style.textContent?.includes('tailwindcss') || style.hasAttribute('data-vite-plugin-css-injected-by-js')) {
      shadow.appendChild(style.cloneNode(true));
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