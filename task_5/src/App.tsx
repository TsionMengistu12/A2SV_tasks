import React from "react";
import ContactForm from "./component/ContactForm";
import "./css/ContactForm.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Contact Form</h1>
        <ContactForm />
      </div>
    </div>
  );
}

export default App;
