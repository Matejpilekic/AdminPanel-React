import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ApiUrl from '../../ApiUrl';
import { Alert } from 'reactstrap';

export class UpdateMicrocontroller extends Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            token: '',
            domain: '',
            port: '',
            visible: false,
            alert_message: {
                message: '',
                color: ''
            }
        }
      }
    
      onChange=(e)=>{
        //console.log(e.target.name+' '+ e.target.value);
        this.setState({[e.target.name]: e.target.value});
      }
    
      updateMicrocontroller=(e)=>{
        var data={
            name: this.state.name,
            token: this.state.token,
            domain: this.state.domain,
            port: parseInt(this.state.port),
            number_of_pins: 13
        }
        var usersession= JSON.parse(sessionStorage.getItem('userData'));
        var token = usersession.login_token;

        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        var id=this.props.location.microcontroller.data.id;
        if(data.name === '' || data.token === '' || data.domain ==='' || isNaN(data.port)){
            this.setState({ 
                visible: true,
                alert_message: {
                    message: 'Popunite polja!',
                    color: 'danger'
                }
            });
        }
        else if(data.name.length <3 || data.token.length < 5 || data.domain < 5){
            this.setState({ 
              visible: true,
              alert_message: {
                  message: 'Ime mora sadrzavati najmanje 5 znakova, token najmanje 5 znakova, domena najmanje 5 znakova!',
                  color: 'danger'
              }
            });
        }
        else{
            axios.put(`${ApiUrl()}/controllers/${id}`,data ,{headers: headers})
            .then(response => {
                //console.log(response);
                if(response.status === 200){
                    this.setState({ 
                        visible: true,
                        alert_message: {
                            message: "Uspiješno ste azurirali novi mikrokontroler",
                            success: 'success'
                        }
                    });
                }
            })
            .catch(error => {
                if(error.response.status ===400){
                    this.setState({ 
                        visible: true,
                        alert_message: {
                            message: `Pogreska! ${error.response.data.message}`,
                            color: 'danger'
                        }
                    });
                }
                //console.log(error.response);
            });
        }
        e.preventDefault();
    }
    componentDidMount(){


        if(typeof this.props.location.microcontroller !== 'undefined'){
            this.setState({
                name: this.props.location.microcontroller.data.name,
                token: this.props.location.microcontroller.data.token,
                domain: this.props.location.microcontroller.data.domain,
                port: this.props.location.microcontroller.data.port});
        }
    }

    onDismiss=()=> {
        this.setState({ visible: false });
    }
    
      render() {
        return (
          <div>
            <Alert color={this.state.alert_message.color} isOpen={this.state.visible} toggle={this.onDismiss} fade={true}>
                {this.state.alert_message.message}
            </Alert>
            <form onSubmit={this.updateMicrocontroller}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Unesi ime mikrokontrolera</label>
                    <input type="text" name="name" value={this.state.name} className="form-control" id="exampleInputEmail1" placeholder="Unesi ime mikrokontrolera" onChange={this.onChange} />
    
                </div>
                <div className="form-group">
                    <label htmlFor="">Unesite token</label>
                    <input type="text" name="token" value={this.state.token} className="form-control" id="exampleInputSignal" placeholder="Unesite token" onChange={this.onChange}/>
    
                </div>
                <div className="form-group">
                    <label htmlFor="">Unesi domenu mikrokontrolera</label>
                    <input type="text" name="domain" value={this.state.domain} className="form-control" id="exampleInputSignal" placeholder="Unesite domenu" onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Unesi port</label>
                    <input type="number" name="port" value={this.state.port} className="form-control" id="exampleInputSignal" placeholder="Unesite port" onChange={this.onChange}/>
                </div>
                    <button type="submit" className="btn btn-secondary">Spremi</button>
            </form>
            <button className="btn btn-secondary colortextbtn mybtn"><Link to='/controllers'>Nazad</Link></button>
          </div>
        )
      }
    }

export default UpdateMicrocontroller
