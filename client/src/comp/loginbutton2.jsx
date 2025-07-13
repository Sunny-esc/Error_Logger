 import React, { useState } from 'react';
import Logins from '../login/loginup';        
import sign from '../assets/svgs/sign.svg'; 
 const Loginbutton2=()=>{
      const [show, setShow] = useState(false);

      
      return( 
          <>
        <button
      className="flex items-center gap-1   px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-300 transition-colors duration-500"
      onClick={() => setShow(true)}
      >
          <img src={sign} alt="Login" className="w-6" />
        
      Login
    </button>
    
        {show && <Logins onClose={() => setShow(false)} />}
        </>
           
    );}
export default Loginbutton2;