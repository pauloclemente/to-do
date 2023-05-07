import React from 'react'
import ReactDOM from 'react-dom/client'
import { Hero } from './sections/Hero.tsx'
import './styles/global.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Hero/>
  </React.StrictMode>,
)
