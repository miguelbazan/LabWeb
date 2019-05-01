const express = require("express");

require("./db/mongoose");
const Person = require("./models/person");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/persons", function(req, res) {
  const person = new Person(req.body);
  person
    .save()
    .then(function() {
      return res.send(person);
    })
    .catch(function(error) {
      return res.status(400).send(error);
    });
});

app.get("/persons", function(req, res) {
    Person.find({})
        .then(function(persons){
            res.send(persons);
        }).catch(function(error){
            res.status(500).send(error);
        })
});

app.get("/persons/:id", function(req, res) {
  const _id = req.params.id;
  Person.findById(_id)
    .then(function(person) {
      if (!person) {
        return res.sendStatus(404);
      }
      return res.send(person);
    })
    .catch(function(error) {
      return res.status(500).send(error);
    });
});

app.patch("/persons/:id", function(req, res) {
  const _id = req.params.id;
  const params = {
    name: req.body.name,
    father: req.body.father,
    mother: req.body.mother
  };

  Person.findByIdAndUpdate(_id, params, function(err, person) {
    if (!person) {
      return res.sendStatus(404);
    }

    if (err) {
      return res.status(500).send(err);
    }

    return res.sendStatus(204);
  });
});

app.delete("/persons/:id", function(req, res) {
  const _id = req.params.id;

  Person.findByIdAndDelete(_id, function(err, person) {
    if (!person) {
      return res.sendStatus(404);
    }

    if (err) {
      return res.status(500).send(err);
    }

    return res.sendStatus(204);
  });
});

app.listen(port, function() {
  console.log("Server up and running on port " + port);
});
