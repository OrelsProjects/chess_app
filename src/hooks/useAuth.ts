import { useDispatch, useSelector } from "react-redux";
import {
  selectAuth,
  setError,
  setUser as setUserAction,
} from "../lib/features/auth/authSlice";
import { auth } from "../../firebase.config";
import {
  User as FirebaseUser,
  UserCredential,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import User from "../models/user";
import axios from "axios";

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(selectAuth);

  const firebaseUserToUser = (user?: FirebaseUser | null): User | null =>
    user
      ? {
          userId: user.uid,
          email: user.email || "",
          token: user.refreshToken || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          role: "user",
        }
      : null;

  const setUser = async (firebaseUser: FirebaseUser | null) => {
    const user = firebaseUserToUser(firebaseUser);
    const userFromDB = await axios.post<User>("api/user/confirm", {
      user: user,
    });
    dispatch(setUserAction(userFromDB.data));
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredentials: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setUser(userCredentials.user);
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await setUser(result.user);
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const logout = async () => {
    await signOut(auth);
    dispatch(setUserAction(null));
  };

  return {
    user,
    loading,
    error,
    login,
    loginWithGoogle,
    logout,
    firebaseUserToUser,
  };
}
