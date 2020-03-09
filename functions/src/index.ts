import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'


admin.initializeApp();

exports.deleteUser =  functions.firestore
  .document('users/{userId}')
  .onDelete((snap,context) => {
    return admin.auth().deleteUser(snap.id)
      .then(() => console.log('Deleted user with ID:' + snap.id))
      .catch((error) => console.error('There was an error while deleting user:', error));
  });