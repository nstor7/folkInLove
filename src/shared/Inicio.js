import React from 'react'
import picture from './picture'

export default function Inicio(){
  return(
    <div className="contenedor">
      <div className="completa banner relativa negroTrans">
      {picture('folkInicioBanner', 'Pollera de Coquitos, Folk in Love', 'completa background')}
      
      <div className="centerText whiteText">
        <h1>Folk in Love</h1>
        <h3>La Nueva Manera de Ver el Folklore</h3>
      </div>
      </div>
      
      <div className="mitad blanco texto">
        <h2>¿Qué es Folk in love?</h2>
         <h3>Conoce más de las costumbres y tradiciones de Panamá</h3>
         <p> <b>Folk in Love</b>, es un proyecto que busca aportar a todos los panameños e interesados en el tema, conocimientos de nuestros bailes y trajes típicos.</p>
         <p>Tenemos la visión de crear contenido para medios digitales con el fin de hacer más accesible la información sobre Folklore.</p>
         <p>Hay muchos investigadores y estudiosos  trabajando y publicando libros, pero en la parte digital todavía las fuentes no son confiables.</p>
         <p>En <b>Folk in Love</b> buscamos ser, ese referente digital a quien puedes recurrir ante alguna consulta o necesidad.</p>
      </div>
      {picture('cinthiaBlogueando', 'Difusión del folklore de Panamá', 'mitad')}
      <a href="/vestuarios/Gala-Ocuena" className="tercio relativa imagen banner ontabebe">
      {picture('polleraCoquitosIdentidad', 'Pollera de Coquitos', 'tercio background')}
        <div className="centerText whiteText ">
            <h5>Pollera de Coquitos</h5>
            <h6>Azuero</h6>
        </div>
      </a>
      <a href="/vestuarios/Pollera-Congo" className="tercio relativa imagen banner ontabebe">
        {picture('polleraCongoIdentidad', 'Pollera Congo', 'tercio background')}
        <div className="centerText whiteText ">
            <h5>Pollera Congo</h5>
            <h6>Colón</h6>
        </div>
      </a>
      <a href="/vestuarios/Pollera-De-Lujo" className="tercio relativa imagen banner ontabebe">
        {picture('polleraGalaIdentidad', 'Pollera de Gala Santeña', 'tercio background')}
        <div className="centerText whiteText ">
            <h5>Pollera de Lujo</h5>
            <h6>Azuero</h6>
        </div>
      </a>
      <article className="completa blanco texto">

        <h2>El Folklore y El Mundo Digital</h2>
        <h3>Acercando La Información A Los Panameños del Siglo 21</h3>
        <p>Estamos seguros que el <b>folklore</b> es un tema importante para los Panameños. Al momento de vestirse y lucir cualquiera de los trajes típicos existe la necesidad de una guía.</p>
        <p>Hoy en día la búsqueda de la información se hace de manera digital. Por tal razón contamos con una página web, folkinlovepty.com, en donde generamos artículos educativos sobre las diferentes vestimentas folklóricas y las danzas de nuestro país.</p>
        <p>Esperamos así poder ayudar a todo aquel que necesite información folklórica, ya sea para investigaciones escolares o cualquier otro objetivo.</p>
        <p>También contamos con un canal de Youtube, en donde hacemos vídeos educativos y tratamos de inspirar a los panameños a entender y utilizar sus trajes típicos y aprender las danzas panameñas.</p>
        <p>También puedes aprender sobre folklore a través de nuestras páginas de facebook e instagram, @folkinlovepty. Donde también podrás encontrar cualquier noticia, evento o las fotos que tomamos en las sesiones que hacemos con nuestros clientes.</p>
        <p>Por último, tenemos nuestro WhatsApp (69455931) habilitado, no solo para la venta de productos o servicios, sino también para brindar asesoría o ser esa mano amiga a las personas que se quieren empollerar, o necesitan guía para vestir a sus hijos para eventos escolares.</p>

      </article>
        
      {/* <article className="texto mitad rosa">
          <h2>Origen de la Identidad del Panameño</h2>
          <h3>Historia de las Tradiciones de Panamá</h3>
          <p>
            Gracias a su posición estratégica dentro de las américas nuestro país ha desarrollado una riqueza
      cultural y folklórica inigualable. La combinacion entre las etnias indígenas existentes antes de la
      conquista, la intromisión europea y la llegada de los negros como esclavos ha permitido el
      enriquecimiento de la cultura de manera inigualable.
          </p>
          <p>
            De acuerdo con las investigaciones se pudo apreciar como la vestimenta femenina y masculina fue
            aceptada y utilizada por los panameños a inicios del siglo XX, las polleras, chambras y otros vestidos fueron de uso común en toda la república. Actualmente podemos ver como las etnias
            indígenas y los grupos congos mantienen sus tradiciones permitiendo la evolución al tener remplazo
            generacional y danzas vivas.        </p>
      </article>
      <picture className="mitad imagen">
        <source media="(min-width: 800px)" srcSet="/images/apoyo-full.jpg"/>
        <source media="(min-width:600px )" srcSet="/images/apoyo-tab.jpg"/>
        <source media="(min-width:10px )" srcSet="/images/apoyo-cel.jpg"/>
        <img src="/images/apoyo-cel.jpg" alt="Prendas de la pollera"/>
      </picture> */}
    </div>
  )}
