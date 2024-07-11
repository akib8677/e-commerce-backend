import { Address, Request, Response, User } from "./address";

export async function createAddress(req: Request, res: Response) {
  const {
    userId,
    address_line1,
    address_line2,
    city,
    state,
    country,
    postal_code,
  } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const address = new Address({
      user: userId,
      address_line1,
      address_line2,
      city,
      state,
      country,
      postal_code,
    });
    const savedAddress = await address.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getAllAddress(req: Request, res: Response) {
  try {
    const addresses = await Address.find().populate("user");
    res.json(addresses);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get an address by ID
export async function getAddressById(req: Request, res: Response) {
  try {
    const address = await Address.findById(req.params.id).populate("user");
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json(address);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function updateAddress(req: Request, res: Response) {
  const { address_line1, address_line2, city, state, country, postal_code } = req.body;
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    address.address_line1 = address_line1 ?? address.address_line1;
    address.address_line2 = address_line2 ?? address.address_line2;
    address.city = city ?? address.city;
    address.state = state ?? address.state;
    address.country = country ?? address.country;
    address.postal_code = postal_code ?? address.postal_code;
    address.updatedAt = new Date();

    const updatedAddress = await address.save();
    res.json(updatedAddress);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteAddress(req: Request, res: Response) {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await address.remove();
    res.json({ message: 'Address deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
}
