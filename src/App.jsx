import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Product from "./pages/product";
import Header from "./components/header";
import Test from "./pages/Test";


const App = () => {
  return (
    <div>
      <Router>
          <Header />

        <Routes>

          <Route  path="/" element={ <Product /> } />
          <Route  path="/test" element={ <Test /> } />

        </Routes>

      </Router>
    </div>
  );
};

export default App;
