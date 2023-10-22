import { dbImage } from "../database/TableClasses";

export const dbImageToBase64 = async <String>(image: dbImage) => {
  const Data = image.Data.value;
  const Filetype = image.Filetype.value;
  // Create a data URI with the base64 data and the specified file type
  return `data:image/${Filetype};base64,${Data}`;
};
