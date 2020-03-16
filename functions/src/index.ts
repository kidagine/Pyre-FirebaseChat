import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

const serviceAccount = require("../secret.json")


admin.initializeApp();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pyre-d405b.firebaseapp.com"
})

exports.deleteAuthUser = functions.firestore
  .document('users/{userId}')
  .onDelete(async (snap,context) => {
    try {
      await admin.auth().deleteUser(snap.id);
      return console.log('Deleted user with ID:' + snap.id);
    }
    catch (error) {
      return console.error('There was an error while deleting user:', error);
    }
  });

// exports.deleteDocUser = functions.auth
// .user()
// .onDelete(async (snap,context) => {
//   try {
//     await admin.auth().deleteUser(snap.id);
//     return console.log('Deleted user with ID:' + snap.id);
//   }
//   catch (error) {
//     return console.error('There was an error while deleting user:', error);
//   }
// });