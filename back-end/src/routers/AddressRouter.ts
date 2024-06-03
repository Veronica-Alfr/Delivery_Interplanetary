import { Router } from 'express';
import AddressController from '../controllers/AddressController';
import AddressService from '../services/AddressService';

const addressRouter = Router();
const addressService = new AddressService();
const addressController = new AddressController(addressService);

addressRouter.post('/register', (req, res) => addressController.registerAddress(req, res));
addressRouter.put('/edit', (req, res) => addressController.updateAddress(req, res));
addressRouter.get('/:id', (req, res) => addressController.getAddressById(req, res));
addressRouter.get('/', (req, res) => addressController.getAllAddresses(req, res));

export default addressRouter;
