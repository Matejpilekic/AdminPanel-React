import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ApiUrl from '../../ApiUrl';


export class Microcontrrollers extends Component {
    state={
        microcontrollers: [],
        microcontroller: {}
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
          .then(res => this.setState({ microcontrollers: [...this.state.microcontrollers.filter(microcontroller => microcontroller.id !== id)] }));
    }


  render() {


    const listItems = this.state.microcontrollers.map((data) =>
    <tr key={data.id}>
            <th scope="row" ></th>
            <td>{data.name}</td>
            <td>{data.token}</td>
            <td>{data.domain}</td>
            <td>{data.port}</td>
            <td><button className="btn btn-secondary" onClick={this.delMicrocontroller.bind(this, data.id)}>Obrisi</button></td>
            <td><button className='btn btn-secondary colortextbtn'><Link
                to={{
                    pathname: "/updatecontroller",
                    microcontroller: { data }
                }}
                >Azuriraj</Link></button>
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
