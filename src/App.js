import { Routes, Route, Navigate } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import Layout from "./components/Layout/Layout";
import {useContext} from 'react';
import {AuthContext} from './store/auth-context';

function App() {
  const authCtx=useContext(AuthContext);
  const loggedIn = authCtx.loggedIn;
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/about-us" exact element={<AboutUsPage />} />
        {!loggedIn && <Route path="/auth" element={<AuthPage />} />}
        {loggedIn && <Route path="/profile" element={<ProfilePage />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;

// <Route path="*" element={<Navigate to="/" />} />

