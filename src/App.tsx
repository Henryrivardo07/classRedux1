import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import CartPage from './Pages/CartPage';
import styles from './Components/Styles/Navbar.module.scss';
import { DialogProvider } from './Components/DialogContent';
import { ToastProvider } from './Context/ToastContext';

const App = () => {
  return (
    <ToastProvider>
      <DialogProvider>
        <Router>
          <nav className={styles.navbar}>
            <Link to='/'>Home</Link>
            <Link to='/cart'>Cart</Link>
          </nav>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<CartPage />} />
          </Routes>
        </Router>
      </DialogProvider>
    </ToastProvider>
  );
};

export default App;
