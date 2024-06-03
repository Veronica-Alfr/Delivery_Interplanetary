import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AddressProvider } from './context/useContext';
import AddressRegistreOrEdit from "./pages/AddressRegisterOrEdit";
import ListAddress from "./pages/ListAddress";

const App: React.FC = () => {
  return (
    <AddressProvider>
      <Router>
        <Routes>
          <Route path="/address/register" element={<AddressRegistreOrEdit />} />
          <Route path="/address/edit/:id" element={<AddressRegistreOrEdit />} />
          <Route path="/address/list" element={<ListAddress />} />
        </Routes>
      </Router>
    </AddressProvider>
  );
};

export default App;
