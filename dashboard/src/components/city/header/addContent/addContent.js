import React, { useEffect, useState } from "react";
import check from "../../../../assets/images/check.svg";
import "./addContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CitySchema } from "../../../../utils/validators/auth";
import upload from "../../../../assets/images/upload.png";
import loader from "../../../../assets/images/loader.gif";
import { getRequest, postRequest } from "../../../../utils/http";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import { BASE_URL, CITIES, SERVICES } from "../../../../utils/endpoints";
import { setServices } from "../../../../redux-store/actions/servicesActions";
import {
  setCities,
  addCity,
} from "../../../../redux-store/actions/citiesActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
export const Container = ({ storeServices, addCity, setStoreServices }) => {
  const user = getObjFromLocalStorage("user");
  const [image, setImage] = useState(null);
  const [, setServices] = useState(storeServices);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CitySchema),
  });
  // get services
  useEffect(() => {
    getRequest(`${BASE_URL}${SERVICES}`).then((res) => {
      const data = res.data;
      setServices(data);
      setStoreServices(data);
    });
  }, [setStoreServices]);
  // show errors
  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      toast.error(errors[key].message);
    });
  }, [errors]);

  const onFileChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };
  const onSubmit = (data) => {
    console.log(data);
    console.log(user);
    const { postalCode, name } = data;
    const placeFormData = {
      name,
      postalCode,
    };
    setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(placeFormData).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (image) {
      formData.append("image", image);
    }
    postRequest(`${BASE_URL}${CITIES}newCity`, formData, {
      headers: {
        "auth-token": user.token,
      },
    })
      .then((res) => {
        const payload = res.data;
        setIsSubmitting(false);
        reset();
        setImage(null);
        addCity(payload);
        toast.success("A new city has been added successfully");
      })
      .catch((e) => {
        setIsSubmitting(false);
        toast.error(e.response.data);
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
                placeholder='place name'
                {...register("name")}
              />
            </div>
            <div className='col-lg-4 col-md-4 col-6'>
              <input
                type='number'
                name='postalCode '
                placeholder='Postal Code'
                {...register("postalCode")}
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

const mapStateToProps = ({ cities, services }) => {
  return {
    storeCities: cities,
    storeServices: services,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStoreCities: (payload) => dispatch(setCities(payload)),
    addCity: (payload) => dispatch(addCity(payload)),
    setStoreServices: (payload) => dispatch(setServices(payload)),
  };
};
export const AddContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
