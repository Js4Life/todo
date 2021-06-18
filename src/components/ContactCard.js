import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";

const CardContact = (props) => {
  console.log("mapped props", props);

  const { id, name, email } = props.contact;

  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />

      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header"> {name}</div>
          <div>{email}</div>/
        </Link>
      </div>

      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "10px", float: "right" }}
        onClick={() => props.clickHandler(id)}
      ></i>
    </div>
  );
};

export default CardContact;