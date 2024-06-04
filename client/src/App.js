import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/layout/header/Header';

function App() {
  return (
    <div className="wrapper px-0 px-md-5 mx-0 mx-md-5">
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
