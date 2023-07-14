const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");

router.get("/vs", (req, res) => {
  UserModel.find()
    .then((users) => {
      // console.log(users);
      res.send(users); // The array of retrieved users
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/income-car", (req, res) => {
  UserModel.find({
    $or: [{ car: "BMW" }, { car: "Mercedes" }],
    income: { $lt: "$5" },
  })
    .then((users) => res.json(users))

    .catch((err) => res.json(err));
});

router.get("/male-phone", (req, res) => {
  UserModel.find({
    gender: "Male",
    $expr: { $gt: [{ $toInt: "$phone_price" }, 10000] },
  })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/last-name-quote-email", (req, res) => {
  UserModel.find({
    last_name: { $regex: /^M/i },
    email: { $regex: /M/i },
    $expr: { $gt: [{ $strLenCP: "$quote" }, 15] },
  })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/car-email", (req, res) => {
  UserModel.find({
    car: { $in: ["BMW", "Mercedes", "Audi"] },
    email: { $not: /\d/ },
  })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/top-cities", async (req, res) => {
  try {
    const cities = await UserModel.aggregate([
      {
        $group: {
          _id: "$city",
          userCount: { $sum: 1 },
          totalIncome: {
            $sum: {
              $toDouble: {
                $substr: ["$income", 1, { $strLenBytes: "$income" }],
              },
            },
          },
        },
      },
      {
        $project: {
          city: "$_id",
          userCount: 1,
          averageIncome: {
            $round: [
              { $divide: ["$totalIncome", "$userCount"] },
              4, // Set the desired decimal precision here
            ],
          },
          _id: 0,
        },
      },
      {
        $sort: { userCount: -1, averageIncome: -1 }, // Sort by averageIncome in descending order
      },
      {
        $limit: 10,
      },
    ]);

    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
