import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class Menu extends Component {

    state = {
        dropdownOpenAction: false,
        dropdownOpenMicrocontrollers: false
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

  render() {
    return (
        <aside className="menu-sidebar" >
            <div className="logo">
                <p href="#">
                    Admin Panel
                </p>
            </div>
            <div className="menu-sidebar__content js-scrollbar1"> 
                <nav className="navbar-sidebar">

                    <Dropdown isOpen={this.state.dropdownOpenMicrocontrollers} toggle={this.toggleMicrocontroller}>
                        <DropdownToggle caret>
                            Mikrokontroleri
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem divider />
                            <DropdownItem><Link to='/addservice'><i className="fas fa-chart-bar"></i>Dodaj mikrokontroler</Link></DropdownItem>
                            <DropdownItem><Link to='/controllers'><i className="fas fa-chart-bar"></i>Mikrokontroleri</Link></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                   
                    <Dropdown isOpen={this.state.dropdownOpenAction} toggle={this.toggleAction}>
                        <DropdownToggle caret>
                            Akcije na mikrokontrolerima
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem divider />
                            <DropdownItem><Link to='/addAction'><i className="fas fa-table"></i>Dodaj akciju</Link></DropdownItem>
                            <DropdownItem><Link to='/actions'><i className="fas fa-chart-bar"></i>Akcije</Link></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <button className="btn btn-secondary colortextbtn"><Link to='/BindUserAndMicrocontroler'>
                        <i className="fas fa-table"></i>Spoji korisnika s mikrokontrolerom</Link></button>

                    <button className="btn btn-secondary colortextbtn"><Link to='/usersAndMicrocontrllers'>
                        <i className="fas fa-table"></i>Spojeni servisi</Link></button>
         
                    <button className="btn btn-secondary colortextbtn"><Link to='/users'>
                        <i className="fas fa-table"></i>Korisnici</Link></button>
                </nav>
            </div>
        </aside>
    )
  }
}

export default Menu
