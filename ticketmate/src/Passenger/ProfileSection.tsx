// import React from 'react'
// import profileIcon from './images/iconamoon_profile-circle-fill.png'
// import './ProfileSection.css'
// import PrimaryButton from '../Components/Buttons/PrimaryButton'

// function ProfileSection() {
//   return (
//     <>
//     <div className='container-fluid rounded-4 proSec'>
//         <div className='row align-items-center'>
//             <div className='col-lg-3 col-sm-6 col-12 text-center'>
//                 <h5 className='text-white pt-4'>Passenger</h5>
//                 <img src={profileIcon} alt="profileIcon" className='pb-3'/>
//             </div>

//             <div className='col-lg-4 col-sm-6 p-4'>
//                 <div className=''>
//                     <p className='text-white'>S.M.L.K. Jayasooriya <br />
//                     32-14253.09 <br />
//                     jayasooriyasmlk@971 <br />
//                     </p>
//                 </div>
//                 <PrimaryButton type="button" value="Update" color="third"/>
//             </div>
//         </div>
//     </div>

//     </>
//   )
// }

// export default ProfileSection



import React from 'react'
import profileIcon from './images/iconamoon_profile-circle-fill.png'
import './ProfileSection.css'
import PrimaryButton from '../Components/Buttons/PrimaryButton'

function ProfileSection() {
  return (
    <>
    <div className='container-fluid rounded-4 proSec'>
        <div className='row align-items-center h-auto '>

            <div className='col-lg-3 col-sm-6 col-12 text-center'>
                <h5 className='text-white pt-4'>Passenger</h5>
                <img src={profileIcon} alt="profileIcon" className='pb-3'/>
            </div>

            <div className='col-lg-4 col-sm-6 p-4'>
                <div className=''>
                    <p className='text-white'>S.M.L.K. Jayasooriya <br />
                    32-14253.09 <br />
                    jayasooriyasmlk@971 <br />
                    </p>
                </div>
                <PrimaryButton type="button" value="Update" color="third"/>
            </div>
        </div>
    </div>

    </>
  )
}

export default ProfileSection

