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

export const dbImageToBase64 = async <String>(image: dbImage) => {
  const Data = image.Data.value;
  const Filetype = image.Filetype.value;

  // Convert binary data to base64
  const base64Data = btoa(String.fromCharCode.apply(null, Array.from(Data)));

  // Create a data URI with the base64 data and the specified file type
  return `data:image/${Filetype};base64,${base64Data}`;
};
