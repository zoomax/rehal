import React, { useEffect, useState } from "react";
import check from "../../../../assets/images/check.svg";
import "./addContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceSchema } from "../../../../utils/validators/auth";
import upload from "../../../../assets/images/upload.png";
import loader from "../../../../assets/images/loader.gif";
import { postRequest } from "../../../../utils/http";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import { BASE_URL, SERVICES } from "../../../../utils/endpoints";
import { connect } from "react-redux";
export const Container = () => {
  const user = getObjFromLocalStorage("user");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ServiceSchema),
  });
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onFileChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };
  const onSubmit = (data) => {
    console.log(data);
    console.log(user);
    const { name } = data;
    const serviceFormData = {
      name,
    };
    setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(serviceFormData).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (image) {
      formData.append("image", image);
    }
    postRequest(`${BASE_URL}${SERVICES}newService`, formData, {
      headers: {
        "auth-token": user.token,
      },
    })
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        reset();
        setImage(null);
      })
      .catch((e) => {
        setIsSubmitting(false);
      });
  };
  return (
    <div className='add-content'>
      <div className='container'>
        <form className='row' onSubmit={handleSubmit(onSubmit)}>
          <div className='col-md-9 col-9 row'>
            <div className='col-lg-4 col-md-4 col-6'>
              <input
                type='text'
                name='name'
                placeholder='Service Name'
                {...register("name")}
              />
            </div>
            <div className='col-lg-4 col-md-4 col-6 '>
              <input
                type='file'
                name='rating'
                placeholder='Select An Image'
                accept='image/*'
                onChange={(e) => onFileChange(e)}
              />
              <div className='file'>
                <span className={image ? "text-primary" : ""}>
                  {image ? "image selected" : "Upload Image"}
                </span>
                <img src={upload} width='15px' alt='' />
              </div>
            </div>
          </div>
          <div className='col-md-3 col-3'>
            <button className='none' type='submit'>
              <img src={isSubmitting ? loader : check} alt='img' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export const AddContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
