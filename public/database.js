const firebaseConfig = {
  apiKey: "AIzaSyCjRDENGipb5A0jDBUJx57WzQXxzuNeoAY",
  authDomain: "badbank-e8069.firebaseapp.com",
  projectId: "badbank-e8069",
  storageBucket: "badbank-e8069.appspot.com",
  messagingSenderId: "1084059170839",
  appId: "1:1084059170839:web:3da216e5e8d50341f64452",
};

try {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized");
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
