import admin, { ServiceAccount } from "firebase-admin";
import serviceAccountKey from "./serviceAccountKey.json";

const serviceAccount: ServiceAccount = serviceAccountKey as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://chessapp-377918.appspot.com",
});

export const storage = admin.storage();
