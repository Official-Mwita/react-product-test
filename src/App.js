
import './App.css';
import LoginPage from './component/Login';
import ProductTable from './component/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Logiv2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/main" element={<ProductTable />} />
      </Routes>
    </Router>
  );
}

export default App;
