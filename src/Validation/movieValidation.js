import * as Yup from "yup";

const currentYear = new Date().getFullYear();

export const movieValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  yearOfRelease: Yup.string()
    .required("Year of Release is required")
    .min(4, `Invalid year format (Example: ${currentYear + 4})`)
    .max(4, `Invalid year format (Example: ${currentYear + 4})`),
  genre: Yup.mixed().required("Genre is required"),
  plot: Yup.string().required("Plot is required"),
  actors: Yup.array().required("Actors is required"),
  // producer: Yup.required("Producer is required"),
  //   poster: Yup.mixed().required("Poster is required"),
});
