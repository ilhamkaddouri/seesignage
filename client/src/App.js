import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardReact from './components/Dashboard/Dashboard.react';
import Home from './components/Home/Home.react';
import PlaylistContent from './components/Dashboard/components/PlaylistContent.react';
import SignagePlayerController from './components/SignagePlayer/SignagePlayerController';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact={true} path='/' element={<Home/>} />
          <Route exact={true} path="/dashboard" element={<DashboardReact/>}/>
          <Route exact={true} path="/player" element={<SignagePlayerController/>}/>
          <Route path="/player/:id" element={<PlaylistContent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
