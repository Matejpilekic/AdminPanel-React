import React, { Component } from 'react'

export class AddUpdateUsers extends Component {

    state={

    }


    updateUser=(e)=>{
        e.preventDefault();



    }
  render() {
    return (
        <div>
        <form onSubmit={this.updateUser}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Unesi Ime korisnika</label>
                <input type="text" name="name" className="form-control" id="exampleInputEmail1" placeholder="Unesi ime mikrokontrolera" onChange={this.onChange} />

            </div>
            <div className="form-group">
                <label htmlFor="">Unesite email </label>
                <input type="text" name="token" className="form-control" id="exampleInputSignal" placeholder="Unesite token" onChange={this.onChange}/>

            </div>
            <div className="form-group">
                <label htmlFor="">Unesi domenu mikrokontrolera</label>
                <input type="text" name="domain" className="form-control" id="exampleInputSignal" placeholder="Unesite domenu" onChange={this.onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="">Unesi port</label>
                <input type="text" name="port" className="form-control" id="exampleInputSignal" placeholder="Unesite port" onChange={this.onChange}/>
            </div>
                <button type="submit" className="btn btn-primary">Spremi</button>
        </form>
      </div>
    )
  }
}

export default AddUpdateUsers
