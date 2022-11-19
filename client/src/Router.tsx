import { Routes, Route } from 'react-router-dom';

// import Note from './pages/Note';
// import UserEdit from './pages/UserEdit';
import Login from './pages/auth/Login';
// import PrivateRoute from './pages/auth/PrivateRoute';
import Register from './pages/auth/Register';
import Home from "./pages/Home"


export default function Router() {
    return (

        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            {/* <Route path="/notes" element={
                <PrivateRoute>
                    <Note />
                </PrivateRoute>
            }></Route>
            <Route path="/user/edit" element={<UserEdit />}></Route> */}
        </Routes>

    );
}