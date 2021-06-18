import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { uuid } from "uuidv4";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from './ContactDetail'
function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

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

  const addContactHandler = (contact) => {
    console.log(contact);
    console.log("...", ...contacts);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(() => {
    const getContactsListPrev = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (getContactsListPrev) setContacts(getContactsListPrev);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
        <Route 
         exact
         path="/" 
         render={(props)=>(<ContactList {...props} 
          contacts={contacts} 
           getContactId={removeContactHandler}
           />
         )}
         />
        <Route path="/add" 
        render={ (props)=>(
        <AddContact {...props} addContactHandler={addContactHandler}/>
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
