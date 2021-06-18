import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";

const ContactDetail = (props) => {

  const {name,email} = props.location.state.contact;

  console.log('contact detials',props)
  return (
    <div className="main" style={{marginTop:'90px'}}>
      <div className="ui card centered" >
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
        <button className="ui button blue center">Back to Task list</button>
        </Link>

      </div>
    </div>
  );
};

export default ContactDetail;
