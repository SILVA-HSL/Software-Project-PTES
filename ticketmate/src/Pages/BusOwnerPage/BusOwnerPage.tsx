import React from "react";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import ProfileSection from "../../Components/ProfileSection/ProfileSection";
import SquareButton from "../../Components/Buttons/SquareButton/SquareButton";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import "./BusOwnerPage.css";
import Footer from "../../Components/Footer/footer";
import { useEffect, useState } from "react";
import ScheduledBusInfo from "../../Components/ScheduledBusInfo/ScheduledBusInfo";
import profileIcon from "../../Components/ProfileSection/assets/iconamoon_profile-circle-fill.png";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import axios from "axios";

interface OwnerData {
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

function BusOwnerPage() {
  const [divWidth, setDivWidth] = useState<number>(0);
  let location = useLocation();
  let { username, password } = location.state;
  const [ownerdata, setOwnerdata] = useState<OwnerData[]>([]);
  const [buttonStates, setButtonStates] = useState({ // State to track button states
    ScheduledBuses: true,
    RegisteredBuses: false,
    Reports: false
  });

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
      .get(`https://localhost:7196/api/userData/${username}/${password}`)
      .then((response) => {
        console.log(response.data);
        setOwnerdata(response.data);
        setOwnerdata(
          response.data.map((owner: any) => ({
            Id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName,
            email: owner.email,
            dob: owner.dob,
            nic: owner.nic,
            contactNo: owner.contactNo,
            userName: owner.userName,
            password: owner.password,
            userType: owner.userType,
            ownVehicleType: owner.ownVehicleType,
            drivingLicenseNo: owner.drivingLicenseNo,
            isDeleted: owner.isDeleted,
            requestStatus: owner.requestStatus,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
      
       // Function to handle button click
  const handleButtonClick = (componentName: string) => {
    setSelectedComponent(componentName);
    // Update button states
    setButtonStates((prevState) => ({
      ...prevState,
      [componentName]: true
    }));
    // Reset other button states
    for (let key in buttonStates) {
      if (key !== componentName) {
        setButtonStates((prevState) => ({
          ...prevState,
          [key]: false
        }));
      }
    }
  };

  // Function to render selected component based on state
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'ScheduledBuses':
        return <ScheduledBusInfo />;
      case 'RegisteredBuses':
        return <RegisteredBusInfoSec />;
      case 'Reports':
        return <RegisteredBusInfoSec />;
      default:
        return null;
    }
  };


  return (
    <>
      <PrimaryNavBar />

      <div className="container-fluid pt-3">
        <div>
          {/* <ProfileSection /> */}
          {/* here added the profile section manually insted of importing the component */}
          <div className="container-fluid rounded-4 proSec">
            <div className="row align-items-center">
              <div className="col-lg-3 col-sm-6 col-12 text-center">
                <h5 className="text-white pt-4">Bus Owner</h5>
                <img src={profileIcon} alt="profileIcon" className="pb-3" />
              </div>

              <div className="col-lg-4 col-sm-6 p-4">
                <div className="">
                  <p className="text-white">
                  {ownerdata[0] ? ownerdata[0].firstName : 'Loading...'}&nbsp;{ownerdata[0] ? ownerdata[0].lastName : 'Loading...'}
                    <br />
                    Owner Id : {ownerdata[0]?ownerdata[0].Id:'Loading...'} <br />
                  {ownerdata[0] ? ownerdata[0].email : 'Loading...'}
                    <br />
                  </p>
                </div>
                <PrimaryButton type="button" value="Update" color="third" />
              </div>
            </div>
          </div>
        </div>
        
       <div className='row'>
          <div className='col-lg-2 col-sm-4 m-0' id='getWidth'>
            <div>
              <Link to='/BusRegistrationPage'><SquareButton text='Register a Bus' bwidth={divWidth} /></Link>
            </div>
            <div>
              <Link to='/BusSchedulePage'><SquareButton text='Schedule a new travel journey' bwidth={divWidth} /></Link>
            </div>
          </div>
          <div className='col-lg-10 col-sm-8 rounded-4 p-3 px-4'>
            <div className='d-flex flex-row'>
              <button className={`btn btn-primary secButton ${buttonStates.ScheduledBuses ? 'active' : ''}`} onClick={() => handleButtonClick('ScheduledBuses')}>
                Scheduled buses
              </button>
              <button className={`btn btn-primary secButton ${buttonStates.RegisteredBuses ? 'active' : ''}`} onClick={() => handleButtonClick('RegisteredBuses')}>
                Registered Buses
              </button>
              {/* <button className={`btn btn-primary secButton ${buttonStates.Reports ? 'active' : ''}`} onClick={() => handleButtonClick('Reports')}>
                Reports
              </button> */}
            </div>
            <div className='p-4 rounded-4' style={{ background: '#F1F1F1' }}>
              {renderSelectedComponent()}

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BusOwnerPage;
