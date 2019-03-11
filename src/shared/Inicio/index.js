import React from 'react'
import Banner from './banner'
import About from './about'
import Identidad from './identidad'
import Apoyo from './apoyo'

export default function Inicio(){
  return (
    <main className="home">
      <Banner/>
      <About/>
      <Identidad/>
      <Apoyo/>
    </main>

  )
 }
