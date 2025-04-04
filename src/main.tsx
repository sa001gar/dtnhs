
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Serve sitemap.xml from public folder
if (window.location.pathname === '/sitemap.xml') {
  fetch('/sitemap.xml')
    .then(response => response.text())
    .then(text => {
      document.open();
      document.write(text);
      document.close();
    })
    .catch(error => {
      console.error('Error loading sitemap:', error);
    });
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}
