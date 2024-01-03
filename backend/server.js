const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./Database");
const EducationModel = require("./EducationModel");


connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint pour récupérer toutes les éducations
app.get("/educations", async (req, res) => {
  try {
    const educations = await EducationModel.find();
    res.json(educations);
  } catch (error) {
    console.error("Error fetching education data:", error.message);
    res.status(500).send("Server error while fetching education data");
  }
});

// Endpoint pour ajouter une éducation

// Endpoint pour ajouter une éducation
app.post("/educations", async (req, res) => {
  try {
    console.log("Received education data:", req.body);
    const newEducationData = new EducationModel({
      gender: req.body.gender, // Assurez-vous que gender est une chaîne
      'race/ethnicity': req.body['race/ethnicity'],
      'parental level of education': req.body['parental level of education'],
      lunch: req.body.lunch,
      'test preparation course': req.body['test preparation course'],
      'math score': req.body['math score'],
      'reading score': req.body['reading score'],
      'writing score': req.body['writing score'],
    });

    await newEducationData.save();
    res.json(newEducationData);
  } catch (error) {
    console.error("Error adding education data:", error.message);
    res.status(500).send("Server error while adding education data");
  }
});


// Endpoint pour supprimer une éducation
app.delete("/educations/:id", async (req, res) => {
  try {
    const educationId = req.params.id;
    await EducationModel.findByIdAndDelete(educationId);
    res.json({ message: "Education data deleted successfully" });
  } catch (error) {
    console.error("Error deleting education data:", error.message);
    res.status(500).send("Server error while deleting education data");
  }
});



const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});






// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const connectDB = require("./Database");
// const EducationModel = require("./EducationModel"); // Correction du nom du modèle

// connectDB(); // Connectez-vous à la base de données

// const app = express();
// app.use(express.json());

// // Activez CORS
// app.use(cors());

// // Endpoint pour tester le serveur
// app.get("/readfromserver", (req, res) => {
//   res.json({ message: "Hey man from server" });
// });

// // Endpoint pour enregistrer des données dans la base de données
// app.post("/writetodatabase", async (req, res) => {
//   try {
//     const {
//       gender,
//       raceEthnicity,
//       parentalLevelOfEducation,
//       lunch,
//       testPreparationCourse,
//       mathScore,
//       readingScore,
//       writingScore,
//     } = req.body;

//     // Utilisez directement les champs requis dans votre logique de sauvegarde
//     const newEducationData = new EducationModel({
//       gender,
//       raceEthnicity,
//       parentalLevelOfEducation,
//       lunch,
//       testPreparationCourse,
//       mathScore,
//       readingScore,
//       writingScore,
//     });

//     await newEducationData.save();
//     res.json({ message: "Data saved successfully" });
//   } catch (error) {
//     console.error("Error saving data:", error.message);
//     res.status(500).send("Server error while saving data");
//   }
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on PORT: ${PORT}`);
// });

/*
OPTIONAL: FOR DEPLOYMENT
//import path package
const path = require('path');
// Serve static files from the React app by using path package
app.use(express.static(path.join(__dirname, 'client/build')));
// Handle any requests that don't match the above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
//on client CMD, "npm build"
//also remove "build" entry from client .gitignore
//also you'll need to enter .env connection string as an environment variable in your platform
//also make sure you are using relative paths in your react components for server.js routes
*/



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`server is running on PORT: ${PORT}`);
// })

/*
OPTIONAL: FOR DEPLOYMENT
//import path package
const path = require('path');
// Serve static files from the React app by using path package
app.use(express.static(path.join(__dirname, 'client/build')));
// Handle any requests that don't match the above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
//on client CMD, "npm build"
//also remove "build" entry from client .gitignore
//also you'll need to enter .env connection string as an environment variable in your platform
//also make sure you are using relative paths in your react components for server.js routes
*/