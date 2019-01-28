import React, { Component } from 'react';
import axios from 'axios';
import {uid} from 'react-uid';
import ApiUrl from '../../ApiUrl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class UserAndControllersList extends Component {

    constructor(props){
        super(props);
        this.state={
            usersAndControllers: [],
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
        axios.get(`${ApiUrl()}/users-microcontrollers`,{headers : headers})
        .then(function (response) {
            return response;
        }).then(json =>{
            if(json.status===200){
                var data=json.data;
                //console.log(data);
                //numbers.map((number) => );
                this.setState({usersAndControllers: data});
                //console.log(this.state);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    unBind = (idu,idc) => {
        var usersession= JSON.parse(sessionStorage.getItem('userData'));
        var token = usersession.login_token;

        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        axios.post(`${ApiUrl()}/controllers/unbind`,{user_id: idu, controller_id: idc},{headers: headers})
          .then(res => this.setState({ usersAndControllers: [...this.state.usersAndControllers.filter(userAM => userAM.user.id !== idu || userAM.micro_controller.id !== idc )],
                                        modal: !this.state.modal
        }))
          .catch(function (error) {
            //console.log(error);
            alert('Dogodila se greška');
        });
    }


  render() {

    const listItems = this.state.usersAndControllers.map((data) =>
    <tr key={uid(data)}  className="colorTd">
            <th scope="row" >{data.user.id}</th>
            <td>{data.user.full_name}</td>
            <td>{data.user.email}</td>
            <td>{data.micro_controller.name}</td>
            <td>
                <Button color="danger" onClick={this.toggle}>Odspoji korisnika</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Odspoji korisnika</ModalHeader>
                <ModalBody>
                    Jeste li sigurni da želite odspojiti korisnika {data.user.full_name} s mikrokontrolera {data.micro_controller.name}?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.unBind.bind(this, data.user.id, data.micro_controller.id)}>Da odspoji korisnika</Button>{' '}
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
            <th scope="col">E-mail</th>
            <th scope="col">Mikrokontroler</th>
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

export default UserAndControllersList
