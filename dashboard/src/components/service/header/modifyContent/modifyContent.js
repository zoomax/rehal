import React, { useEffect, useState } from "react";
import check from "../../../../assets/images/check.svg";
import "./modifyContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceSchema } from "../../../../utils/validators/auth";
import upload from "../../../../assets/images/upload.png";
import loader from "../../../../assets/images/loader.gif";
import { getRequest, putRequest } from "../../../../utils/http";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import { BASE_URL, SERVICES } from "../../../../utils/endpoints";
import { setServices } from "../../../../redux-store/actions/servicesActions";
import { setCities } from "../../../../redux-store/actions/citiesActions";
import { connect } from "react-redux";
export const Container = ({
  storeServices,  
  setStoreServices,
}) => {
  const user = getObjFromLocalStorage("user");
  const [image, setImage] = useState(null);
  const [services, setServices] = useState(storeServices);
  const [service, setService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(ServiceSchema),
  });

  // get services
  useEffect(() => {
    getRequest(`${BASE_URL}${SERVICES}`).then((res) => {
      const data = res.data.docs;
      console.log(data);
      setServices(data);
      setStoreServices(data);
    });
  }, [setStoreServices]);
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onFileChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };
  const setServiceInfo = (id) => {
    const info = services.find((service) => {
      return service.id === id;
    });
    if (info) {
      setImage(null);
      setService(info);
      const formData = {
        name: info.name,
      };
      Object.keys(formData).forEach((key) => {
        setValue(key, formData[key]);
      });
    }
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
    putRequest(`${BASE_URL}${SERVICES}edit/${service.id}`, formData, {
      headers: {
        "auth-token": user.token,
      },
    })
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        reset();
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
              <select
                onChange={(e) => setServiceInfo(e.target.value)}
                name='city'>
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
export const ModifyContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
