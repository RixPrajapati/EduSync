import mongoose from "mongoose";

// A single document with a fixed _id. MongoDB's unique index on _id guarantees
// only one concurrent insert can ever win this, so it's used as an atomic
// claim on "who gets to be the first-ever ADMIN" — safe even when two
// registration requests land at the exact same moment on an empty database.
const bootstrapLockSchema = new mongoose.Schema({
  _id: { type: String, default: "admin-bootstrap" },
});

export default mongoose.model("BootstrapLock", bootstrapLockSchema);
