import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useInvites from './services/index.services';
import NotFound from './components/NotFound/NotFound.component';
import LandingPage from './components/LandingPage/LandingPage.component';

function App() {
  const services = useInvites()

  return (
    <div className='app__container'>
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<LandingPage {...services}/>}>
      </Route>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
