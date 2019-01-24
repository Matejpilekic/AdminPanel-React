import React, { Component } from 'react'
import axios from 'axios';
import ApiUrl from '../ApiUrl';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      isLoggedIn: false,
      email: '',
      password: '',
      user: {
        id: '',
        full_name: '',
        email: '',
        login_token: ''
      }
    }

    // This binding is necessary to make `this` work in the callback
    //this.handleClick = this.handleClick.bind(this);
  }

  onChange=(e)=>{
    //console.log(e.target.name+' '+ e.target.value);
    this.setState({isLoggedIn: false,[e.target.name]: e.target.value});
  }


  login=(e)=>{

    var headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'}
    var data= {email: this.state.email, password: this.state.password};
    if(this.state.email && this.state.password){

      axios
      .post(`${ApiUrl()}/signin`, data,{headers: headers})
      .then(response => {
        //console.log(response);
        return response;
      })
      .then(json => {
        //console.log(json);
        if (json.status === 200) {
          //alert("Login Successful!");
          let userData = {
            id: json.data.id,
            full_name: json.data.full_name,
            email: json.data.email,
            login_token: json.data.login_token
          };
          let appState = {
            isLoggedIn: true,
            email: '',
            password: '',
            user: userData
          };
          // save app state with user date in local storage
          //localStorage["appState"] = JSON.stringify(appState);
          sessionStorage.setItem('userData',JSON.stringify(userData));
          this.setState({
            appState
          });
          this.props.isLoged(true);
        } else alert("Login Failed!");

      })
      .catch(error => {
        alert('Pogreska prilikom logiranja!');
      });

    }
    else{
      alert("Popunite polja");
    }
    e.preventDefault();
  }

  render() {
  
    return (
      <div className='container mycontainer'>
        <form  onSubmit={this.login}>
          <div className='sign_in'>
            <p>Sign in</p>
          </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.onChange} />
                
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange={this.onChange} type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
      </div>
    );
  }
}
export default Login;