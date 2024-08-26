import './App.css';
import './categories.styles.scss';
import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation></Navigation>}>
        <Route index element={<Home></Home>}></Route>
        <Route path='auth' element={<Authentication></Authentication>}></Route>
      </Route>
      
    </Routes>
  )
};

export default App;
