import React, { Component } from 'react';
import axios from 'axios';
import ApiUrl from '../../ApiUrl';

export class Users extends Component {
    constructor(props){
        super(props);
        this.state={
            users: []
        }
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
          .then(res => this.setState({ users: [...this.state.users.filter(user => user.id !== id)] }));
    }
    
  render() {
    
    const listItems = this.state.users.map((data) =>
    <tr key={data.id}>
            <th scope="row" >{data.id}</th>
            <td>{data.full_name}</td>
            <td>{data.email}</td>
            <td>{data.uuid}</td>
            <td><button className="btn btn-secondary" onClick={this.delUser.bind(this, data.id)}>Obrisi</button></td>
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
