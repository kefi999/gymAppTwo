const mongoose = require("mongoose");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
//good to clean some textual imput( not really usuable here for now.);
// const { JSDOM } = require("jsdom");
// const { marked } = require("marked");
// const dompurify = createDomPurify(new JSDOM().window);
const mongooseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

mongooseSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name + this.lastName, {
      lower: true,
      strict: true,
    });
  }

  // if(this.info){
  //   this.sanitizedHtml = dompurify.sanitize(marked(this.info))
  // }

  next();
});

module.exports = mongoose.model("gymMembers", mongooseSchema);
