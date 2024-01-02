import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Add from "./views/Add";
import Import from "./views/Import";
import Review from "./views/Review";
import Rules from "./views/Rules";
import Summary from "./views/Summary";
import Sync from "./views/Sync";
import Transactions from "./views/Transactions";

// TODO: Add page for summary view
// TODO: Auto-review some transactions based on rules (i.e. Apple Cash deposits)
// TODO: Add eslint
// TODO: Add prettier rule to sort tailwind classes
// TODO: Add standard GitHub Actions workflows

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className="flex gap-4 standard-width">
          <Link to="/">Import</Link>
          <Link to="/add">Add</Link>
          <Link to="/review">Review</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/summary">Summary</Link>
          <Link to="/rules">Rules</Link>
          <Link to="/sync">Sync</Link>
        </nav>
      </header>
      <body>
        <Routes>
          <Route path="/" element={<Import />} />
          <Route path="/add" element={<Add />} />
          <Route path="/review" element={<Review />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/sync" element={<Sync />} />
        </Routes>
      </body>
    </BrowserRouter>
  );
}

export default App;
