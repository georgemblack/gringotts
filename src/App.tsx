import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Add from "./views/Add";
import Import from "./views/Import";
import Review from "./views/Review";
import Rules from "./views/Rules";
import Sync from "./views/Sync";
import Transactions from "./views/Transactions";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4">
        <Link to="/">Import</Link>
        <Link to="/add">Add</Link>
        <Link to="/sync">Sync</Link>
        <Link to="/review">Review</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/rules">Rules</Link>
      </nav>
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Import />} />
          <Route path="/add" element={<Add />} />
          <Route path="/sync" element={<Sync />} />
          <Route path="/review" element={<Review />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
