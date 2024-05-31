(async () => {
    // Dynamically import mongoose
    const mongoose = await import('mongoose');
    // Import the user model using require
    const User = require('./userModel.js');
  
    // Connect to MongoDB
    mongoose.connect(
      "mongodb://localhost:27017/diary_node_app",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  
    // Set mongoose promise to global promise
    mongoose.Promise = global.Promise;
  
    // Your additional code goes here
  })();
  