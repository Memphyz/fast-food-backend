const {default: mongoose, Schema} = require("mongoose");

const schema = (name, model, unique = '_id') => {
  return mongoose.model(
    name,
    new Schema(model, {versionKey: false})
      .index({[unique]: 1}, {unique: true})
      .set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
          delete ret._id;
        },
      })
  );
};

module.exports = schema;
