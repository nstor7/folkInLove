import yo from 'yo-yo'

module.exports = yo`
  <section class="portada">
    <picture class="banner">
      <source media="(min-width: 801px)" srcset="images/trajesTipicosPanamaBannerFull-2x.jpg 2x, images/trajesTipicosPanamaBannerFull-1x.jpg 1x">
      <source media="(min-width: 541px)" srcset="images/trajesTipicosPanamaBannerTab-2x.jpg 2x, images/trajesTipicosPanamaBannerTab-1x.jpg 1x">
      <source media="(min-width: 10px)" srcset="images/trajesTipicosPanamaBannerCel-2x.jpg 2x, images/trajesTipicosPanamaBannerCel-1x.jpg 1x">
      <img alt="trajes tipicos de panama, pollera de lujo, pollera congo y montuna ocueña" class="completa" src="images/trajesTipicosPanamaBannerCel-1x.jpg">
    </picture>
    <articulo class="negroTrans completa texto">
        <hgroup class="portadaTitulo">
          <h1 class="logoLetras">
            <span>Investigación y Difusión del Folklore de Panamá - Folk in Love</span>
          </h1>
          <h3>La Nueva Manera de Ver el Folklore</h3>
        </hgroup>
    </articulo> 
  </section>
`
