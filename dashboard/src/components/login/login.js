import React, { useState } from "react";
import { Layout } from "../layout/layout";
import { Button } from "../elements/button/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./login.css";
import { LoginSchema } from "../../utils/validators/auth";
import { postRequest } from "../../utils/http";
import { useHistory } from "react-router";
import {
  getObjFromLocalStorage,
  setObjToLocalStorage,
} from "../../utils/localStorage";
import { BASE_URL, LOGIN } from "../../utils/endpoints";
export const Login = () => {
  const [user, setUser] = useState(getObjFromLocalStorage("user"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  if (user) history.push("/dashboard");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  console.log(errors);
  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitting(true);
    postRequest(`${BASE_URL}${LOGIN}`, data)
      .then((res) => {
        setObjToLocalStorage("user", JSON.stringify(res.data));
        reset();
        history.push("/dashboard");
      })
      .catch((e) => console.log(e));
  };
  return (
    <Layout>
      <div className='login text-center'>
        <h1>
          Welcome<span>Admin</span>{" "}
        </h1>
        <p>Sign In</p>
        <form onSubmit={handleSubmit(onSubmit)} className='form-group'>
          <input
            className='form-control'
            type='email'
            placeholder='example@mail.com'
            {...register("email")}
          />
          {errors.email && (
            <p className='text-danger'>{errors.email.message}</p>
          )}
          <input
            className='form-control'
            type='password'
            placeholder='*********'
            {...register("password")}
          />
          {errors.password && (
            <p className='text-danger'>{errors.password.message}</p>
          )}
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Loading ..." : "Login"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};
