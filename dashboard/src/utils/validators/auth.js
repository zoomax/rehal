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

export const PlaceSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  city: yup.number().required(),
  service: yup.number().required(),
  rating: yup.number().min(1).max(5).required(),
  lat: yup
    .string()
    .required()
    .matches(/^(-?\d+(\.\d+)?)$/),
  lng: yup
    .string()
    .required()
    .matches(/^(-?\d+(\.\d+)?)$/),
});
export const EditPlaceSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  service: yup.number().required(),
  rating: yup.number().min(1).max(5).required(),
  lat: yup
    .string()
    .required()
    .matches(/^(-?\d+(\.\d+)?)$/),
  lng: yup
    .string()
    .required()
    .matches(/^(-?\d+(\.\d+)?)$/),
});

export const RemovePlaceSchema = yup.object().shape({
  city: yup.string().required(),
  place: yup.string().required(),
});
