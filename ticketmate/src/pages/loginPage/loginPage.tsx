// import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
// import "./loginPage.css";
//  //import vars from '../../vars.css'
// import loginimage from "../../assets/Ellipse 628.svg";
// import PrimaryButton from "../../Components/Buttons/PrimaryButton";
// import Footer from "../../Components/Footer/footer";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react";
// import { content } from "html2canvas/dist/types/css/property-descriptors/content";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const history = useNavigate();

//   const handlesubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();

//     try {
//       // console.log("username: " + username + " password: " + password);
//       const response = await axios.post(
//         "https://localhost:7196/api/Auth/login",
//         {
//           username,
//           password,
//         }
//       );

 
//       const token = response.data.jwtToken;
//       //Fconsole.log("token", token);

//       if (token) {
//         sessionStorage.setItem("token", token);

//         //decode the token
//         const tokenParts = token.split(".");
//         const encodedPayload = tokenParts[1];
//         // console.log("encodedPayload", encodedPayload); // Log the encoded payload

//         const decodedPayload = JSON.parse(atob(encodedPayload));
//         const userRole =
//           decodedPayload[
//             "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
//           ];
//         //console.log("userRole" , userRole);

//         switch (userRole) {
//           case "Admin":
//             // history("/AdminPage");
//             //history(`/AdminPage?username=${username}&password=${password}`);
//             history("/AdminPage", { state: { username, password } });

//             break;
//           case "Owner":
//             history("/BusOwnerPage", { state: { username, password } });
//             break;
//           case "Passenger":
//             history("/passenger", { state: { username, password } });
//             break;
//           case "Driver":
//             history("/driver", { state: { username, password } });
//             break;
//           default:
//             //alert("Invalid user name or password");
//             break;
//         }
//       } else {
//         alert("Invalid user name or password");
//       }
//     } catch (error) {
//       alert("Invalid user name or password");

//       console.error("There was an error!", error);
//       // Handle error (e.g., show error message to user)
//     }

//   };


//   return (
//     <div className="loginpage-body">
//       <PrimaryNavBar/>
//       <a href="http://localhost:5173/">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="30"
//           height="30"
//           fill="#042F40"
//           className="bi bi-arrow-left-circle col-1 my-3 mx-5"
//           viewBox="0 0 16 16"
//           data-testid="back-button"
//         >
//           <path
//             fillRule="evenodd"
//             d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
//           />
//         </svg>
//       </a>

//       <form onSubmit={handlesubmit} method="post">

//         <div className=" d-flex justify-content-center ">
//           <div
//             className="shadow p-3 mb-5 bg-white col-5 row-2 justify-center "
//             id="login-form"

//           >
//             <div className="text-center">
//               <img src={loginimage} alt="loginimage" className="" data-testid="login-page-profile-icon"/>
//             </div>

//             {/* <input
//               className="form-control col-8 mx-auto m-4 custom-bg-color"
//               type="text"
//               placeholder=" <><BsFillPersonFill />    username"
//               required
//             ></input> */}
//             <input
//               className="form-control col-8 mx-auto m-4 custom-bg-color"
//               type="text"
//               placeholder="username"
//               name="username"
//               required
//               onChange={(e) => setUsername(e.target.value)}
//               style={{ paddingLeft: "30px" }}
//               data-testid="username"
//               // Add padding for the icon



//             ></input>

//             <input
//               type="password"
//               name="password"
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control col-8 mx-auto m-4 custom-bg-color"
//               placeholder="    password"
//               value={password}
//               required
//               data-testid="password"

//             ></input>
//             <div className=" justify-content-center text-center" >
             
//               <input type="submit" value="LOG IN" className=" btn-primary btn"
//               data-testid="login-button" /><br/><br/>
              
//                <small>Don't have an account? <a href="/register">sign up</a></small> 
                
              

//             </div>
//           </div>
//         </div>
//       </form>
//       <Footer />
//     </div>

//   );
// };
// export default LoginPage;



import React, { useState } from "react";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./loginPage.css";
import loginimage from "../../assets/Ellipse 628.svg";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Footer from "../../Components/Footer/footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import PrimaryNavBar_logout from "../../Components/NavBar/PrimaryNavBar-logout";

const getToken = () => {
  return sessionStorage.getItem("token");
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handlesubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://localhost:7196/api/Auth/login`,
        {
          username,
          password,
        }
      );

      const token = response.data.jwtToken;

      if (token) {
        sessionStorage.setItem("token", token);

        // Decode the token
        const tokenParts = token.split(".");
        const encodedPayload = tokenParts[1];
        const decodedPayload = JSON.parse(atob(encodedPayload));
        const userRole =
          decodedPayload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];

        switch (userRole) {
          case "Admin":
            history("/AdminPage", { state: { username, password } });
            break;
          case "Owner":
            history("/OwnerPage", { state: { username, password } });
            break;
          case "Passenger":
            history("/passenger", { state: { username, password } });
            break;
          case "Driver":
            history("/driver", { state: { username, password } });
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Invalid user role",
            });
            break;
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid username or password",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid username or password",
      });
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="loginpage-body">
       {(getToken() !== null)?  <span data-testid="navbar"><PrimaryNavBar_logout /></span>:<span data-testid="navbar"><PrimaryNavBar /></span>}
      <a href="http://localhost:5173/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#042F40"
          className="bi bi-arrow-left-circle col-1 my-3 mx-5"
          viewBox="0 0 16 16"
          data-testid="back-button"
        >
          <path
            fillRule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
          />
        </svg>
      </a>

      <form onSubmit={handlesubmit} method="post">
        <div className=" d-flex justify-content-center ">
          <div
            className="shadow p-3 mb-5 bg-white col-5 row-2 justify-center "
            id="login-form"
          >
            <div className="text-center">
              <img src={loginimage} alt="loginimage" className="" data-testid="login-page-profile-icon" />
            </div>

            <input
              className="form-control col-8 mx-auto m-4 custom-bg-color"
              type="text"
              placeholder="username"
              name="username"
              required
              onChange={(e) => setUsername(e.target.value)}
              style={{ paddingLeft: "30px" }}
              data-testid="username"
            ></input>

            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control col-8 mx-auto m-4 custom-bg-color"
              placeholder="    password"
              value={password}
              required
              data-testid="password"
            ></input>
            <div className=" justify-content-center text-center">
              <input
                type="submit"
                value="LOG IN"
                className=" btn-primary btn"
                data-testid="login-button"
              />
              <br />
              <br />
              <small>
                Don't have an account? <a href="/register">sign up</a>
              </small>
            </div>
          </div>
        </div>
      </form>
      <div className="footer">  <Footer /></div>
    
    </div>
  );
};

export default LoginPage;
