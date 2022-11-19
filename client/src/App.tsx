import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import './index.css'
import {ToastContainer} from "react-toastify"

import './assets/css/ReactToastify.css'

function App() {


  return (
    <BrowserRouter>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
        className="toast"
      />
    </BrowserRouter>
  )
}

export default App
