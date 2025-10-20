const { connect } = require('../lib/db');

module.exports = async function (req, res) {
  try {
    console.log('🔍 MongoDB URI:', process.env.MONGODB_URI); // debug line
    await connect(process.env.MONGODB_URI);
    res.status(200).json({ message: '✅ MongoDB connection successful!' });
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    res.status(500).json({
      message: '❌ Connection failed',
      error: err.message,
      stack: err.stack,
    });
  }
};
