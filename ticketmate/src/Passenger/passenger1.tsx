
// import PrimaryNavBar from "../Components/NavBar/PrimaryNavBar";
// import ProfileSection from "./ProfileSection";
// import Footer from "../Components/Footer/Footer1";
// import MyBookings from "./MyBookings";
// import { useEffect, useState } from "react";
// import TravelHistory from "./TravelHistory";
// import Notifications from "./Notification";

// function Passenger() {
//   const [divWidth, setDivWidth] = useState(0);
//   const [currentComponent, setCurrentComponent] = useState("My Bookings");
//   const handleClick = (component: string) => {
//     setCurrentComponent(component);
//   };

//   const buttonStyle = {
//     backgroundColor: "rgba(217, 217, 217, 1)",
//     color: "black", // Optionally change text color to ensure readability
//     width: "15%",
//   };

//   useEffect(() => {
//     function handleResize() {
//       const width = document.getElementById("getWidth")?.offsetWidth;
//       setDivWidth(width || 0);
//     }

//     handleResize(); // Get initial width
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <>
//       <PrimaryNavBar />
//       <div className="container-fluid pt-3">
//         <div>
//           <ProfileSection />
//         </div>
//         <div className="row">
//           <div className="col-lg-12 col-sm-10 rounded-4 p-3 px-4">
//             <div className="d-flex flex-row">
//               <button
//                 className={`btn ${
//                   currentComponent === "My Bookings" ? "secondary" : "grey"
//                 }`}
//                 onClick={() => handleClick("My Bookings")}
//                 style={buttonStyle}
//               >
//                 My Bookings
//               </button>
//               <button
//                 className={`btn ${
//                   currentComponent === "Travel History" ? "secondary" : "grey"
//                 }`}
//                 onClick={() => handleClick("Travel History")}
//                 style={buttonStyle}
//               >
//                 Travel History
//               </button>
//               <button
//                 className={`btn ${
//                   currentComponent === "Notifications" ? "secondary" : "grey"
//                 }`}
//                 onClick={() => handleClick("Notifications")}
//                 style={buttonStyle}
//               >
//                 Notifications
//               </button>
//             </div>
//             <div className="p-4 rounded-4" style={{ background: "#F1F1F1" }}>
//               {currentComponent === "My Bookings" ? (
//                 <MyBookings />
//               ) : currentComponent === "Travel History" ? (
//                 <TravelHistory />
//               ) : (
//                 <Notifications />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Passenger;




import PrimaryNavBar from "../Components/NavBar/PrimaryNavBar";
import ProfileSection from "./ProfileSection";
import Footer from "../Components/Footer/footer";

import MyBookings from "./MyBookings";
import { useEffect, useState } from "react";
import TravelHistory from "./TravelHistory";
import Notifications from "./Notification";
import axios from "axios";
import { BrowserRouter as Router, useLocation,useNavigate } from "react-router-dom";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import profileIcon from "../Components/ProfileSection/assets/iconamoon_profile-circle-fill.png";


interface PassengerData {
  Id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  nic: string;
  contactNo: string;
  userName: string;
  password: string;
  userType: string;
  ownVehicleType: string;
  drivingLicenseNo: string;
  isDeleted: boolean;
  requestStatus: boolean;
}

function Passenger() {
  const [divWidth, setDivWidth] = useState(0);
  const [currentComponent, setCurrentComponent] = useState("My Bookings");
  const handleClick = (component: string) => {
    setCurrentComponent(component);
  };
  let location = useLocation();
  let { username, password } = location.state;
  const [passengerdata, setPassengerdata] = useState<PassengerData[]>([]);
  const history = useNavigate();
  

  const buttonStyle = {
    backgroundColor: "rgba(217, 217, 217, 1)",
    color: "black", // Optionally change text color to ensure readability
    //width: "35%",
  };

  useEffect(() => {
    function handleResize() {
      const width = document.getElementById("getWidth")?.offsetWidth;
      setDivWidth(width || 0);
    }

    handleResize(); // Get initial width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    axios
      .get(`https://localhost:7196/api/userData/findUser/${username}/${password}`)
      .then((response) => {
       // console.log(response.data);
        setPassengerdata(
       
        (
          response.data.map((passenger: any) => ({
            Id: passenger.id,
            firstName: passenger.firstName,
            lastName: passenger.lastName,
            email: passenger.email,
            dob: passenger.dob,
            nic: passenger.nic,
            contactNo: passenger.contactNo,
            userName: passenger.userName,
            password: passenger.password,
            userType: passenger.userType,
            ownVehicleType: passenger.ownVehicleType,
            drivingLicenseNo: passenger.drivingLicenseNo,
            isDeleted: passenger.isDeleted,
            requestStatus: passenger.requestStatus,
          }))
        ));
        //console.log(passengerdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <PrimaryNavBar />
      <div className="container-fluid pt-3">
        <div>

        <div className="container-fluid rounded-4 proSec">
            <div className="row align-items-center">
              <div className="col-lg-3 col-sm-6 col-12 text-center">
                <h5 className="text-white pt-4">Passenger</h5>
                <img src={profileIcon} alt="profileIcon" className="pb-3" />
              </div>

              <div className="col-lg-4 col-sm-6 p-4">
                <div className="">
                  <p className="text-white">
                  {passengerdata[0] ? passengerdata[0].firstName : 'Loading...'}&nbsp;{passengerdata[0] ? passengerdata[0].lastName : 'Loading...'}
                    <br />
                    Passenger Id : {passengerdata[0]?passengerdata[0].Id:'Loading...'} <br />
                  {passengerdata[0] ? passengerdata[0].email : 'Loading...'}
                    <br />
                    
                  </p>
                </div>
                {/* <PrimaryButton type="button" value="Update" color="third" /> */}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    history("/UpdatePassengerProfile", {
                      state: { passengerdata: passengerdata[0] },
                    });
                  }}
                >
                  Update
                </button>

              </div>
            </div>
          </div>
        </div>
        <div className="row h-auto align-items-center justify-content-center m-auto ">
          <div className="col-12  rounded-4 pt-3 class1">
            <div className="d-flex flex-row pb-2 ">
              <button
                className={`btn m-1  ${
                  currentComponent === "My Bookings" ? "secondary" : "grey"
                }`}
                onClick={() => handleClick("My Bookings")}
                style={
                  currentComponent === "My Bookings"
                    ? {
                        ...buttonStyle,
                        fontWeight: "semi-bold",
                        color: "white",
                      }
                    : buttonStyle
                }
              >
                My Bookings
              </button>
              <button
                className={`btn m-1 ${
                  currentComponent === "Travel History" ? "secondary" : "grey"
                }`}
                onClick={() => handleClick("Travel History")}
                style={
                  currentComponent === "Travel History"
                    ? { ...buttonStyle, fontWeight: "bold", color: "white" }
                    : buttonStyle
                }
              >
                Travel History
              </button>
              <button
                className={`btn m-1 ${
                  currentComponent === "Notifications" ? "secondary" : "grey"
                }`}
                onClick={() => handleClick("Notifications")}
                style={
                  currentComponent === "Notifications"
                    ? { ...buttonStyle, fontWeight: "bold", color: "white" }
                    : buttonStyle
                }
              >
                Notifications
              </button>
            </div>
            <div className="p-4 rounded-4" style={{ background: "#F1F1F1" }}>
              {currentComponent === "My Bookings" ? (
                <MyBookings />
              ) : currentComponent === "Travel History" ? (
                <TravelHistory />
              ) : (
                <Notifications />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Passenger;
