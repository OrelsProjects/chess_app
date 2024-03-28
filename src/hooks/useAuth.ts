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
  createUserWithEmailAndPassword,
} from "firebase/auth";
import User from "../models/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import PlayerDetails from "../models/playerDetails";

export default function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(selectAuth);

  const updateUserPlayerDetails = async (playerDetails: PlayerDetails) => {
    try {
      if (!user) {
        throw new Error("User not found");
      }
      await axios.post("api/player", playerDetails);
      dispatch(setUserAction({ ...user, playerDetails }));
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    }
  };

  const setUserData = async (user: FirebaseUser | null) => {
    if (!user) {
      dispatch(setUserAction(null));
      return;
    }
    let userFromDB: User;
    try {
      const response = await axios.post("api/user/confirm", {
        user: { ...firebaseUserToUser(user) },
      });
      userFromDB = response.data.user;
      dispatch(setUserAction(userFromDB));
      if (response.data.state === "registration_required") {
        debugger;
        router.push("/register");
        return;
      }
    } catch (error: any) {
      console.error("Error setting user data", error);
      dispatch(setUserAction(null));
    }
  };

  const firebaseUserToUser = (user?: FirebaseUser | null): User | null => {
    return user
      ? {
          userId: user.uid,
          email: user.email || "",
          token: user.refreshToken || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          role: "user",
        }
      : null;
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredentials: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setUserData(userCredentials.user);
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await setUserData(result.user);
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredentials: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      await setUserData(userCredentials.user);
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
    logout,
    register,
    loginWithGoogle,
    setUserData,
    updateUserPlayerDetails,
  };
}
