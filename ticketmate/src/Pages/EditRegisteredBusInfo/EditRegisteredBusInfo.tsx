import React from 'react'
import { useState } from 'react';
import './EditRegisteredBusInfo.css'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import Wheel from '../../Pages/BusRegistrationPage/assets/steering-wheel (1).png'
import ToggleButton from '../../Components/Buttons/ToggleButton/ToggleButton'
import Footer from '../../Components/Footer/footer'

function EditRegisteredBusInfo() {



  const [BusNo, setBusNo] = useState('');
  const [LicenceNo, setLicenceNo] = useState('');
  const [SeatCount, setSeatCount] = useState('');
  const [ACorNonAC, setACorNonAC] = useState(0);

  const [EditBusNo, setEditBusNo] = useState('');
  const [EditLicenceNo, setEditLicenceNo] = useState('');
  const [EditSeatCount, setEditSeatCount] = useState('');
  const [EditACorNonAC, setEditACorNonAC] = useState(0);

  return (
    <>
      <PrimaryNavBar/>
      <div className='container-fluid py-4'>
        <div className='col-12 rounded-4 formSec'>
          <div className='row'>
            <h3 className='h3Style text-center'>Edit the registered bus information</h3>
          </div>
          <form action="">
          <div className='row'>
            
              <div className='col-12 col-md-6 p-3'>
                <div className="form-group row">
                    <label htmlFor="inputbusNum" className="col-form-label">Enter Bus Number</label>
                    <div className="">
                    <input type="text" className="form-control" id="inputbusNum" placeholder="Bus Number" value={BusNo} onChange={(e)=>setBusNo(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputLicencenum" className="col-form-label">Enter Licence Number</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputLicencenum" placeholder="Licence Number" value={LicenceNo} onChange={(e)=>setLicenceNo(e.target.value)}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="exampleFormControlFile1">Attach vehicle licence image</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                </div>

                <div className="form-group row">
                    <label htmlFor="exampleFormControlFile2">Attach vehicle Insuarance image</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile2"/>
                </div>

                <div className="form-group row">
                    <label htmlFor="inputSeatNo" className="col-form-label">Enter seat Count</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputSeatNo" placeholder="seat Count" value={SeatCount} onChange={(e)=> setSeatCount(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                  <fieldset className="form-group">
                      <legend className="col-form-label pt-0">AC or NoN AC</legend>
                      <div className="">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1"/>
                          <label className="form-check-label" htmlFor="gridRadios1">
                            AC
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                          <label className="form-check-label" htmlFor="gridRadios2">
                            Non AC
                          </label>
                        </div>
                      </div>
                    
                  </fieldset>
                </div>

              </div>
              <div className='col-12 col-md-6 p-6'>
              <p>Please select the seat structure</p>

              <div className='container'>
                <div className='bg-light rounded-4'>
                    <div className='row justify-content-center p-3'>
                      <img src={Wheel} alt="Steering-wheel-img" style={{width : "57px"}}/>
                    </div>
                    <div className='row justify-content-center'>

                      <div className="col p-4">
                        <div className="row justify-content-center">

                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                        <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                        <ToggleButton />
                        <ToggleButton />
                        <ToggleButton />
                        <ToggleButton />
                        <ToggleButton />
                        <ToggleButton />

                      </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            
          </div>
          </form>

        </div>
        
      </div>
      <Footer/>
    </>
  )
}

export default EditRegisteredBusInfo