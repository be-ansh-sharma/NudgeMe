import Database from './Database';
let dbObj = new Database();

export const saveToDatabase = async (
  id,
  occurance,
  hours,
  minutes,
  message,
) => {
  try {
    await dbObj._db.runAsync(
      'INSERT INTO nudgeme (id, occurance, hours, minutes, message, status) VALUES (?, ?, ?, ?, ?, ?)',
      id,
      occurance,
      hours,
      minutes,
      message,
      'active',
    );
    console.log('pp');
  } catch (err) {
    console.log(err);
  }
};

export const fetchActiveReminders = async () => {
  if (!dbObj._db) {
    await dbObj.init();
  }
  let allRows;
  try {
    allRows = await dbObj._db.getAllAsync(
      `SELECT * FROM nudgeme where status = 'active'`,
    );
    console.log('pop');
    console.log(allRows);
  } catch (err) {
    console.log(err);
  }

  return allRows;
};
