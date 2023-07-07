import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase.config";
import { FirebaseError } from "firebase/app";

export const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log({ error });
  }
};

type SignUpRequest = {
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  password: string | undefined;
};
export const signUp = async ({ name, email, phoneNumber, password }: SignUpRequest) => {
  if (name && email && password) {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      await updateProfile(user, {
        displayName: name,
      });

      return {
        user,
      };
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
      }
    }
  }
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  await auth.signOut();
};

export const getCurrentUser = () => {
  const user = auth.currentUser;
  return user;
};
