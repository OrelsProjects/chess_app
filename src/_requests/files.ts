import "../../firebase.config.admin";
import slugify from "slugify";
import admin from "firebase-admin";

// Assuming admin is already initialized elsewhere if this file isn't the first entry
export const storage = admin.storage();

const eventImageBucketName = "event-images"; // Your bucket name

export const uploadEventImage = async (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    // file to blob
    const blob = new Blob([file], { type: file.type });
    // blob to Buffer object
    const buffer = Buffer.from(await blob.arrayBuffer());
    const fileName = slugify(file.name, { lower: true });
    const bucket = storage.bucket();

    // Create a file reference
    const fileRef = bucket.file(`${eventImageBucketName}/${fileName}`);

    // Upload the file
    try {
      await fileRef.save(buffer); // Assuming 'file' is a Buffer
      // After upload, generate a signed URL for public access (if the file should be publicly accessible)
      const signedUrls = await fileRef.getSignedUrl({
        action: "read",
        expires: "03-09-2491", // Use an appropriate expiry date
      });
      resolve(signedUrls[0]); // Resolve with the URL
    } catch (err) {
      reject(err);
    }
  });
};
