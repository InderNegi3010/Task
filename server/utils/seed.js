import userModel from "../models/user.js";

const seedIfEmpty = async () => {
  const count = await userModel.countDocuments();
  if (count > 0) return;

  const initial = [
    "Rahul", "Kamal", "Sanak", "Pritesh", "Bindas",
    "Cool Boy", "Mrs. Rajput", "Mystery Billionaire", "Devil", "Ananya"
  ];

  await userModel.insertMany(initial.map((name) => ({ name })));
  console.log("✅ Seeded 10 users");
};

export default seedIfEmpty;
