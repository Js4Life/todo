import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { uuid } from "uuidv4";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";

import api from "../api/contacts";
import EditContact from "./EditContact";
function App() {
 // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [search, setSearchTerm] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  // const contacts = [
  //   {
  //     id:1,
  //     name:"Raghavendra",
  //     email : "abcdsd@gmail.com"
  //   },
  //   {
  //     id:2,
  //     name:"Rahul",
  //     email : "abcdsd@gmail.com"
  //   },
  //   {
  //     id:3,
  //     name:"Kiran",
  //     email : "abcdsd@gmail.com"
  //   }
  // ]

  // child to parent unlike props

  const addContactHandler = async (contact) => {
    console.log(contact);

    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);

    console.log("...", ...contacts);
    setContacts([...contacts, response.data]);
    //  setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    console.log("updated res", response.data);

    const { id, name, email } = response.data;

    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);

    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const getContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const searchHandler = (searchTrm) => {
    console.log("v", searchTrm);
    setSearchTerm(searchTrm);
    if (searchTrm !== "") {
      const newContactList = contacts.filter((contact) => {
        console.log(
          "newcontact",
          Object.values(contact)
            .join(" ")
            .toLowerCase()
            .includes(searchTrm.toLowerCase())
        );
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTrm.toLowerCase());
        //  return Object.values(contact)
      });
      setsearchResult(newContactList);
    } else {
      setsearchResult(contacts);
    }
  };

  useEffect(() => {
    // const getContactsListPrev = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (getContactsListPrev) setContacts(getContactsListPrev);

    const getAllContacts = async () => {
      const allContacts = await getContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <ContactList
                {...props}
                contacts={search.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                term={search}
                searchKeyword={searchHandler}
              />
            )}
          />

          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />

          <Route path="/contact/:id" component={ContactDetail} />

        </Switch>

        {/* <AddContact addContactHandler={addContactHandler} />
         component ={()=>  <ContactList contacts={contacts} getContactId={removeContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
