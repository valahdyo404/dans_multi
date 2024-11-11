import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/templates/Layout';
import LoginPage from './pages/LoginPage';
import JobListPage from './pages/JobListPage';
import JobDetailPage from './pages/JobDetailPage';
import { selectAuthToken, setToken } from './config/slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const authToken = useSelector(selectAuthToken);
  const localToken = localStorage.getItem('token');
  
  if (!authToken && !localToken) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const PublicRoute = ({ children }) => {
  const authToken = useSelector(selectAuthToken);
  const localToken = localStorage.getItem('token');
  
  if (authToken || localToken) {
    return <Navigate to="/jobs" />;
  }
  
  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken && !authToken) {
      dispatch(setToken(localToken));
    }
  }, [dispatch, authToken]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />

          <Route 
            path="/jobs" 
            element={
              <ProtectedRoute>
                <JobListPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/jobs/:id" 
            element={
              <ProtectedRoute>
                <JobDetailPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="*" 
            element={
              <Navigate to={authToken ? "/jobs" : "/"} />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;