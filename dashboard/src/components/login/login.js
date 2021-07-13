import React, { useState, useEffect } from "react";
import { Layout } from "../layout/layout";
import { Button } from "../elements/button/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./login.css";
import { LoginSchema } from "../../utils/validators/auth";
import { postRequest } from "../../utils/http";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { getObjFromLocalStorage } from "../../utils/localStorage";
import { BASE_URL, LOGIN } from "../../utils/endpoints";
import { connect } from "react-redux";
import { setUser } from "../../redux-store/actions/authActions";
const Container = ({ setUser }) => {
  const [user] = useState(getObjFromLocalStorage("user"));
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
  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      toast.error(errors[key].message);
    });
  }, [errors]);
  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitting(true);
    postRequest(`${BASE_URL}${LOGIN}`, data)
      .then((res) => {
        reset();
        setUser(res.data);
        setIsSubmitting(false);
        toast.success("welcome to dashboard");
        history.push("/dashboard");
      })
      .catch((e) => {
        setIsSubmitting(false);
        toast.error(e.response.data);
      });
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
          {/* {errors.email && (
            <p className='text-danger'>{errors.email.message}</p>
          )} */}
          <input
            className='form-control'
            type='password'
            placeholder='*********'
            {...register("password")}
          />
          {/* {errors.password && (
            <p className='text-danger'>{errors.password.message}</p>
          )} */}
          <Button isSubmitting={isSubmitting}>
            {isSubmitting ? "Logging ..." : "Login"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (payload) => dispatch(setUser(payload)),
  };
};

export const Login = connect(null, mapDispatchToProps)(Container);
