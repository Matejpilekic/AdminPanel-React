import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ApiUrl from '../../ApiUrl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export class Microcontrrollers extends Component {
    state={
        microcontrollers: [],
        microcontroller: {},
        modal: false
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
                //console.log(data);
                //numbers.map((number) => );
                this.setState({microcontrollers: data});
                //console.log(this.state);
            }
        })
        .catch(function (error) {
            console.log(error);
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
                                        modal: !this.state.modal
        }));
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
