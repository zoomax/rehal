import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const PasswordSchema = yup.object().shape({
  newPassword: yup.string().required(),
  oldPassword: yup.string().required(),
});
export const ContactSchema = yup.object().shape({
  email: yup.string().email(),
  phone: yup
    .string()
    .matches(
      /^\s*|01[0-2]\d{8}$/,
      "phone must match this format: 01(0,1,2)00000000",
    ),
  name: yup.string(),
});
export const CitySchema = yup.object().shape({
  postalCode: yup
    .string()
    .matches(/^[0-9]{5}$/, "postal code must match this format: 00000")
    .required(),
  name: yup.string().required(),
  services: yup.array(yup.string().required()),
});

export const PlaceSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  city: yup.number().required(),
  service: yup.number().required(),
  lat: yup
    .string()
    .required()
    .matches(/^(-?\d+(\.\d+)?)$/, "lat must match this format: 00.000000"),
  lng: yup
    .string()
    .required()
    .matches(/^(-?\d+(\.\d+)?)$/, "lng must match this format: 00.000000"),
});
export const EditPlaceSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  service: yup.number().required(),
  lat: yup
    .string()
    .required()
    .matches(/^(-?\d+(\.\d+)?)$/, "lat must match this format: 00.000000"),
  lng: yup
    .string()
    .required()
    .matches(/^(-?\d+(\.\d+)?)$/, "lng must match this format: 00.000000"),
});

export const RemovePlaceSchema = yup.object().shape({
  city: yup.string().required(),
  place: yup.string().required(),
});
export const RemoveCitySchema = yup.object().shape({
  city: yup.string().required(),
});
export const ServiceSchema = yup.object().shape({
  name: yup.string().required(),
});
