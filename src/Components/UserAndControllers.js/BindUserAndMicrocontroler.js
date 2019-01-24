import React, { Component } from 'react';
import axios from 'axios';
import ApiUrl from '../../ApiUrl';

export class BindUserAndMicrocontroler extends Component {

    state={
        user_id : null,
        controller_id: null,
        microcontrollers: [],
        users: []
    }

    onChange=(e)=>{
        //console.log(e.target.name+' '+ e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount(){
        
        var usersession= JSON.parse(sessionStorage.getItem('userData'));
        var token = usersession.login_token;

        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        axios.get(`${ApiUrl()}/controllers/`,{headers : headers})
        .then(function (response) {
            return response;
        }).then(json =>{
            if(json.status===200){
                var data=json.data;
                //console.log(data);
                //numbers.map((number) => );
                this.setState({microcontrollers: data});
                //console.log(this.state);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        axios.get(`${ApiUrl()}/users/`,{headers : headers})
        .then(function (response) {
            return response;
        }).then(json =>{
            if(json.status===200){
                var data=json.data;
                //console.log(data);
                //numbers.map((number) => );
                this.setState({users: data});
                //console.log(this.state);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    bindUsersAndMicrocontroller=(e)=>{
        
        var usersession= JSON.parse(sessionStorage.getItem('userData'));
        var token = usersession.login_token;

        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        var data= {user_id: parseInt(this.state.user_id), controller_id: parseInt(this.state.controller_id)};
        //console.log(data);
          if(isNaN(data.user_id)|| isNaN(data.controller_id)){
            alert("Popunite polja");
          }
          else{
            axios
            .post(`${ApiUrl()}/controllers/bind`, data,{headers: headers})
            .then(response => {
              //console.log(response);
              //return response;
              if(response.status===200 || response.statusText==='OK'){
                  alert ("Uspijesno ste spojili korisnika s kontorlerom");
              }
            })
            .catch(error => {
              alert('Pogreska prilikom spajanja korisnika i mikrokontrolera!');
            });
          }
          e.preventDefault();
    }

  render() {

    const listControllers = this.state.microcontrollers.map((data) =>
    <option key={data.id} value={data.id}>{data.name}</option>);


    const listUser = this.state.users.map((data) =>
    <option key={data.id} value={data.id}>{`Ime i Prezime :${data.full_name}  /   E-mail : ${data.email}`}</option>);

    return (
      <div>
          <form onSubmit={this.bindUsersAndMicrocontroller}>

          <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">Unesite mikrokontroler</label>
                <select className="form-control" name='controller_id' id="exampleFormControlSelect1" onChange={this.onChange}>
                    <option value={null} ></option>
                    {listControllers}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">Unesite korisnika</label>
                <select className="form-control" name='user_id' id="exampleFormControlSelect2" onChange={this.onChange}>
                    <option value={null} ></option>
                    {listUser}
                </select>
            </div>
                <button type="submit" className="btn btn-secondary">Spoji</button>
        </form>
        
      </div>
    )
  }
}

export default BindUserAndMicrocontroler
