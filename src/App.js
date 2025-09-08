import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Admin } from './pages/Admin';
import { ThemeProvider } from './pages/ThemeContext';
import { Routes,Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Start } from './pages/Start';
import { EditJob } from './pages/EditJob';
import { AddJob } from './pages/AddJob';

function App() {
  return (
    <ThemeProvider>
      <div className={`App `}>
        <Routes>
          <Route path="/" element={<Start/>}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path ="/Home" element={<HomePage/>}/>
          <Route path="/update/:id" element={<EditJob/>}/>
          <Route path ="/add" element={<AddJob/>}/>
        </Routes>
        
      </div>
    </ThemeProvider>
  );
}

export default App;
