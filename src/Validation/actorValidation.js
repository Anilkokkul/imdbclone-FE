import * as Yup from "yup";

export const actorValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  gender: Yup.string().required("gender is required"),
  dob: Yup.string().required("Date of Birth is required"),
  bio: Yup.string().required("Bio is required"),
});
