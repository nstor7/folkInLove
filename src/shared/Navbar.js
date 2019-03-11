import React from 'react'

export default class NavBAr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

   handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <header id= "headerContainer">
       <a href="/" className="logoContainer">
         <img src="images/folkInLove-logo.png" alt="logo de Folk in Love Pty" className='logo'/>
         <img src="images/folkInLove-letras-negro.png" alt="Tipo de Folk in Love Pty" className='tipo'/>
       </a>
       <nav id="nav" className={this.state.isToggleOn ? 'nav hidden' : 'nav'}>
         <a href="/" onClick={this.handleClick}>Inicio</a>
         <a href="/danzas" onClick={this.handleClick}>Danzas</a>
         <a href="/vestuarios" onClick={this.handleClick}>Vestuarios</a>
         <a href="/tienda" onClick={this.handleClick}>Productos y Servicios</a>
         <a href="/contacto" onClick={this.handleClick}>Contacto</a>
       </nav>
       <a href="#" className="navButton" onClick={this.handleClick}>
         <i className="fa fa-bars" aria-hidden="true"></i>
       </a>
      </header>
    );
  }
}
   