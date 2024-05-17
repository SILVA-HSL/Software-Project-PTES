import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./TravelOptionsPage.css";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
import TotalBlock2 from "../../Components/TravelSearchBlock/TotalBlock2";
import Footer from "../../Components/Footer/Footer";
import { BusStand, TrainStopStation, SearchResult } from "../../SearchResult";

interface TravelOptionsPageProps {
  selectedVehicleType: string;
  selectedStartLocation: string;
  selectedEndLocation: string;
}

// Define the TravelOptionsPage component
const TravelOptionsPage: React.FC<TravelOptionsPageProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState<SearchResult[]>(
    location.state?.searchResults || []
  );
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>(
    location.state?.selectedVehicleType || ""
  );
  const [selectedStartLocation, setSelectedStartLocation] = useState<string>(
    location.state?.selectedStartLocation || ""
  );
  const [selectedEndLocation, setSelectedEndLocation] = useState<string>(
    location.state?.selectedEndLocation || ""
  );

  // location.state is used to pass state data from one route to another

  // If location.state is un defined, try to retrieve the data from the session storage
  useEffect(() => {
    if (!location.state) {
      const storedSearchResults = sessionStorage.getItem("searchResults");
      const storedSelectedVehicleType = sessionStorage.getItem(
        "selectedVehicleType"
      );

      setSearchResults(
        storedSearchResults ? JSON.parse(storedSearchResults) : []
      );
      setSelectedVehicleType(storedSelectedVehicleType || "");
    }
  }, [location.state]);

  const onSearch = async (results: SearchResult[]) => {
    setSearchResults(results);
  };

  const handleSearch = async (results: SearchResult[]) => {
    // Wait for the search operation to complete
    await onSearch(results);

    // Then navigate to the TravelOptionsPage
    navigate("/travel-options", {
      state: {
        searchResults: results,
        selectedVehicleType: selectedVehicleType,
      },
    });
  };

  console.log(selectedVehicleType);

  console.log(selectedStartLocation);
  console.log(selectedEndLocation);

  const handleBookNow = (VehicleId: number) => {
    const selectedVehicle = searchResults.find(
      (result) => result.VehicleId === VehicleId
    );
    if (selectedVehicle) {
      const startStand = selectedVehicle.selectedStands.$values.find(
        (stand) => {
          if ("busStation" in stand) {
            return stand.busStation === selectedStartLocation;
          } else {
            return stand.trainStationName === selectedStartLocation;
          }
        }
      );
      const endStand = selectedVehicle.selectedStands.$values.find((stand) => {
        if ("busStation" in stand) {
          return stand.busStation === selectedEndLocation;
        } else {
          return stand.trainStationName === selectedEndLocation;
        }
      });
      if (startStand && endStand) {
        const startStandTime =
          "busStation" in startStand
            ? startStand.standArrivalTime
            : startStand.trainDepartureTime;
        const endStandTime =
          "busStation" in endStand
            ? endStand.standArrivalTime
            : endStand.trainDepartureTime;

        console.log(selectedStartLocation);
        console.log(selectedEndLocation);

        console.log("Start Stand Arrival Time", startStandTime);
        console.log("End Stand Arrival Time", endStandTime);
        console.log(selectedVehicle);
        // Pass the startStand and endStand to the booking page
        navigate("/bus-booking", {
          state: {
            ...selectedVehicle,
            //startStand,
            // endStand,
            startStandTime,
            endStandTime,
            selectedStartLocation,
            selectedEndLocation,
          },
        });
      } else {
        console.error("Start or end stand details not found.");
      }
    } else {
      console.error("Selected vehicle details not found.");
    }
  };

  return (
    <>
      <PrimaryNavBar />
      <TotalBlock2
        selectedVehicleType={selectedVehicleType}
        selectedStartLocation={selectedStartLocation}
        setSelectedStartLocation={setSelectedStartLocation}
        selectedEndLocation={selectedEndLocation}
        setSelectedEndLocation={setSelectedEndLocation}
        onSearch={handleSearch}
      />
      <div className="Travel-Option-Page-body d-flex ">
        <div className=" details-card-container d-flex flex-wrap justify-content-center  ">
          {/* Render DetailsCard components for each search result */}
          {searchResults.length > 0 ? (
            searchResults.map((result: SearchResult, index: number) => (
              <DetailsCard
                key={index}
                onBookNow={handleBookNow}
                VehicleId={result.VehicleId}
                scheduleId={result.scheduleId}
                vehicleNo={result.vehicleNo}
                routNo={result.routNo}
                startLocation={result.startLocation}
                endLocation={result.endLocation}
                departureTime={result.departureTime}
                arrivalTime={result.arrivalTime}
                comfortability={result.comfortability}
                duration={result.duration}
                ticketPrice={result.ticketPrice}
                selectedStands={result.selectedStands}
                scheduledDatesList={result.scheduledDatesList}
                firstClassTicketPrice={result.firstClassTicketPrice}
                secondClassTicketPrice={result.secondClassTicketPrice}
              />
            ))
          ) : (
            <div className=" h-auto mt-5 mb-5 p-4  ">
              No matching travel options found! Search another destination...
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TravelOptionsPage;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useTravelContext } from "../../SelectedVehicleTypeContext";
// import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
// import DetailsCard from "../../Components/TravelDetailsCard/DetailsCard";
// import TotalBlock2 from "../../Components/TravelSearchBlock/TotalBlock2";
// import Footer from "../../Components/Footer/Footer";
// import { SearchResult } from "../../SearchResult";
// import "./TravelOptionsPage.css";

// interface TravelOptionsPageProps {
//   searchResults: SearchResult[];
// }

// const TravelOptionsPage: React.FC<TravelOptionsPageProps> = ({ searchResults }) => {
//   const navigate = useNavigate();
//   const {
//     selectedVehicleType,
//     setSelectedVehicleType,
//     setStartStandTime,
//     setEndStandTime,
//     setSelectedStartLocation,
//     setSelectedEndLocation,
//   } = useTravelContext();

//   const handleBookNow = (VehicleId: number) => {
//     // Function implementation
//   };

//   const handleSearch = async (results: SearchResult[]) => {
//     // Function implementation
//   };

//   return (
//     <>
//       <PrimaryNavBar />
//       <TotalBlock2
//         selectedVehicleType={selectedVehicleType}
//         onSearch={handleSearch} // Add this line
//       />
//       <div className="Travel-Option-Page-body d-flex">
//         <div className="details-card-container d-flex flex-wrap justify-content-center">
//           {searchResults.length > 0 ? (
//             searchResults.map((result, index) => (
//               <DetailsCard
//                 key={index}
//                 onBookNow={handleBookNow}
//                 VehicleId={result.VehicleId}
//                 scheduleId={result.scheduleId}
//                 vehicleNo={result.vehicleNo}
//                 routNo={result.routNo}
//                 startLocation={result.startLocation}
//                 endLocation={result.endLocation}
//                 departureTime={result.departureTime}
//                 arrivalTime={result.arrivalTime}
//                 comfortability={result.comfortability}
//                 duration={result.duration}
//                 ticketPrice={result.ticketPrice}
//                 selectedStands={result.selectedStands}
//                 scheduledDatesList={result.scheduledDatesList}
//                 firstClassTicketPrice={result.firstClassTicketPrice}
//                 secondClassTicketPrice={result.secondClassTicketPrice}
//               />
//             ))
//           ) : (
//             <div className="h-auto mt-5 mb-5 p-4">
//               No matching travel options found! Search another destination...
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default TravelOptionsPage;
