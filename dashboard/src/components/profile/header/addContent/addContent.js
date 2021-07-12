import React, { useEffect, useState } from "react";
import check from "../../../../assets/images/check.svg";
import "./addContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PlaceSchema } from "../../../../utils/validators/auth";
import upload from "../../../../assets/images/upload.png";
import loader from "../../../../assets/images/loader.gif";
import { getRequest, postRequest } from "../../../../utils/http";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import {
  BASE_URL,
  CITIES,
  SERVICES,
  NEW_PLACE,
  PLACES,
} from "../../../../utils/endpoints";
import { setServices } from "../../../../redux-store/actions/servicesActions";
import { setCities } from "../../../../redux-store/actions/citiesActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
export const Container = ({
  storeCities,
  storeServices,
  setStoreCities,
  setStoreServices,
}) => {
  const user = getObjFromLocalStorage("user");
  const [image, setImage] = useState(null);
  const [cities, setCities] = useState(storeCities);
  const [services, setServices] = useState(storeServices);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(PlaceSchema),
  });
  // get citiess
  useEffect(() => {
    if (storeCities && storeCities.length === 0) {
      setCities(storeCities);
      getRequest(`${BASE_URL}${CITIES}`).then((res) => {
        const data = res.data;
        setCities(data);
        setStoreCities(data);
      });
    }
  }, [setStoreCities, storeCities]);
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
    const { lat, lng, name, address, service, city, rating } = data;
    const placeFormData = {
      name,
      address,
      service,
      city,
      rating,
      lng,
      lat,
    };
    setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(placeFormData).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (image) {
      formData.append("image", image);
    }
    postRequest(
      `${BASE_URL}${PLACES}${NEW_PLACE(data.city, data.service)}`,
      formData,
      {
        headers: {
          "auth-token": user.token,
        },
      },
    )
      .then((res) => {
       
        setIsSubmitting(false);
        reset();
        
        toast.success("A new place has been added successfully ");
      })
      .catch((e) => {
        setIsSubmitting(false);
        // failure
        toast.error(e.response.data);
      });
  };
  return (
    <div className='add-content'>
      <div className='container'>
        <form className='row' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-md-9 col-9'>
              <div className='col-m-12 row'>
                <div className='col-lg-4 col-md-4 col-6'>
                  <input
                    type='text'
                    name='name'
                    placeholder='place name'
                    {...register("name")}
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-6'>
                  <select
                    type='text'
                    name='city '
                    placeholder='select City'
                    {...register("city")}>
                    <option value=''>Select City....</option>
                    {cities.map((city, index) => {
                      return (
                        <option value={city.id} key={index}>
                          {city.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='col-lg-4 col-md-4 col-6'>
                  <select
                    name='city '
                    placeholder='Select Service'
                    {...register("service")}>
                    <option value=''>Select Service....</option>
                    {services.map((service, index) => {
                      return (
                        <option value={service.id} key={index}>
                          {service.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='col-lg-4 col-md-4 col-6'>
                  <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    {...register("address")}
                  />
                </div>

                <div className='col-lg-4 col-md-4 col-6'>
                  <input
                    type='text'
                    name='lat'
                    placeholder='Latitude'
                    {...register("lat")}
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-6'>
                  <input
                    type='text'
                    name='lng'
                    placeholder='longitude'
                    {...register("lng")}
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-6'>
                  <input
                    type='number'
                    name='rating'
                    placeholder='Add Rating...'
                    {...register("rating")}
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
            </div>
            <div className='col-md-3 col-3'>
              <button className='none' type='submit'>
                <img src={isSubmitting ? loader : check} alt='img' />
              </button>
            </div>
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
    setStoreServices: (payload) => dispatch(setServices(payload)),
  };
};
export const AddContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
