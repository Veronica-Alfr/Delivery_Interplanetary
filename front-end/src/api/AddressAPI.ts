import axios from 'axios';
import IAddressEdit from '../interface/IAddressEdit';

const url = 'http://localhost:3001';

const instance = axios.create({
  baseURL: url,
});

export const registerAddress = async ({ label, zipCode, city, country, state, fullName, addressLine, mobilePhone }: IAddressEdit) => {
    const { data } = await instance.post('/address/register', { label, zipCode, country, state, city, addressLine, fullName, mobilePhone });
    return data;
}

export const updateAddress = async (addressId: string, { label, zipCode, city, country, state, fullName, addressLine, mobilePhone }: IAddressEdit) => {
  const { data } = await instance.put(`/address/edit/${addressId}`, { label, zipCode, country, state, city, addressLine, fullName, mobilePhone });
  return data;
}

export const getAddressById = async (id: number) => {
  const { data } = await instance.get(`/address/${id}`);
  return data;
}

export default instance;
