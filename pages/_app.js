import '../styles/globals.css'
import React from 'react'
import Header from '../components/header.js'

function MyApp({ Component, pageProps }) {
  return(
    <React.Fragment>
      <Header/>
      <main>
        <Component {...pageProps} />
      </main>
    </React.Fragment>
  ) 
}

export default MyApp
