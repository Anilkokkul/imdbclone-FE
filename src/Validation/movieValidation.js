import * as Yup from "yup";
const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

const maxFileSize = 102400;

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}
const currentYear = new Date().getFullYear();

export const movieValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  yearOfRelease: Yup.string()
    .required("Year of Release is required")
    .min(4, `Invalid year format (Example: ${currentYear + 4})`)
    .max(4, `Invalid year format (Example: ${currentYear + 4})`),
  genre: Yup.string().required("Genre is required"),
  plot: Yup.string().required("Plot is required"),
  actors: Yup.array().required("Actors is required"),
  // producer: Yup.string().required("Producer is required"),
  //   poster: Yup.mixed().required("Poster is required"),
});
