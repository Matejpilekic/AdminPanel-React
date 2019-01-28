import React, { Component } from 'react';
import axios from 'axios';
import ApiUrl from '../../ApiUrl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Users extends Component {
    constructor(props){
        super(props);
        this.state={
            users: [],
            modal: false
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
                                        modal: !this.state.modal
        }));
    }
    
  render() {
    
    const listItems = this.state.users.map((data) =>
    <tr key={data.id}>
            <th scope="row" >{data.id}</th>
            <td>{data.full_name}</td>
            <td>{data.email}</td>
            <td>{data.uuid}</td>
            <td>
                <Button color="danger" onClick={this.toggle}>Obriši</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Obiši</ModalHeader>
                <ModalBody>
                    Jeste li sigurni da želite obrisati korisnika {data.full_name}?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.delUser.bind(this, data.id)}>Da obriši</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Prekini</Button>
                </ModalFooter>
                </Modal>
            </td> 
    </tr>);

    return (
      <div>
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
      </div>
    )
  }
}

export default Users
