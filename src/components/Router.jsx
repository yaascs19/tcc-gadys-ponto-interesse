import { useState, useEffect } from 'react'
import App from '../App'
import Home from './Home'
import Amazonas from './Amazonas'
import Lugares from './Lugares'
import SobrePage from './SobrePage'
import Contato from './Contato'

function Router() {
  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    const path = window.location.pathname
    const hash = window.location.hash
    
    if (path.includes('home') || hash.includes('home')) {
      setCurrentPage('welcome')
    } else if (path.includes('amazonas') || hash.includes('amazonas')) {
      setCurrentPage('amazonas')
    } else if (path.includes('lugares') || hash.includes('lugares')) {
      setCurrentPage('lugares')
    } else if (path.includes('sobre') || hash.includes('sobre')) {
      setCurrentPage('sobre')
    } else if (path.includes('contato') || hash.includes('contato')) {
      setCurrentPage('contato')
    } else {
      setCurrentPage('app')
    }
  }, [])

  console.log('Rendering page:', currentPage)
  
  switch (currentPage) {
    case 'welcome':
      return <Home />
    case 'amazonas':
      return <Amazonas />
    case 'lugares':
      return <Lugares />
    case 'sobre':
      return <SobrePage />
    case 'contato':
      return <Contato />
    default:
      return <App />
  }
}

export default Router