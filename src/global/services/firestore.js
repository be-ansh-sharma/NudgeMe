import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

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
    updateDocument('users', user.uid, obj);
  } else {
    await firestore().collection('users').doc(user.uid).set(obj);
  }
};

export const updateDocument = async (collectionName, docID, data) => {
  await firestore().collection(collectionName).doc(docID).update(data);
};

export const addRemindersToUser = async (col, uid, subCol, data) => {
  data.uuid = uuidv4();
  await firestore().collection(col).doc(uid).collection(subCol).add(data);
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
      //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      reminders.push(documentSnapshot.data());
    });
    return reminders;
  } catch (err) {
    console.log(err);
  }
};
