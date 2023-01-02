import './App.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Confirm from './components/Confirm/Confirm.component';
import LandingPage from './components/LandingPage/LandingPage.component';
import NotFound from './components/NotFound/NotFound.component';
import useInvites from './services/index.services';

function App() {
  const services = useInvites()

  return (
    <div className='app__container'>
    <BrowserRouter>
    <Routes>
      <Route  path='' element={<LandingPage {...services}/>}>
      </Route>
      <Route  path=':code' element={<Confirm {...services}/>}/>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
