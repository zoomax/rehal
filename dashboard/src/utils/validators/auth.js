import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const ContactSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string(),
  phone: yup.string().matches(/^01[0-2]\s\d{1,8}$/),
  name: yup.string(),
  address: yup.string(),
});
