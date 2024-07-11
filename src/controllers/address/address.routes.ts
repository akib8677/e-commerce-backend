import { createAddress, deleteAddress, getAddressById, getAllAddress, Router, updateAddress } from "./address";

const addressRouter = Router();

addressRouter.post('/api/address', createAddress);
addressRouter.get('/api/address', getAllAddress);
addressRouter.get('/api/address/:id', getAddressById);
addressRouter.put('/api/address/:id', updateAddress);
addressRouter.delete('/api/address/:id', deleteAddress);

export default addressRouter;