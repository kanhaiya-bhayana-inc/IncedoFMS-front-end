import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Main from './Components/Main';
import Dashboard from './Components/Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom'
import Testing from './Components/Test/Testing';
import Home from './Components/Home/Home';
import { NotFound } from './Components/NotFound/NotFound';


function App() {
  return (
      <Routes>
        <Route path="/" exact element={<Main />}>
          <Route path='/' element={<Home />} />
          <Route path='/fms' element={<Dashboard />} />
          <Route path='/test' element={<Testing />} />
          <Route path='/*' element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
