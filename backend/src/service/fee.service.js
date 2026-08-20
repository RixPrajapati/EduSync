import Fee from "../models/Fee.js";
import { ApiError } from "../utils/ApiError.js";

const createFee = async (data, recordedBy) => {
  if (!data.userId || !data.amount) {
    throw new ApiError(400, "userId and amount are required");
  }

  return await Fee.create({
    userId: data.userId,
    type: data.type ?? "Student",
    amount: data.amount,
    status: data.status ?? "Paid",
    paidAt: data.paidAt ?? Date.now(),
    recordedBy,
  });
};

const getAllFees = async () => {
  return await Fee.find()
    .populate("userId", "userName email")
    .sort({ paidAt: -1 });
};

const getMyFees = async (userId) => {
  return await Fee.find({ userId })
    .populate("userId", "userName email")
    .sort({ paidAt: -1 });
};

const getFeeById = async (id) => {
  const fee = await Fee.findById(id).populate("userId", "userName email");
  if (!fee) throw new ApiError(404, "Fee record not found");
  return fee;
};

const updateFee = async (id, data) => {
  const fee = await Fee.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .populate("userId", "userName email");
  if (!fee) throw new ApiError(404, "Fee record not found");
  return fee;
};

const deleteFee = async (id) => {
  const fee = await Fee.findByIdAndDelete(id);
  if (!fee) throw new ApiError(404, "Fee record not found");
  return { message: "Fee record deleted successfully" };
};

export default { createFee, getAllFees, getMyFees, getFeeById, updateFee, deleteFee };
