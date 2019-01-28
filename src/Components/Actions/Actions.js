import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ApiUrl from '../../ApiUrl';

export class Actions extends Component {
    state={
        id: false,
        pin: '',
        type: '',
        name: '',
        controller_id: '',
        microcontrollers: []
    }


    onChange=(e)=>{
        //console.log(e.target.name+' '+ e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    addAction=(e)=>{
        var usersession= JSON.parse(sessionStorage.getItem('userData'));
        var token = usersession.login_token;

        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        var data= {pin: parseInt(this.state.pin), type: parseInt(this.state.type), name: this.state.name, controller_id: parseInt(this.state.controller_id)};
        //console.log(data);
          if(isNaN(data.pin)|| isNaN(data.type) || data.name==='' ||  isNaN(data.controller_id) ){
            alert("Popunite polja");
          }
          else if(data.pin < 2 || data.pin > 13){
            alert("Unesite ispravan pin");
          }
          else{
            axios
            .post(`${ApiUrl()}/actions/`, data,{headers: headers})
            .then(response => {
              //console.log(response);
              //return response;
              if(response.status===200 || response.statusText==='OK'){
                  alert ("Uspijesno ste dodali akciju s id-om"+response.data.id+" imenom "+response.data.name+" vrstom "+response.data.type+" i pinom "+response.data.pin+" ");
              }
              if(response.status===400){
                alert('Zauzet pin na mikrokontroleru!');
              }
            })
            .catch(error => {
                alert('Pogreska prilikom kreiranja akcije!');
            });
          }
          e.preventDefault();
    }

    updateAction=(e)=>{
        var data={
            pin: parseInt(this.state.pin),
            type: parseInt(this.state.type),
            name: this.state.name,
            controller_id: parseInt(this.state.controller_id)
        }
        var usersession= JSON.parse(sessionStorage.getItem('userData'));
        var token = usersession.login_token;

        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        var id=this.props.location.action.data.id;
        if(isNaN(data.pin) || isNaN(data.type) || data.name ==='' || isNaN(data.controller_id)){
            alert('Unesite sva polja');
        }
        else{
            axios.put(`${ApiUrl()}/actions/${id}`,data ,{headers: headers})
            .then(response => {
                //console.log(response);
                alert(`Uspijesno ste azurirali akciju s nazivom  ${data.name}`);
            })
            .catch(error => {
                console.log(error);
            });
        }
        e.preventDefault();
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

        if(typeof this.props.location.action !== 'undefined'){
            console.log(this.props.location.action);
            this.setState({
                id: true,
                pin: this.props.location.action.data.pin,
                type: this.props.location.action.data.type,
                name: this.props.location.action.data.name,
                controller_id: this.props.location.action.data.controller_id});
        }
    }



  render() {
    const listControllers = this.state.microcontrollers.map((data) =>
    <option key={data.id} value={data.id}>{data.name}</option>);

    if(this.state.id){
        return(
            <div>
        <form onSubmit={this.updateAction}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Unesi pin kontrolera</label>
                <input type="number" name="pin" value={this.state.pin} className="form-control" id="exampleInputEmail1" placeholder="Unesi pin kontrolera" onChange={this.onChange} />

            </div>
            <div className="form-group">
                <label htmlFor="">Unesite vrstu </label>
                <input type="number" name="type" value={this.state.type} className="form-control" id="exampleInputSignal" placeholder="Unesite vrstu" onChange={this.onChange}/>

            </div>
            <div className="form-group">
                <label htmlFor="">Unesi naziv akcije</label> 
                <input type="text" name="name" value={this.state.name} className="form-control" id="exampleInputSignal" placeholder="Unesite naziv akcije" onChange={this.onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">Unesite kontroler</label>
                <select className="form-control" value={this.state.controller_id} name='controller_id' id="exampleFormControlSelect2" onChange={this.onChange}>
                    <option value={null} ></option>
                    {listControllers}
                </select>
            </div>
                <button type="submit" className="btn btn-secondary">Spremi</button>
        </form>
        <button className="btn btn-secondary colortextbtn mybtn"><Link to='/actions'>Odustani</Link></button>
      </div>
        );
    }
    else{
        return (
            <div>
            <form onSubmit={this.addAction}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Unesi pin kontrolera</label>
                    <input type="number" name="pin" value={this.state.pin} className="form-control" id="exampleInputEmail1" placeholder="Unesi pin kontrolera" onChange={this.onChange} />

                </div>
                <div className="form-group">
                    <label htmlFor="">Unesite vrstu </label>
                    <input type="number" name="type" value={this.state.type} className="form-control" id="exampleInputSignal" placeholder="Unesite vrstu" onChange={this.onChange}/>

                </div>
                <div className="form-group">
                    <label htmlFor="">Unesi naziv akcije</label> 
                    <input type="text" name="name" value={this.state.name} className="form-control" id="exampleInputSignal" placeholder="Unesite naziv akcije" onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect2">Unesite kontroler</label>
                    <select className="form-control" value={this.state.controller_id} name='controller_id' id="exampleFormControlSelect2" onChange={this.onChange}>
                        <option value={null} ></option>
                        {listControllers}
                    </select>
                </div>
                    <button type="submit" className="btn btn-primary">Spremi</button>
            </form>
        </div>
        );
    }    
  }
}

export default Actions
