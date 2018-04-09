const keystone = require("keystone");

const User = new keystone.List("User");

User.add({
  displayName: {
    type: String
  },
  email: {
    type: keystone.Field.Types.Email,
    unique: true
  },
  password: {
    type: keystone.Field.Types.Password
  }
});

User.schema.virtual("canAccessKeystone").get(() => {
  return true;
});

User.defaultColumns = "id, displayName, email";

User.register();
