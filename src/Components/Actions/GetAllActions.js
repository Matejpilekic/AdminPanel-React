import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ApiUrl from '../../ApiUrl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

export class GetAllActions extends Component {
    state={
        actions: [],
        microcontrollers: [],
        modal: false,
        visible: false,
            alert_message: {
                message: '',
                color: ''
        }
    }

    toggle=()=> {
        this.setState({
          modal: !this.state.modal
        });
    }

    componentDidMount(){

        var usersession= JSON.parse(sessionStorage.getItem('userData'));
        var token = usersession.login_token;

        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        axios.get(`${ApiUrl()}/actions/`,{headers : headers})
        .then(function (response) {
            return response;
        }).then(json =>{
            if(json.status===200){
                var data=json.data;
                this.setState({actions: data});
            }
        })
        .catch(function (error) {
            if (error.response) { 
                this.setState({ 
                    visible: true,
                    alert_message: {
                        message: 'Dogodila se greška, prilikom dohvaćanja akcija!',
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
    }


    delAction = (id) => {
        var usersession= JSON.parse(sessionStorage.getItem('userData'));
        var token = usersession.login_token;

        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        axios.delete(`${ApiUrl()}/actions/${id}`,{headers: headers})
          .then(res => this.setState({ actions: [...this.state.actions.filter(action => action.id !== id)],
                                        modal: !this.state.modal,
                                        visible: true,
                                        alert_message: {
                                            message: 'Uspiješno ste obrisali akciju!',
                                            color: 'success'
                                        }
        }))
          .catch(function (error) {
            if (error.response) { 
                this.setState({ 
                    visible: true,
                    alert_message: {
                        message: 'Dogodila se greška, nemožete obrisati tu akciju!',
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
    }
    onDismiss=()=> {
        this.setState({ visible: false });
    }


  render() {

    const listItems = this.state.actions.map((data) =>
    <tr key={data.id}>
            <th scope="row" ></th>
            <td>{data.pin}</td>
            <td>{data.type}</td>
            <td>{data.name}</td>
            <td>{this.state.microcontrollers.map((datacontroller) =>
                    {if(datacontroller.id===data.controller_id) 
                        return datacontroller.name}
              )}</td>
            <td>
                <Button color="danger" onClick={this.toggle}>Obriši</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Obiši</ModalHeader>
                <ModalBody>
                    Jeste li sigurni da želite obrisati akciju {data.name}?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.delAction.bind(this, data.id)}>Da obriši</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Prekini</Button>
                </ModalFooter>
                </Modal>
            </td>  
            <td><button className='btn btn-secondary colortextbtn'><Link
                to={{
                    pathname: "/updateAction",
                    action: { data }
                }}
                >Azuriraj</Link></button>
            </td>  
    </tr>); 

    return (
        <div>
            <Alert color={this.state.alert_message.color} isOpen={this.state.visible} toggle={this.onDismiss} fade={true}>
                {this.state.alert_message.message}
            </Alert>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Pin</th>
                <th scope="col">Vrsta</th>
                <th scope="col">Ime</th>
                <th scope="col">Mikrokontroler</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
            </table>
        </div>
    )
  }
}

export default GetAllActions
