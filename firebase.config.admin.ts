import admin, { ServiceAccount } from "firebase-admin";
import serviceAccountKey from "./serviceAccountKey.json";

const serviceAccount: ServiceAccount = serviceAccountKey as ServiceAccount;

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://chessapp-377918.appspot.com",
  });
} catch (e) {}

export const storage = admin.storage();
