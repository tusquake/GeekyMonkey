import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const notify = ()=>{
    toast("Data Submitted Succesfully!")
  }

  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Message: "",
  });

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUserData({ ...userData, [name]: value });
  };

  // connect with firebase
  const submitData = async (event) => {
    event.preventDefault();
    const { Name, Email, Message} = userData;

    if (Name && Email && Message) {
      const res = await fetch(
        "https://contactform-3fc09-default-rtdb.firebaseio.com/userDataRecords.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name,
            Email,
            Message,
          }),
        }
      );


      if (res) {
        setUserData({
          Name: "",
          Email: "",
          Message: "",
        });
        notify();
      } else {
        toast("Please fill the data");
      }
    } else {
      toast("Please fill the data");
    }
  };


  return (
    <div className="contact">
      <main>
        <h1>Contact Us</h1>

        <form method="POST">
          <div>
            <label>Name</label>
            <input type="text" name="Name" required placeholder="Enter your Name" id="name" value={userData ? userData.Name : ''} onChange={postUserData}/>
          </div>

          <div>
            <label>Email</label>
            <input type="email" name="Email" required placeholder="Enter your Email" id="email" value={userData ? userData.Email : ''} onChange={postUserData}/>
          </div>
          <div>
            <label>Message</label>
            <input
              type="text"
              name="Message"
              required
              placeholder="Tell us about your query..."
              id="message"
              // className="form-control"
              value={userData ? userData.Message : ''}
              onChange={postUserData}
            />
          </div>

          <button type="submit" onClick={submitData}>Submit</button>
          <ToastContainer/>
        </form>
      </main>
    </div>
  );
};

export default Contact;
