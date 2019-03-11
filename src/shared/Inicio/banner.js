import React from 'react'

export default function Banner(){
  return (
    <section className="portada">
    <picture className="banner">
      <source media="(min-width: 801px)" srcSet="images/trajesTipicosPanamaBannerFull-2x.jpg 2x, images/trajesTipicosPanamaBannerFull-1x.jpg 1x"/>
      <source media="(min-width: 541px)" srcSet="images/trajesTipicosPanamaBannerTab-2x.jpg 2x, images/trajesTipicosPanamaBannerTab-1x.jpg 1x"/>
      <source media="(min-width: 10px)" srcSet="images/trajesTipicosPanamaBannerCel-2x.jpg 2x, images/trajesTipicosPanamaBannerCel-1x.jpg 1x"/>
      <img alt="trajes tipicos de panama, pollera de lujo, pollera congo y montuna ocueña" className="completa" src="images/trajesTipicosPanamaBannerCel-1x.jpg"/>
    </picture>
    <articulo className="negroTrans completa texto">
        <hgroup className="portadaTitulo">
          <h1 className="logoLetras">
            <span>Investigación y Difusión del Folklore de Panamá - Folk in Love</span>
          </h1>
          <h3>La Nueva Manera de Ver el Folklore</h3>
        </hgroup>
    </articulo> 
  </section>
  )
}
