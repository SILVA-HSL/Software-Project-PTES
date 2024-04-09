import "./passengerFormComponent.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import { useFormik } from "formik";
import { driverFormValidation } from "./driverFormValidation";

const initialValues = {
  firstName: "",
  lastName: "",
  nic: "",
  email: "",
  contactNumber: "",
  userName: "",
  password: "",
  confirmPassword: "",
  licenceNumber: "",
};

function driverFormComponent() {
  const [dob, setDob] = useState<Date | null>(null);

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: driverFormValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <div className="container shadow bg-white col-8  justify-center shadow p-3 rounded mb-5 bg-body rounded">
        <form className="container display-4" onSubmit={handleSubmit}>
          <div className="row  mt-3">
            <div className="col-12 col-lg-6">
              <p className="fw-regular">First Name</p>
              <input
                type="text"
                name="firstName"
                id="firstName"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your first name"
                className="col-11 p-3"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.firstName}
                  </p>
                </small>
              )}
            </div>
            <div className="col-12 col-lg-6">
              <p className="fw-regular">Last Name</p>
              <input
                type="text"
                name="lastName"
                id="lastName"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your last name"
                className="col-11 p-3"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.lastName}
                  </p>
                </small>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-6">
              <p className="fw-regular">NIC Number</p>
              <input
                type="text"
                name="nic"
                id="nic"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your NIC number"
                className="col-11 p-3"
                value={values.nic}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.nic && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.nic}
                  </p>
                </small>
              )}
            </div>
            <div className="col-12 col-lg-6">
              <p className="fw-regular ">Date of Birth</p>

              <div className="col-6 text-secondary fs-10 fw-normal  font-family-Inter m-0 px-3 py-2 p-2">
                <DatePicker
                  selected={dob}
                  onChange={(date: Date | null) => setDob(date)}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  showYearDropdown
                  scrollableMonthYearDropdown
                  placeholderText="DD/MM/YYYY "
                  className="col-12  p-3"
                />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-8">
              <p className="fw-regular">Email Address</p>
              <input
                type="email"
                name="email"
                id="email"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your email address"
                className="col-lg-8  p-3"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.email}
                  </p>
                </small>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-8">
              <p className="fw-regular">Contact Number</p>
              <input
                type="text"
                name="contactNumber"
                id="contactNumber"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your contact number"
                className="col-lg-8 p-3"
                value={values.contactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.contactNumber && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.contactNumber}
                  </p>
                </small>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-8">
              <p className="fw-regular">Driving license No</p>
              <input
                type="text"
                name="licenceNumber"
                id="licenceNumber"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your lisence number"
                className="col-lg-8 p-3"
                value={values.licenceNumber}
              />
              {errors.licenceNumber && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.licenceNumber}
                  </p>
                </small>
              )}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12 col-lg-8">
              <p className="fw-regular">User Name</p>
              <input
                type="text"
                name="userName"
                id="userName"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your user name"
                className="col-lg-8 p-3"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.userName && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.userName}
                  </p>
                </small>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-6">
              <p className="fw-regular">Password</p>
              <input
                type="password"
                name="password"
                id="password"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your password"
                className="col-11 p-3"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.password}
                  </p>
                </small>
              )}
            </div>
            <div className="col-12 col-lg-6">
              <p className="fw-regular">Confirm Password</p>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Confirm your password"
                className="col-11 p-3"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.confirmPassword}
                  </p>
                </small>
              )}
            </div>
          </div>
          <br />
          <div className="row text-center">
            <PrimaryButton
              type="submit"
              value="SIGN UP"
              color="primary"
              IsSmall={false}
            />
            <br />
            {/* <GoogleSignInButton/> */}
          </div>
        </form>
      </div>

     
    </div>
  );
}

export default driverFormComponent;