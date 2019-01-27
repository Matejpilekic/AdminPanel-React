import React, { Component } from 'react';
import axios from 'axios';
import ApiUrl from '../../ApiUrl';

export class AddMicrocontroller extends Component {
  constructor(props){
    super(props);
    this.state={
      name: '',
      token: '',
      domain: '',
      port: null
    }
  }

  onChange=(e)=>{
    //console.log(e.target.name+' '+ e.target.value);
    this.setState({[e.target.name]: e.target.value});
  }

  addMicrocontroller =(e)=>{

    var data={name: this.state.name, token: this.state.token, domain: this.state.domain, port: parseInt(this.state.port),number_of_pins: 13};
      //console.log(data);

    if(data.name === '' || data.token === '' || data.domain ==='' || isNaN(data.port)){
      alert('Unesite sva polja');
    }
    else{

      var usersession= JSON.parse(sessionStorage.getItem('userData'));
      var token = usersession.login_token;

      var headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      axios.post(`${ApiUrl()}/controllers/`, data,{headers: headers})
      .then( response=> {
        //console.log(response);
        if(response.status===200 || response.statusText==='OK'){
          alert("Dodali ste ste novi mikrokontroler");
        }
      })
      .catch(error => {
        console.log(error);
      });
    }

    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addMicrocontroller}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Unesi ime mikrokontrolera</label>
                <input type="text" name="name" className="form-control" id="exampleInputEmail1" placeholder="Unesi ime mikrokontrolera" onChange={this.onChange} />

            </div>
            <div className="form-group">
                <label htmlFor="">Unesite token</label>
                <input type="text" name="token" className="form-control" id="exampleInputSignal" placeholder="Unesite token" onChange={this.onChange}/>

            </div>
            <div className="form-group">
                <label htmlFor="">Unesi domenu mikrokontrolera</label>
                <input type="text" name="domain" className="form-control" id="exampleInputSignal" placeholder="Unesite domenu" onChange={this.onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="">Unesi port</label>
                <input type="number" name="port" className="form-control" id="exampleInputSignal" placeholder="Unesite port" onChange={this.onChange}/>
            </div>
                <button type="submit" className="btn btn-secondary">Spremi</button>
        </form>
      </div>
    )
  }
}

export default AddMicrocontroller
