import firestore from '@react-native-firebase/firestore';

export const saveUserToStore = async (user, update) => {
  let obj = {
    email: user.email,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
    creationTime: user.metadata.creationTime,
    lastSignInTime: user.metadata.lastSignInTime,
    uid: user.uid,
  };
  if (update) {
    updateUserDocument('users', user.uid, obj);
  } else {
    await firestore().collection('users').doc(user.uid).set(obj);
  }
};

export const updateUserDocument = async (collectionName, docID, data) => {
  await firestore().collection(collectionName).doc(docID).update(data);
};

export const updateReminderDocument = async (userId, reminderRef, data) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('reminders')
      .doc(reminderRef)
      .update(data);
  } catch (err) {
    console.log(err);
  }
};

export const addRemindersToUser = async (col, uid, subCol, data) => {
  try {
    await firestore()
      .collection(col)
      .doc(uid)
      .collection(subCol)
      .doc(data.uuid)
      .set(data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteReminderFromRemote = async (userId, uuid) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('reminders')
      .doc(uuid)
      .delete();
  } catch (err) {
    console.log(err);
  }
};

export const getRemindersForUser = async uid => {
  let reminders = [];
  try {
    const querySnapshot = await firestore()
      .collection('users')
      .doc(uid)
      .collection('reminders')
      .get();
    querySnapshot.forEach(documentSnapshot => {
      reminders.push(documentSnapshot.data());
    });
    return reminders;
  } catch (err) {
    console.log(err);
  }
};

export const updateReminder = async (col1, doc1, col2, doc2, time) => {
  var usersUpdate = {};
  usersUpdate[`upcomingReminders.${time}.notified`] = true;
  try {
    await firestore()
      .collection(col1)
      .doc(doc1)
      .collection(col2)
      .doc(doc2)
      .update(usersUpdate);
  } catch (err) {
    console.log(err);
  }
};
