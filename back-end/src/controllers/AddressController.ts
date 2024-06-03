import { Request, Response } from 'express';
import AddressService from '../services/AddressService';

export default class AddressController {
    constructor(private addressService: AddressService) {}

    public async registerAddress(req: Request, res: Response): Promise<Response> {
        try {
            const addressRegister = await this.addressService.registerAddress(req.body);
            return res.status(201).json({ addressRegister });
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'BadRequest') {
                    const err = new Error('Invalid Request Error');
                    err.name = 'BadRequest';
                    throw err;
                }
            }
            return res.status(500).json({ error: 'Error Registering Address' });
        }
    }

    public async updateAddress(req: Request, res: Response): Promise<Response> {
        try {
          const addressId = Number(req.params.id);
          const updatedAddress = await this.addressService.updateAddress(addressId, req.body);
          return res.status(200).json({ message: 'Address updated successfully', updatedAddress });
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'BadRequest') {
                    const err = new Error('Invalid Request Error');
                    err.name = 'BadRequest';
                    throw err;
                }
            }
            return res.status(500).json({ error: 'Error updating address' });
        }
      }
      
    public async getAddressById(req: Request, res: Response): Promise<Response> {
        try {
            const addressId = Number(req.params.id);
            const address = await this.addressService.getAddressById(addressId);
            return res.status(200).json({ address });
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'NotFound') {
                    const err = new Error('Address Not Found');
                    err.name = 'NotFound';
                    throw err;
                }
                else if (error.name === 'BadRequest') {
                    const err = new Error('Invalid Request Error');
                    err.name = 'BadRequest';
                    throw err;
                }
            }
            return res.status(500).json({ error: 'Error fetching address' });
        }
    }

    public async getAllAddresses(req: Request, res: Response): Promise<Response> {
        try {
            const allAddresses = await this.addressService.getAllAddresses();
            return res.status(200).json({ addresses: allAddresses });
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'BadRequest') {
                    const err = new Error('Invalid Request Error');
                    err.name = 'BadRequest';
                    throw err;
                }
            }
            return res.status(500).json({ error: 'Error fetching all addresses' });
        }
    }
}
