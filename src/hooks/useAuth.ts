import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setError, setUser } from "../lib/features/auth/authSlice";
import { auth } from "../../firebase.config";
import {
  User as FirebaseUser,
  UserCredential,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import User from "../models/User";

const firebaseUserToUser = (user: FirebaseUser): User => ({
  userId: user.uid,
  email: user.email || "",
  token: user.refreshToken || "",
  displayName: user.displayName || "",
  profilePictureUrl: user.photoURL || "",
});

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(selectAuth);

  const login = async (email: string, password: string) => {
    try {
      const userCredentials: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser(firebaseUserToUser(userCredentials.user)));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser(firebaseUserToUser(result.user)));
    } catch (error: any) {
      debugger;
      dispatch(setError(error.message));
    }
  };

  const logout = async () => {
    await signOut(auth);
    dispatch(setUser(null));
  };

  return { user, loading, error, login, loginWithGoogle, logout };
}
