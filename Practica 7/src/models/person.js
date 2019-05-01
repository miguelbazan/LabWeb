const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  born: {
    type: Number,
    required: true
  },
  timeline: {
    type: String,
    required: true
  },
  alliegance: [
    {
      type: String
    }
  ],
  playedBy: {
    type: String,
    required: true
  },
  titles: [
    {
      type: String
    }
  ],
  father: {
    type: String
  },
  mother: {
    type: String
  },
  spouse: {
    type: String
  }
});

module.exports = Person;
