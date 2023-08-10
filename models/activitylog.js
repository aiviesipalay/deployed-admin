const mongoose = require('mongoose');
const User = require('../models/user'); // Import your User model


const activitySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

// Function to clear activity log within a time span
const clearActivityLog = async (timeSpanInDays) => {
  try {
    const currentDate = new Date();
    const cutoffDate = new Date(currentDate.getTime() - timeSpanInDays * 24 * 60 * 60 * 1000);

    const result = await Activity.deleteMany({ timestamp: { $lt: cutoffDate } });

    console.log(`Cleared ${result.deletedCount} activities older than ${timeSpanInDays} days.`);
  } catch (error) {
    console.error('Error clearing activity log:', error);
  }
};

module.exports = Activity;
