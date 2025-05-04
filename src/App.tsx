import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Container } from '@mui/material';
import { APP_ROUTES } from './AppRoutes';

function App() {
  return (
    <Router>
      <Container sx={{ mt: 4 }}>
        <Routes>
          {APP_ROUTES.map((route) => {
            return <Route path={route.path} element={route.elment()} />;
          })}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
