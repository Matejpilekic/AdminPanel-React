import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ApiUrl from '../../ApiUrl';

export class GetAllActions extends Component {
    state={
        actions: [],
        microcontrollers: []
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
                //console.log(data);
                //numbers.map((number) => );
                this.setState({actions: data});
                //console.log(this.state);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        
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


    delAction = (id) => {
        var usersession= JSON.parse(sessionStorage.getItem('userData'));
        var token = usersession.login_token;

        var headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        axios.delete(`${ApiUrl()}/actions/${id}`,{headers: headers})
          .then(res => this.setState({ actions: [...this.state.actions.filter(action => action.id !== id)] }))
          .catch(function (error) {
            console.log(error);
            alert('Dogodila se greška, nemožete obrisati tu akciju');
        });
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
            <td><button className="btn btn-secondary" onClick={this.delAction.bind(this, data.id)}>Obrisi</button></td>
            <td><button className='btn btn-secondary colortextbtn'><Link
                to={{
                    pathname: "/addAction",
                    action: { data }
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
