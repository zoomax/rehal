import React, { useEffect, useState } from "react";
import contactIcon from "../../../../assets/images/c.svg";
import "./contact.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactSchema } from "../../../../utils/validators/auth";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
export const Contact = () => {
  const [user, setUser] = useState(getObjFromLocalStorage("user").user);
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(ContactSchema),
  });
  const keys = ["name", "email"];
  function fillForm(keys, obj) {
    keys.forEach((key) => {
      setValue(key, obj[key]);
    });
  }
  useEffect(() => {
    fillForm(keys, user);
    console.log(errors);
  }, [errors, fillForm]);
  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div className='contact'>
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-md-10 col-12 row'>
              <div className='col-md-6 col-12'>
                <div className='col-12 row'>
                  <i className='fa fa-user'></i>
                  <div className='form-group'>
                    <div className='row'>
                      <label>Name</label>
                      <i className='fa fa-pencil'></i>
                    </div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='UserName'
                      {...register("name")}
                    />
                  </div>
                </div>
                <div className='col-12 row'>
                  <i className='fa fa-google'></i>
                  <div className='form-group'>
                    <div className='row'>
                      <label>Gmail</label>
                      <i className='fa fa-pencil'></i>
                    </div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='UserName@gmail.com'
                      {...register("email")}
                    />
                  </div>
                </div>
                <div className='col-12 row'>
                  <i className='fa fa-lock'></i>
                  <div className='form-group'>
                    <div className='row'>
                      <label>Password</label>
                      <i className='fa fa-pencil'></i>
                    </div>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='************'
                      {...register("password")}
                    />
                  </div>
                </div>
              </div>
              {/* *************************************************************** */}
              <div className='col-md-6 col-12'>
                <div className='col-12 row'>
                  <i className='fa fa-phone'></i>
                  <div className='form-group'>
                    <div className='row'>
                      <label>Phone</label>
                      <i className='fa fa-pencil'></i>
                    </div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='00000000000'
                      {...register("phone")}
                    />
                  </div>
                </div>
                <div className='col-12 row'>
                  <i className='fa fa-map-marker'></i>
                  <div className='form-group'>
                    <div className='row'>
                      <label>Address</label>
                      <i className='fa fa-pencil'></i>
                    </div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Address'
                      {...register("addres")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-2 col-2'>
              <div className='contact-icon '>
                <button type='submit' className='none'>
                  <img src={contactIcon} alt='contact' />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
