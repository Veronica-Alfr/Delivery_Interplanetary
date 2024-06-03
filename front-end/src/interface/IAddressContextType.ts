import IAddressEdit from "./IAddressEdit";

export interface IAddressContextType {
  addresses: IAddressEdit[];
  addAddress: (address: IAddressEdit) => void;
}
