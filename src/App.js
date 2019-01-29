import React, { Component } from 'react';

import './App.css';
import Login from './Components/Login';
import Menu from './Components/Menu';
import Header from './Components/Header';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
import AddMicrocontroller from './Components/Microcontrollers/AddMicrocontroller';
import Users from './Components/User/Users';
import Actions from './Components/Actions/Actions';
import GetAllActions from './Components/Actions/GetAllActions';
import BindUserAndMicrocontroler from './Components/UserAndControllers.js/BindUserAndMicrocontroler';
import Microcontrrollers from './Components/Microcontrollers/Microcontrollers';
import UpdateMicrocontroller from './Components/Microcontrollers/UpdateMicrocontroller';
import Home from './Components/Home';
import UserAndControllersList from './Components/UserAndControllers.js/UserAndControllersList';
import UpdateAction from './Components/Actions/UpdateAction';

class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      isLoged : false,
      user : {}
    }
  }

  isLoged=(isLoged)=>{
    this.setState({isLoged: isLoged})
  }

  componentDidMount() {
    let state = sessionStorage.getItem('userData');
    if (state) {
      let AppState = JSON.parse(state);
      //console.log(AppState);
      this.setState({ isLoged: true, user: AppState });
    }
  }

  render() {
    if(!this.state.isLoged){
        
      return (
        <Login isLoged={this.isLoged} />
      );
    }
    else{
      return (
        <div>
          <BrowserRouter >
              <div>
                <Menu />
                <div className="page-container">
                <div className="main-content">
                    <div className="container my_container">
                      <Header isLoged={this.isLoged} />
                      <Switch>
                          <Route exact path='/' component={Home} />
                          <Route path='/addservice' component={AddMicrocontroller} />
                          <Route path='/users' component={Users} />
                          <Route path='/addAction' component={Actions} />
                          <Route path='/actions' component={GetAllActions} />
                          <Route path='/BindUserAndMicrocontroler' component={BindUserAndMicrocontroler} />
                          <Route path='/usersAndMicrocontrllers' component={UserAndControllersList} />
                          <Route path='/controllers' component={Microcontrrollers} />
                          <Route path='/updatecontroller' component={UpdateMicrocontroller} />
                          <Route path='/updateAction' component={UpdateAction} />   
                      </Switch>

                      </div>
                    </div>
                
                </div>
              </div>
          </BrowserRouter>
      </div>
        
      );
    }
  }
}

export default App;
