import { Address } from "../Models/Address.model.js";

export const addAddress = async (req, res) => {
  let { fullName, address, city, state, country, pincode, phoneNumber } =
    req.body;
  const userId = req.user;
  let userAddress = await Address({
    userId,
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  });
  await userAddress.save();
  res.status(200).json({ msg: "Address is Adeed", userAddress, success: true });
};
