import React, { ReactNode, useState } from "react";
import IAddressEdit from "../interface/IAddressEdit";
import { AddressContext } from "./AddressContext";

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<IAddressEdit[]>([]);

  const addAddress = (address: IAddressEdit) => {
    setAddresses((prevAddresses) => [...prevAddresses, address]);
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress }}>
      {children}
    </AddressContext.Provider>
  );
};