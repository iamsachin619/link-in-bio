import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC1TVl-yo8BWHeWYaJntNs3zbHY6W8ROto",
  authDomain: "link-in-bio-6823e.firebaseapp.com",
  projectId: "link-in-bio-6823e",
  storageBucket: "link-in-bio-6823e.appspot.com",
  messagingSenderId: "202147021959",
  appId: "1:202147021959:web:497b047ff2294784322422",
  measurementId: "G-BTCQ33XNDF"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const CreateProfile = async (userData, additionalData) => {
  if (!userData) return;
  const userref = firestore.doc(`users/${userData.uid}`);
  const snapshot = await userref.get();
  console.log(snapshot.exists);
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = userData;
    const createdAt = new Date();
    try {
      await userref.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
};

export const signOutWithGoogle = () => {
  auth.signOut().then(
    function () {
      console.log("Signed Out");
    },
    function (error) {
      console.error("Sign Out Error", error);
    }
  );
};

export const GetLinks = async (userUid, additionalData) => {
  var arr = [];

  const dataref = firestore.doc(`users/${userUid}`).collection("linkss");
  const dataSnap = await dataref.get();
  dataSnap.forEach(function (doc) {
    arr.push(doc.data());
  });

  return arr;
};
export const GetUserData = async (userUid) => {
  const dataref = firestore.doc(`users/${userUid}`);
  const dataSnap = await dataref.get();
  if (dataSnap.exists) {
    const data = dataSnap.data();

    return data;
  } else {
    console.log("dasd");
    return "error";
  }
};

export const SetLinks = async (userUid, text, link) => {
  const dataref = firestore.doc(`users/${userUid}`).collection("linkss").add({
    link: link,
    text: text
  });
};

export const DelLink = async (userUid, link) => {
  const dataref = firestore.doc(`users/${userUid}`).collection("linkss");
  const dataSnap = await dataref.get();
  dataSnap.forEach(function (doc) {
    if (doc.data().link === link) {
      doc.ref.delete();
    }
  });
  return true;
};

export const SetStyles = async (userUid, primaryColor, bgColor, dnColor) => {
  const dataref = firestore
    .doc(`users/${userUid}`)
    .collection("styles")
    .doc("1");
  await dataref.set({
    primaryColor,
    bgColor,
    dnColor
  });
};

export const GetStyles = async (userUid) => {
  const dataref = firestore
    .doc(`users/${userUid}`)
    .collection("styles")
    .doc("1");
  const dataSnap = await dataref.get();
  if (dataSnap.exists) {
    const data = dataSnap.data();
    return data;
  } else {
    //defaults
    const data = { primaryColor: "#00ff00", bgColor: "#ffffff" };
    return data;
  }
};

export default firebase;
