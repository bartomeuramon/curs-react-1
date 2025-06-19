// firebase.js
import { collection, addDoc, deleteDoc, doc, onSnapshot, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "./firebase";

export const saveProjecte = async (projecte) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const projecteComplet = {
    ...projecte,
    creatPer: user ? user.uid : null
  };
  const docRef = await addDoc(collection(db, "projectes"), projecteComplet);
  return docRef.id;
};

export const deleteProjecte = async (id) => {
  await deleteDoc(doc(db, "projectes", id));
};

export const onGetProjectes = (callback) =>
  onSnapshot(collection(db, "projectes"), callback);

export const getProjecte = async (id) => {
  const docRef = doc(db, "projectes", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { ...docSnap.data(), id: docSnap.id };
  else return null;
};

export const saveDespesa = async (despesa) => {
  const docRef = await addDoc(collection(db, "despeses"), despesa);
  return docRef.id;
};

export const getDespesesPerProjecte = async (projecteId) => {
  const q = query(collection(db, "despeses"), where("projecteId", "==", projecteId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const deleteDespesa = async (id) => {
  await deleteDoc(doc(db, "despeses", id));
};

export const updateDespesa = async (id, actualitzacio) => {
  await updateDoc(doc(db, "despeses", id), actualitzacio);
};

export const registrarUsuari = async (email, password) => {
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const tancarSessio = async () => {
  const auth = getAuth();
  return await signOut(auth);
};

export const updateProjecte = async (id, actualitzacio) => {
  await updateDoc(doc(db, "projectes", id), actualitzacio);
};
