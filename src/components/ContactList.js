import React from "react";
import CardContact from "./ContactCard";
import {Link} from "react-router-dom"
import './App.css'

const ContactList = (props) => {
  console.log(props);

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

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
    <div className="ui celled list">{renderContactList}</div>
  </div>
  );
};

export default ContactList;
