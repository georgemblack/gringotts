import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Import from "./views/Import";
import Review from "./views/Review";
import Transactions from "./views/Transactions";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4">
        <Link to="/">Import</Link>
        <Link to="/review">Review</Link>
        <Link to="/transactions">Transactions</Link>
      </nav>
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Import />} />
          <Route path="/review" element={<Review />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
