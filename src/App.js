import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Prueba from './pages/Prueba';
import Registro from './pages/Registro';
import TimelineDemo from './pages/TimelineDemo';
import IngresoPNP from './pages/IngresoPNP';


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "primeflex/primeflex.css";

import 'primereact/resources/primereact.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import ValidarPNP from './pages/ValidarPNP';
import Flagrantes from './pages/Flagrantes';
import FlagrantesMP from './pages/FlagrantesMP';
import FlagrantesPJ from './pages/FlagrantesPJ';
import FlagrantesAudiencia from './pages/FlagrantesAudiencia';
import TarjetaDerechos from './pages/TarjetaDerechos';
import PendientePNP from './pages/PendientePNP';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Menu />} > 
          <Route exact path ="prueba" element={ <Prueba />}/>
          <Route exact path ="tarjetaDerechos" element={ <TarjetaDerechos />}/>
          <Route exact path ="timeline/:id" element={ <TimelineDemo />}/>
          <Route exact path ="registro" element={ <Registro />}/>  
          <Route exact path ="ingresoPNP" element={ <IngresoPNP />}/>
          <Route exact path ="validarPNP" element={ <ValidarPNP />}/>
          <Route exact path ="pendientePNP" element={ <PendientePNP/>}/>
          <Route exact path ="flagrantes" element={ <Flagrantes />}/>
          <Route exact path ="flagrantesMP" element={ <FlagrantesMP />}/>
          <Route exact path ="flagrantesPJ" element={ <FlagrantesPJ />}/>
          <Route exact path ="flagrantesAudiencia" element={ <FlagrantesAudiencia />}/>
        </Route>
        <Route exact path="/login" element={<Login />} />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
