import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/layout/header/Header';
// import { useContext, useEffect } from 'react';
// import Axios from 'axios';
// import { AuthContext } from './Context';

function App() {

//   const { setAdmin, auth, setAuth } = useContext(AuthContext);

//   useEffect(() => {
//     const token = localStorage.getItem('Access_token') ?? "Bearer null"
//     const validateToken = async () => {
//         try {
//             const response = await Axios.get('http://localhost:4000/api/admin/authenticate', {
//                 headers: {
//                     Authorization: token
//                 }
//             })
//             setAdmin(response.data.admin)
//             setAuth(true)
//         } catch (error) {
//           return
//         }
                        
//     };

//     if (!auth) validateToken()
// }, [])

  return (
    <div className="wrapper px-0 px-md-5 mx-0 mx-md-5">
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
