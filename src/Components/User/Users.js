import React, { Component } from 'react';
import axios from 'axios';
import ApiUrl from '../../ApiUrl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

export class Users extends Component {
    constructor(props){
        super(props);
        this.state={
            users: [],
            modal: false,
            visible: false,
            row: null,
            alert_message: {
                message: '',
                color: ''
            }
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
        axios.get(`${ApiUrl()}/users/`,{headers : headers})
        .then(json =>{
            if(json.status===200){
                var data=json.data;
                this.setState({users: data});
            }
        })
        .catch((error)=> {
            if (error.response) { 
                this.setState({ 
                visible: true,
                alert_message: {
                    message: 'Dogodila se greška prilikom dohvaćanja korisnika!',
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

    delUser = (id) => {
        var usersession= JSON.parse(sessionStorage.getItem('userData'));
        var token = usersession.login_token;

        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        axios.delete(`http://104.248.21.187:8080/admin/users/${id}`,{headers: headers})
          .then(res => this.setState({ users: [...this.state.users.filter(user => user.id !== id)],
                                        modal: !this.state.modal,
                                        visible: true,
                                        alert_message: {
                                            message: 'Uspiješno ste obrisali korisnika!',
                                            color: 'success'
                                        }
        })).catch((error)=> {
            if (error.response) { 
                this.setState({ 
                    visible: true,
                    alert_message: {
                        message: `Pogreska! ${error.response.data.message}`,
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
            this.setState({ 
                visible: true,
                alert_message: {
                    message: 'Dogodila se greška prilikom brisanja korisnika!',
                    color: 'danger'
                }
            });
        });
    }
    onDismiss=()=> {
        this.setState({ visible: false });
    }

    setRow = (data, event) =>{
        this.setState({ modal: !this.state.modal,
            row: data });
    }
    
  render() {
    
    const listItems = this.state.users.map((data) =>
    <tr key={data.id}>
            <th scope="row" >{data.id}</th>
            <td>{data.full_name}</td>
            <td>{data.email}</td>
            <td>{data.uuid}</td>
            <td>
                <Button color="danger" onClick={this.setRow.bind(null,data)}>Obriši</Button>
            </td> 
    </tr>);

    return (
      <div>
        <Alert color={this.state.alert_message.color} isOpen={this.state.visible} toggle={this.onDismiss} fade={true}>
            {this.state.alert_message.message}
        </Alert>
        <div className="table-responsive-lg">
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">email</th>
                <th scope="col">uuid</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
            </table>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Obriši</ModalHeader>
                <ModalBody>
                    Jeste li sigurni da želite obrisati akciju {this.state.row ===null ? '' : this.state.row.full_name}?
                </ModalBody>
                <ModalFooter>    
                    <Button color="primary" value={this.state.row ===null ? '' : this.state.row.id} onClick={this.delUser.bind(this, this.state.row ===null ? '' : this.state.row.id)}>Da obriši</Button>
                    <Button color="secondary" onClick={this.toggle}>Prekini</Button>
                </ModalFooter>
            </Modal>
        </div>
    </div>
    )
  }
}

export default Users
