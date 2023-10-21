import { dbImage } from "../database/TableClasses";

export const UriToByteArray = async <Uint8Array>(uri: string) => {
  // Fetch the image as a Blob
  const response = await fetch(uri);
  const blob = await response.blob();

  // Convert the Blob to a Uint8Array (byte array)
  const arrayBuffer = await new Response(blob).arrayBuffer();
  const byteArray = new Uint8Array(arrayBuffer);
  return byteArray;
};

export const UriToBase64 = async (uri: string) => {
  // Fetch the image as a Blob
  const response = await fetch(uri);
  const blob = await response.blob();

  // Convert the Blob to a base64-encoded string
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("Unable to convert the URI to base64.");
      }
    };
    reader.readAsDataURL(blob);
  });
};

export const dbImageToBase64 = async <String>(image: dbImage) => {
  const Data = image.Data.value;
  const Filetype = image.Filetype.value;
  // Create a data URI with the base64 data and the specified file type
  return `data:image/${Filetype};base64,${Data}`;
};
