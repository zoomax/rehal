import React, { useEffect, useState } from "react";
import contactIcon from "../../../../assets/images/c.svg";
import loader from "../../../../assets/images/loader.gif";
import "./contact.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactSchema } from "../../../../utils/validators/auth";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import { putRequest } from "../../../../utils/http";
import { BASE_URL } from "../../../../utils/endpoints";
import { toast } from "react-toastify";
import { updateUser } from "../../../../redux-store/actions/authActions";
import { connect } from "react-redux";
const Container = ({ updateUser }) => {
  const [user, setUser] = useState(getObjFromLocalStorage("user"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(ContactSchema),
  });
  useEffect(() => {
    const keys = ["name", "email", "location", "phone"];
    function fillForm(keys, obj) {
      keys.forEach((key) => {
        if (key === "location") {
          setValue("lng", obj[key].coordinates[0]);
          setValue("lat", obj[key].coordinates[1]);
        } else {
          setValue(key, obj[key]);
        }
      });
    }
    fillForm(keys, user.user);
  }, [setValue, user.user]);
  //errors, setValue, user.user
  function onFileChange(e) {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      return setImage(file);
    }
    return setImage(null);
  }

  function onSubmit(data) {
    // setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (image) {
      formData.append("image", image);
    }
    console.log(data);
    setIsSubmitting(true);
    putRequest(`${BASE_URL}users/edit`, formData, {
      headers: {
        "auth-token": user.token,
      },
    })
      .then((res) => {
        setIsSubmitting(false);
        const data = res.data;
        console.log(data);
        setUser({ ...user, user: data });
        console.log(user);
        localStorage.removeItem("user");
        updateUser(data);

        toast.success("Your acount has been updated successfully");
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
                    {errors.name && (
                      <p className='text-danger'>{errors.name.message}</p>
                    )}
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
                    {errors.email && (
                      <p className='text-danger'>{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className='col-12 row'>
                  <i className='fa fa-picture-o'></i>
                  <div className='form-group'>
                    <div className='row'>
                      <label>Profile Image</label>
                      <i className='fa fa-pencil'></i>
                    </div>
                    <input
                      type='file'
                      className='form-control'
                      accept='image/*'
                      onChange={(e) => {
                        onFileChange(e);
                      }}
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
                    {errors.phone && (
                      <p className='text-danger'>{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                <div className='col-12 row'>
                  <i className='fa fa-map-marker'></i>
                  <div className='form-group'>
                    <div className='row'>
                      <label>Langitude</label>
                      <i className='fa fa-pencil'></i>
                    </div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='00.0000000'
                      {...register("lng")}
                    />
                    {errors.lng && (
                      <p className='text-danger'>{errors.lng.message}</p>
                    )}
                  </div>
                </div>
                <div className='col-12 row'>
                  <i className='fa fa-map-marker'></i>
                  <div className='form-group'>
                    <div className='row'>
                      <label>Latitude</label>
                      <i className='fa fa-pencil'></i>
                    </div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='00.0000000'
                      {...register("lat")}
                    />
                    {errors.lat && (
                      <p className='text-danger'>{errors.lat.message}</p>
                    )}
                  </div>
                </div>
              </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (payload) => dispatch(updateUser(payload)),
  };
};

export const Contact = connect(null, mapDispatchToProps)(Container);
