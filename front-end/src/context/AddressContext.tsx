import { createContext } from 'react';
import { IAddressContextType } from '../interface/IAddressContextType';

export const AddressContext = createContext<IAddressContextType>({
    addresses: [],
    addAddress: () => {},
  });