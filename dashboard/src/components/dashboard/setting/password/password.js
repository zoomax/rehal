import React, { useState } from "react";
import contactIcon from "../../../../assets/images/c.svg";
import loader from "../../../../assets/images/loader.gif";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordSchema } from "../../../../utils/validators/auth";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import { postRequest } from "../../../../utils/http";
import { BASE_URL } from "../../../../utils/endpoints";
import { toast } from "react-toastify";
export const Password = () => {
  const [user] = useState(getObjFromLocalStorage("user"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(PasswordSchema),
  });

  function onSubmit(data) {
    setIsSubmitting(true);
    postRequest(`${BASE_URL}users/changePassword`, data, {
      headers: {
        "auth-token": user.token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setIsSubmitting(false);
        reset();
        toast.success("Your password has been updated successfully");
      })
      .catch((e) => {
        setIsSubmitting(false);
        toast.error(e.response);
      });
  }
  return (
    <div className='contact'>
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-md-10 col-12 row'>
              <div className='col-md-6 col-12'>
                <div className='col-12 row'>
                  <i className='fa fa-lock'></i>
                  <div className='form-group'>
                    <div className='row'>
                      <label>Old Password</label>
                      <i className='fa fa-pencil'></i>
                    </div>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='************'
                      {...register("oldPassword")}
                    />
                    {errors.oldPassword && (
                      <p className='text-danger'>
                        {errors.oldPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className='col-12 row'>
                  <i className='fa fa-lock'></i>
                  <div className='form-group'>
                    <div className='row'>
                      <label>New Password</label>
                      <i className='fa fa-pencil'></i>
                    </div>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='************'
                      {...register("newPassword")}
                    />
                    {errors.newPassword && (
                      <p className='text-danger'>
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* *************************************************************** */}
              {/* <div className='col-md-6 col-12'> */}
            </div>
            <div className='col-md-2 col-2'>
              <div className='contact-icon '>
                <button type='submit' disabled={isSubmitting} className='none'>
                  <img
                    src={isSubmitting ? loader : contactIcon}
                    alt='contact'
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
