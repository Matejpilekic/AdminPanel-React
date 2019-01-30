import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class Menu extends Component {

    state = {
        dropdownOpenAction: false,
        dropdownOpenMicrocontrollers: false,
        isOpen: false
      };

    toggleAction=()=> {
        this.setState(prevState => ({
            dropdownOpenAction: !prevState.dropdownOpenAction
        }));
    }
    toggleMicrocontroller=()=> {
        this.setState(prevState => ({
            dropdownOpenMicrocontrollers: !prevState.dropdownOpenMicrocontrollers
        }));
    }
    mobileSidebar=()=>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

  render() {
    return (
        <aside className="menu-sidebar" style={{height: this.state.isOpen ? '75px' : 'auto'}}>
            <div className="logo">
                <button className="mobile_button" onClick={this.mobileSidebar}>☰</button>
                <p href="#">
                    Admin Panel
                </p>
            </div>
            <div className="menu-sidebar__content js-scrollbar1" style={{display: this.state.isOpen ? 'none' : 'block'}}> 
                <nav className="navbar-sidebar">

                    <Dropdown isOpen={this.state.dropdownOpenMicrocontrollers} toggle={this.toggleMicrocontroller}>
                        <DropdownToggle caret>
                            Mikrokontroleri
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem divider />
                            <DropdownItem><Link to='/addservice'>Dodaj mikrokontroler</Link></DropdownItem>
                            <DropdownItem><Link to='/controllers'>Mikrokontroleri</Link></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                   
                    <Dropdown isOpen={this.state.dropdownOpenAction} toggle={this.toggleAction}>
                        <DropdownToggle caret>
                            Akcije na mikrokontrolerima
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem divider />
                            <DropdownItem><Link to='/addAction'>Dodaj akciju</Link></DropdownItem>
                            <DropdownItem><Link to='/actions'>Akcije</Link></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <button className="btn btn-secondary colortextbtn"><Link to='/BindUserAndMicrocontroler'>
                        Spoji korisnika s mikrokontrolerom</Link></button>

                    <button className="btn btn-secondary colortextbtn"><Link to='/usersAndMicrocontrllers'>
                        Spojeni servisi</Link></button>
         
                    <button className="btn btn-secondary colortextbtn"><Link to='/users'>
                        Korisnici</Link></button>
                </nav>
            </div>
        </aside>
    )
  }
}

export default Menu
