import yo from 'yo-yo'

var template = yo`
  <section class="contacto completa">
    <article class="contactoInfo rosaTrans">
      <div>
        <h2>Contáctenos:</h2>
        <h4>Email:</h4>
        <p>info@folkinlovepty.com</p>
        <h4>teléfono:</h4>
        <p>6945-5931</p>
        <form action="/contacto/send" method="post">
          <input type="text" name="nombre" placeholder="Nombre">
          <input type="text" name="email" placeholder="Email">
          <input type="text" name="asunto" placeholder="Asunto">
          <textarea name="mensaje" rows="10" cols="30" placeholder="Envianos Tu Mensaje"></textarea>
          <input type="submit" name="submit" value="Enviar" class="btn negro">
        </form>
      </div>
    </article>
  </section>
`
export default template