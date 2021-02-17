import React from 'react';
import Home from './views/Home'
import styles from './App.module.css'
const App: React.FC = () => {
  return (
    <div className={styles.MainContainer}>
      <Home />
    </div>
  )
}

export default App;
