import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// const loaddata = {
//   name: "milad",
//   email: "mimodi@gmail.com",
//   gender: "male",
//   nationality: "IR",
//   password: "123",
//   passwordconfirmation: "123",
// };

const loaddata = {};
const initialValues = {
  name: "",
  email: "",
  gender: "",
  nationality: "",
  password: "",
  passwordconfirmation: "",
};

const Formikcomp = () => {
  const [formvalues, setFormvalues] = useState({
    name: "",
    email: "",
    gender: "",
    nationality: "",
    password: "",
    passwordconfirmation: "",
  });

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://localhost:3002/users", values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  //   const validate = (values) => {
  //     let error = {}
  //     if(!values.name) error.name = "Name is required"
  //     if(!values.email) error.email = "email is required"
  //     if(!values.password) error.password = "password is required"

  //     return error;
  //   }
  const Apifunc = () => {
    // setFormvalues(loaddata);
    axios
      .get("http://localhost:3002/users/1")
      .then((res) => setFormvalues(res.data))
      .catch();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("must be correct email")
      .required("email is required"),
    gender: Yup.string().required("gender is required"),
    nationality: Yup.string().required("nationality is required"),
    password: Yup.string().required("Password is required"),
    passwordconfirmation: Yup.string()
      .required("confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: formvalues || initialValues,
    onSubmit: onSubmit,
    // validate : validate
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="formcontrol">
        <label>name :</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? (
          <p>{formik.errors.name}</p>
        ) : null}
      </div>
      <div className="formcontrol">
        <label>email :</label>
        <input
          type="trxt"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <p>{formik.errors.email}</p>
        ) : null}
      </div>
      <div className="formcontrol1">
        <input
          type="radio"
          name="gender"
          id="0"
          value="male"
          onChange={formik.handleChange}
          checked={formik.values.gender === "male"}
        />
        <label htmlFor="0">male</label>
        <input
          className="label"
          type="radio"
          name="gender"
          id="1"
          value="female"
          onChange={formik.handleChange}
          checked={formik.values.gender === "female"}
        />
        <label htmlFor="1">female</label>
        {formik.errors.gender && formik.touched.gender ? (
          <p>{formik.errors.gender}</p>
        ) : null}
      </div>
      <div className="formcontrol">
        <select name="nationality" onChange={formik.handleChange}>
          <option value="">select your nationality</option>
          <option value="IR">IRAN</option>
          <option value="US">USA</option>
          <option value="EN">ENGLAND</option>
        </select>
        {formik.errors.nationality && formik.touched.nationality ? (
          <p>{formik.errors.nationality}</p>
        ) : null}
      </div>
      <div className="formcontrol">
        <label>password :</label>
        <input
          type="text"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <p>{formik.errors.password}</p>
        ) : null}
      </div>
      <div className="formcontrol">
        <label>password :</label>
        <input
          type="text"
          name="passwordconfirmation"
          value={formik.values.passwordconfirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.passwordconfirmation &&
        formik.touched.passwordconfirmation ? (
          <p>{formik.errors.passwordconfirmation}</p>
        ) : null}
      </div>
      <button onClick={Apifunc} type="button">
        load data
      </button>
      <button type="submit" disabled={!formik.isValid}>
        Register
      </button>
    </form>
  );
};

export default Formikcomp;
