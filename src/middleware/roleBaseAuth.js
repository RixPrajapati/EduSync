const roleBaseAuth = (role) => (req, res, next) => {
  if (req.token.role.includes(role)) return next();

  res.status(403).send("Access Denied");
};

export default roleBaseAuth;
