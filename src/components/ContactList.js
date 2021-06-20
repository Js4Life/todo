import React,{useRef} from "react";
import CardContact from "./ContactCard";
import {Link} from "react-router-dom"
import './App.css'

const ContactList = (props) => {

  console.log(props);
  const inputEl = useRef("");

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const getSearchTerm = () =>{
    //  console.log(inputEl.current.value)
      props.searchKeyword(inputEl.current.value)
  }

  // const contacts = [{
  //   id : "1",
  //   name:"abcd",
  //   email: "xyz@gmail.com"
  // }]

  const renderContactList = props.contacts.map((contact) => {
    return (
      <CardContact
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      ></CardContact>
    );
  });

  return (<div className="main">
    <h2>Contact List</h2>
    <Link to="/add">
    <button className="ui button blue right" style={{marginTop:'10px'}}>Add tasks?</button>
    </Link>

    <div className="ui search" style={{marginTop:"10px"}}>
      <div className="ui icon input">
        <input type="text" ref={inputEl} placeholder="Search Tasks...." className="prompt" value={props.term} onChange={getSearchTerm} />
        <i className="search icon"></i>
      </div>
    </div>

    <div className="ui celled list">{renderContactList.length > 0 ? renderContactList : "No Tasks Available"}</div>

  </div>
  );
};

export default ContactList;
