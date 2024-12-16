import { useState } from 'react'
import './App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Articles from '../components/Articles'
import Navbar from '../components/Navbar'


function App() {

  return (
    <>
    <Navbar></Navbar>
    <Header></Header>
    <Articles></Articles>
    <Footer></Footer>
    </>
  )
}

export default App
