import React from "react";
import "./App.css";
//class Component

class AddContact extends React.Component {

  state = {
    name : "",
    email:""
  }

  add = (e) =>{
    e.preventDefault();

    if(this.state.name === '' || this.state.email ==='') {
      alert('Omg!, Please fill the fields');
      return
    }
      // child to parent maga!
    this.props.addContactHandler(this.state);
    this.setState({name:"",email:""})
    console.log('add',this.props.history.push('/'))
 
  }

  render() {
    return (
      <div className="ui main">
         <h2 className="header-add" style={{marginTop:"65px"}}>Good Morning Raghu! , Please create a task</h2>

        <form className="ui form" onSubmit={this.add}>

          <div className="field">
            <label>Task</label>
            <input type="text" 
            name="name" 
            placeholder="Task Name"
            value={this.state.name}
             onChange={ (e) => {this.setState({name : e.target.value})} } />
          </div>

          <div className="field">
            <label>Describe it</label>
            <input type="text" name="email" placeholder="Describe it" 
            value={this.state.email}
            onChange={(e)=>{this.setState({email:e.target.value})}}
            />
          </div>

        <button className="ui button blue">Create Task</button>

        </form>
      </div>
    );
  }
}

export default AddContact;
