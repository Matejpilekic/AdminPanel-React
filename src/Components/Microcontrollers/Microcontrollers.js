import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ApiUrl from '../../ApiUrl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';


export class Microcontrrollers extends Component {
    state={
        microcontrollers: [],
        microcontroller: {},
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
                        message: 'Dogodila se greška prilikom dohvaćanja svih mikrokontrolera!',
                        color: 'danger'
                    }
                });
            } 
            else {
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

    delMicrocontroller = (id) => {
        var usersession= JSON.parse(sessionStorage.getItem('userData'));
        var token = usersession.login_token;

        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        axios.delete(`${ApiUrl()}/controllers/${id}`,{headers: headers})
          .then(res => this.setState({ microcontrollers: [...this.state.microcontrollers.filter(microcontroller => microcontroller.id !== id)], 
                                        modal: !this.state.modal,
                                        visible: true,
                                        alert_message: {
                                            message: 'Uspiješno ste obrisali mikrokontroler!',
                                            color: 'success'
                                        }
        })).catch(function (error) {
            if (error.response) { 
                this.setState({ 
                    visible: true,
                    alert_message: {
                        message: 'Dogodila se greška prilikom brisanja mikrokontrolera!',
                        color: 'danger'
                    }
                });
            } 
            else {
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


    const listItems = this.state.microcontrollers.map((data) =>
    <tr key={data.id}>
            <th scope="row" ></th>
            <td>{data.name}</td>
            <td>{data.token}</td>
            <td>{data.domain}</td>
            <td>{data.port}</td>
            <td>
                <Button color="danger" onClick={this.toggle}>Obriši</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Obiši</ModalHeader>
                <ModalBody>
                    Jeste li sigurni da želite obrisati mikrokontroler {data.name}?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.delMicrocontroller.bind(this, data.id)}>Da obriši</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Prekini</Button>
                </ModalFooter>
                </Modal>
            </td>
            <td><button className='btn btn-secondary colortextbtn'><Link
                to={{
                    pathname: "/updatecontroller",
                    microcontroller: { data }
                }}
                >Ažuriraj</Link></button>
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
                <th scope="col">Ime</th>
                <th scope="col">Token</th>
                <th scope="col">Domena</th>
                <th scope="col">Port</th>
                <th></th>
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

export default Microcontrrollers
