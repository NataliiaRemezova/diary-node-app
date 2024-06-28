import Entry from '../data/model/entryModel.js';

const calculateStreak = (entries) => {
  if (!entries.length) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  entries.sort((a, b) => new Date(a.date) - new Date(b.date));

  for (let i = entries.length - 1; i >= 0; i--) {
    let entryDate = new Date(entries[i].date);
    entryDate.setHours(0, 0, 0, 0);

    if (entryDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (entryDate.getTime() === currentDate.getTime() - 24 * 60 * 60 * 1000) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

export const getStreak = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await Entry.find({ user: userId }).sort({ date: 1 });
    const streak = calculateStreak(entries);

    res.json({ streak });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching streak data' });
  }
};
