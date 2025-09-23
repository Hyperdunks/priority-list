import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Signout from './components/Signout';
import TodoList from './components/TodoList';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signout" element={<Signout />} />
        <Route 
          path="/todos" 
          element={isAuthenticated() ? <TodoList /> : <Navigate to="/signin" />}
        />
        <Route path="*" element={<Navigate to="/todos" />} />
      </Routes>
    </Router>
  );
}

export default App;