import feeService from "../service/fee.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createFee = async (req, res, next) => {
  try {
    const fee = await feeService.createFee(req.body, req.token.id);
    return res.status(201).json(new ApiResponse(201, fee, "Fee recorded successfully"));
  } catch (error) {
    next(error);
  }
};

const getAllFees = async (req, res, next) => {
  try {
    const fees = await feeService.getAllFees();
    return res.status(200).json(new ApiResponse(200, fees, "Fees fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const getMyFees = async (req, res, next) => {
  try {
    const fees = await feeService.getMyFees(req.token.id);
    return res.status(200).json(new ApiResponse(200, fees, "Fees fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const getFeeById = async (req, res, next) => {
  try {
    const fee = await feeService.getFeeById(req.params.id);
    return res.status(200).json(new ApiResponse(200, fee, "Fee fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const updateFee = async (req, res, next) => {
  try {
    const fee = await feeService.updateFee(req.params.id, req.body);
    return res.status(200).json(new ApiResponse(200, fee, "Fee updated successfully"));
  } catch (error) {
    next(error);
  }
};

const deleteFee = async (req, res, next) => {
  try {
    const result = await feeService.deleteFee(req.params.id);
    return res.status(200).json(new ApiResponse(200, null, result.message));
  } catch (error) {
    next(error);
  }
};

export default { createFee, getAllFees, getMyFees, getFeeById, updateFee, deleteFee };
