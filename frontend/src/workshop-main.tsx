import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import FertilityCourseLanding from './pages/course/FertilityCourseLanding';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <FertilityCourseLanding />
    </HelmetProvider>
  </React.StrictMode>
);
