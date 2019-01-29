import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import ApiUrl from '../../ApiUrl';
import { Alert } from 'reactstrap';

export class UpdateAction extends Component {

    state={
        id: false,
        pin: '',
        type: '',
        name: '',
        controller_id: '',
        microcontrollers: [],
        visible: false,
        alert_message: {
            message: '',
            color: ''
        }
    }


    onChange=(e)=>{
        //console.log(e.target.name+' '+ e.target.value);
        this.setState({[e.target.name]: e.target.value});
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
            this.setState({ 
                visible: true,
                alert_message: {
                    message: 'Popunite polja!',
                    color: 'danger'
                }
            });
        }
        else if(data.pin < 2 || data.pin > 13){
            this.setState({ 
                visible: true,
                alert_message: {
                    message: 'Unesite ispravan pin u intervalu od 2 do 13!',
                    color: 'danger'
                }
            });
          }
          else if(data.name.length < 3){
            this.setState({ 
                visible: true,
                alert_message: {
                    message: 'Naziv mora imati vise od 3 znaka!',
                    color: 'danger'
                }
            });
          }
        else{
            axios.put(`${ApiUrl()}/actions/${id}`,data ,{headers: headers})
            .then(response => {
                this.setState({ 
                    visible: true,
                    alert_message: {
                        message: `Uspijesno ste azurirali akciju s nazivom  ${data.name}`,
                        success: 'success'
                    }
                });
            })
            .catch(error => {
                if (error.response) { 
                    if(error.response.status ===400){
                        this.setState({ 
                            visible: true,
                            alert_message: {
                                message: `Pogreska! ${error.response.data.message}`,
                                color: 'danger'
                            }
                        });
                    }else{
                        this.setState({ 
                            visible: true,
                            alert_message: {
                                message: `Pogreska prilikom azuriranja akcije!! ${error.response.data.message}`,
                                color: 'danger'
                            }
                        });
                    }
                  } else {
                    this.setState({ 
                        visible: true,
                        alert_message: {
                          message: `Pogreska !${error.message}`,
                          color: 'danger'
                          }
                    });
                }
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
                this.setState({microcontrollers: data});
            }
        })
        .catch(function (error) {
            if (error.response) { 
                this.setState({ 
                    visible: true,
                    alert_message: {
                        message: 'Dogodila se greška prilikom dohvaćanja mikrokontrolera!',
                        color: 'danger'
                    }
                });
              } else {
                this.setState({ 
                    visible: true,
                    alert_message: {
                      message: `Pogreska !${error.message}`,
                      color: 'danger'
                      }
                });
            }
        });

        if(typeof this.props.location.action !== 'undefined'){
            this.setState({
                id: true,
                pin: this.props.location.action.data.pin,
                type: this.props.location.action.data.type,
                name: this.props.location.action.data.name,
                controller_id: this.props.location.action.data.controller_id});
        }
    }

    onDismiss=()=> {
        this.setState({ visible: false });
    }

  render() {
    const listControllers = this.state.microcontrollers.map((data) =>
    <option key={data.id} value={data.id}>{data.name}</option>);
    return (
        <div>
            <Alert color={this.state.alert_message.color} isOpen={this.state.visible} toggle={this.onDismiss} fade={true}>
                {this.state.alert_message.message}
            </Alert>
            <form onSubmit={this.updateAction}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Unesi pin kontrolera</label>
                    <input type="number" name="pin" value={this.state.pin} className="form-control" id="exampleInputEmail1" placeholder="Unesi pin kontrolera" onChange={this.onChange} />

                </div>
                <div className="form-group">
                    <label htmlFor="">Unesite vrstu </label>
                    <select className="form-control" value={this.state.type} name='type' id="exampleInputSignal" onChange={this.onChange}>
                        <option value={null} ></option>
                        <option value={1}>Drži signal</option>
                        <option value={0}>Ne drži signal</option>
                    </select>
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
            <button className="btn btn-secondary colortextbtn mybtn"><Link to='/actions'>Nazad</Link></button>
        </div>
    )
  }
}

export default UpdateAction
