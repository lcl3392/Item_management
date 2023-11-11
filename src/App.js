import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './components/Login';
import Carlist from './components/Carlist';
import MenuBar from './components/MenuBar';


function App() {
  return (
    <div className="App">
  

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" marginLeft={43}>
            Managerial Ledger 
          </Typography>
        </Toolbar>
      </AppBar>
     
      <BrowserRouter>   
      {/* 네비게이션 메뉴 */}
      {/* <nav>  
        <Link to="/">Login</Link>{' '}
        <Link to="/carlist">Carlist</Link>{' '}
      </nav> */}

      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="carlist" element={<Carlist/>}/>
        <Route path="menubar" element={<MenuBar/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;