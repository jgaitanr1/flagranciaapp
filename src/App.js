import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Prueba from './pages/Prueba';
import Registro from './pages/Registro';


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "primeflex/primeflex.css";

import 'primereact/resources/primereact.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import TimelineDemo from './pages/TimelineDemo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Menu />} > 
          <Route exact path ="prueba" element={ <Prueba />}/>
          <Route exact path ="timeline" element={ <TimelineDemo />}/>
          <Route exact path ="registro" element={ <Registro />}/>  
        </Route>
        <Route exact path="/login" element={<Login />} />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
