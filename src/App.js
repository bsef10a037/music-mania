import React, { Fragment, useState, useContext } from  'react';
import Card from './components/UI/Card';
import SignIn from './components/auth/SignIn';
import ForgotPassword from './components/auth/ForgotPassword';
import SignUp from './components/auth/SignUp';
import Main from './components/main/Main';
import Listen from './components/main/Listen';
import Playlist from './components/main/Playlist';
import Genres from './components/main/Genres';
import Profile from './components/main/Profile';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthContext from './store/auth-context';
import { AudioListContextProvider } from './store/audioList-context';

function App() {
  const ctxUser = useContext(AuthContext);
  const navigateToRoot = <Navigate to='/' />;
  const authRoutes = 
  <Fragment>
    <Route path='/signin' element={navigateToRoot} />
    <Route path='/signup' element={navigateToRoot} />
    <Route path='/listen' element={<Card headerClasses="bg-black lter"><Listen/></Card>} />
    <Route path='/profile' element={<Card headerClasses="bg-white-only"><Profile/></Card>} />
    <Route path='/playlist' element={<Card headerClasses="bg-white-only"><Playlist/></Card>} />
    <Route path='/genres' element={<Card headerClasses="bg-white-only"><Genres/></Card>} />
    <Route path='*' element={<div>404 not found</div>} />
  </Fragment>;

  return (
    <AudioListContextProvider>
      <Routes>
        <Route path='/' element={ctxUser.email === '' ? <SignIn/> : <Card headerClasses="bg-white-only"><Main/></Card>} />
        { ctxUser.email === '' && 
          <Fragment>
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/forgot' element={<ForgotPassword/>} />
            <Route path='*' element={<SignIn/>} />
          </Fragment>
        }
        { ctxUser.email !== '' && authRoutes }
      </Routes>
    </AudioListContextProvider>  
  );
}

export default App;
