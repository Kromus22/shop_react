import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { ProductPage } from './components/ProductPage/ProductPage';
import { Cart } from './components/Cart/Cart';
import { AdminPage } from './components/Admin/AdminPage/AdminPage';
import { AdminChangeItem } from './components/Admin/AdminChangeItem/AdminChangeItem';
import { AdminCreateItem } from './components/Admin/AdminCreateItem/AdminCreateItem';


function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/admin-page' element={<AdminPage />} />
          <Route path='/admin-page/edit-product/:id' element={<AdminChangeItem />} />
          <Route path='/admin-page-create' element={<AdminCreateItem />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
