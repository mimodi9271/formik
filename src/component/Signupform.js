import { useState } from "react";

const Signupform = () => {
  const [userdata, setUserdata] = useState({ name: "", email: "", password: "" });

  const changeHandler = (e) => {
    setUserdata({ ...userdata , [e.target.name] : e.target.value })
  }

  const submitHandler =(e) => {
    e.preventDefault();
    console.log(userdata)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="formcontrol">
        <label>name :</label>
        <input type="text" name="name" value={userdata.name} onChange={changeHandler}/>
      </div>
      <div className="formcontrol">
        <label>email :</label>
        <input type="trxt" name="email" value={userdata.email} onChange={changeHandler}/>
      </div>
      <div className="formcontrol">
        <label>password :</label>
        <input type="text" name="password" value={userdata.password} onChange={changeHandler}/>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Signupform;
