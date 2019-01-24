import React, { Component } from 'react';

export class Header extends Component {

  logout=(e)=>{

    sessionStorage.setItem('userData','');
    sessionStorage.clear();
    this.props.isLoged(false);
  }

  render() {

    return (
        <header className="header-desktop">
        <div className='user-info'>
          <button onClick={this.logout} className='btn btn-secondary' >Odjava</button>
        </div>

        </header>
    )
  }
}

export default Header
