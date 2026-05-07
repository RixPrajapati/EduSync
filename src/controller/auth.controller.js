import authService from "../service/auth.service.js";

const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.cookie("token", token);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const register = async (req, res) => {
  try {
    const user = await authService.register(req.body, req.files);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
export default { login, register };
