import yo from 'yo-yo'

module.exports = yo`
  <section class="contacto">
    <article class="contactoInfo">
      <div>
        <h2>Contáctenos:</h2>
        <h4>Email:</h4>
        <p>info@folkinlove.com</p>
        <h4>teléfono:</h4>
        <p>263-1173</p>
        <form action="/contacto/send" method="post">
          <input type="text" name="nombre" placeholder="Nombre">
          <input type="text" name="email" placeholder="Email">
          <input type="text" name="asunto" placeholder="Asunto">
          <textarea name="mensaje" rows="10" cols="30" placeholder="Envianos Tu Mensaje"></textarea>
          <input type="submit" name="submit" value="Enviar" class="btn">
        </form>
      </div>
    </article>
  </section>
`
