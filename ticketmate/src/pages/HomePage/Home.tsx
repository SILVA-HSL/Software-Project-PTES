import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Background from "./assests/Home Background.jpg";
import TotalBlock from "../../Components/TravelSearchBlock/TotalBlock";
import HomeContent from "../../Components/HomePageContent/HomeContent";
import Footer from "../../Components/Footer/footer";
import SelectedVehicleTypeContext from "../../SelectedVehicleTypeContext";
import { SearchResult } from "../../SearchResult";
import PrimaryNavBar_logout from "../../Components/NavBar/PrimaryNavBar-logout";


const getToken = () => {
  return sessionStorage.getItem("token");
};
interface HomeProps {
  onSearch: React.Dispatch<React.SetStateAction<SearchResult[] | null>>;
  setSelectedStartLocation: Dispatch<SetStateAction<string>>;
  setSelectedEndLocation: Dispatch<SetStateAction<string>>;
}

const Home: React.FC<HomeProps> = ({ onSearch }) => {
  const { selectedVehicleType, setSelectedVehicleType } = useContext(
    SelectedVehicleTypeContext
  );

  const [selectedStartLocation, setSelectedStartLocation] = useState("");
  const [selectedEndLocation, setSelectedEndLocation] = useState("");

  const navigate = useNavigate();

  // Function to handle search button click
  const handleSearch = async (results: SearchResult[]) => {
    // Navigate to the '/travel-options' route and pass search results as state
    navigate("/travel-options", {
      state: {
        searchResults: results,
        selectedVehicleType: selectedVehicleType,
        selectedStartLocation: selectedStartLocation,
        selectedEndLocation: selectedEndLocation,
      },
    });

    onSearch(results);
  };

  return (
    <div className=" HomeBody">
       {(getToken() !== null)?  <span data-testid="navbar"><PrimaryNavBar_logout /></span>:<span data-testid="navbar"><PrimaryNavBar /></span>}
      <div className="HomeBackground p-0 z-1 ">
        <img className="img" src={Background} alt="Background1" />
      </div>

      <TotalBlock
        selectedVehicleType={selectedVehicleType}
        setSelectedVehicleType={setSelectedVehicleType}
        selectedStartLocation={selectedStartLocation}
        setSelectedStartLocation={setSelectedStartLocation}
        selectedEndLocation={selectedEndLocation}
        setSelectedEndLocation={setSelectedEndLocation}
        onSearch={handleSearch}
      />

      <HomeContent />

      <Footer />
    </div>
  );
};

export default Home;
