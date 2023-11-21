import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Main from './Components/Main';
import FileDetails from './Components/Dashboard/FileDetails';
import { Route, Routes } from 'react-router-dom'
import Testing from './Components/Test/Testing';
import Home from './Components/Home/Home';
import { NotFound } from './Components/NotFound/NotFound';
import LoginForm from './Components/Home/LoginForm';
import Layout from './Components/Layout';
import PipelineViewTable from './Components/Home/PipelineViewTable';


function App() {
  return (
      <Routes>
        <Route path="/" exact element={<Main />}>
          <Route path='/' element={<Home />} />
          <Route path='/fms' element={<FileDetails />} />
          <Route path='/test' element={<LoginForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/layout' element={<Layout />} />
          <Route path='/dashboard' element={(localStorage.getItem("username") && localStorage.getItem("userpassword")) ?<PipelineViewTable /> : <LoginForm />} />
        </Route>
      </Routes>
  );
}

export default App;
