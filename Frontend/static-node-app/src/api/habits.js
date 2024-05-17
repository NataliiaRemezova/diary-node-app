const API_URL = 'http://localhost:5000/api/habit';

export const fetchAllHabits = async () => {
  const response = await fetch(`${API_URL}/get-all-habits`);
  return await response.json();
};

export const fetchHabit = async (id) => {
  const response = await fetch(`${API_URL}/get-habit/${id}`);
  return await response.json();
};

export const createHabit = async (habit) => {
  const response = await fetch(`${API_URL}/create-habit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habit),
  });
  return await response.json();
};

export const updateHabit = async (id, habit) => {
  const response = await fetch(`${API_URL}/update-habit/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habit),
  });
  return await response.json();
};

export const deleteHabit = async (id) => {
  const response = await fetch(`${API_URL}/delete-habit/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};
