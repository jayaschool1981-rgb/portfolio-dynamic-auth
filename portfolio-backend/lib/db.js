const mongoose = require('mongoose');

let isConnected = false;

async function connect(uri) {
  if (isConnected) return;
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
  console.log('✅ MongoDB connected');
}

module.exports = { connect };
