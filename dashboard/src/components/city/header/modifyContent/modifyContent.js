import React, { useEffect, useState } from "react";
import check from "../../../../assets/images/check.svg";
import "./modifyContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CitySchema } from "../../../../utils/validators/auth";
import upload from "../../../../assets/images/upload.png";
import loader from "../../../../assets/images/loader.gif";
import { getRequest, putRequest } from "../../../../utils/http";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import { BASE_URL, CITIES, SERVICES } from "../../../../utils/endpoints";
import { setServices } from "../../../../redux-store/actions/servicesActions";
import { setCities } from "../../../../redux-store/actions/citiesActions";
import { connect } from "react-redux";
export const Container = ({
  storeCities,
  storeServices,
  setStoreCities,
  setStoreServices,
}) => {
  const user = getObjFromLocalStorage("user");
  const [image, setImage] = useState(null);
  const [cities, setCities] = useState(storeCities);
  const [city, setCity] = useState(null);
  const [services, setServices] = useState(storeServices);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(CitySchema),
  });
  // get cities
  useEffect(() => {
    if (storeCities.length === 0) {
      getRequest(`${BASE_URL}${CITIES}`).then((res) => {
        const data = res.data.docs;
        setCities(data);
        setStoreCities(data);
      });
    }
  }, [setStoreCities, storeCities.length]);
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
  useEffect(() => {
    console.log(city);
  }, [city]);
  function onCityChange(e) {
    const data = e.target.value;
    setCityInfo(data);
  }
  const onFileChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };
  const setCityInfo = (id) => {
    const info = cities.find((city) => {
      return city.id === id;
    });
    if (info) {
      setImage(null);
      setCity(info);
      const formData = {
        name: info.name,
        postalCode: info.postalCode,
      };
      Object.keys(formData).forEach((key) => {
        setValue(key, formData[key]);
      });
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    console.log(user);
    const { postalCode, name } = data;
    const placeFormData = {
      name,
      services,
    };
    setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(placeFormData).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (image) {
      formData.append("image", image);
    }
    putRequest(`${BASE_URL}${CITIES}editCity/${city.id}`, formData, {
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
            {/* <div className='col-m-12 row'> */}
            <div className='col-lg-4 col-md-4 col-6'>
              <select onChange={(e) => onCityChange(e)} name='city'>
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
              <input
                type='text'
                name='name'
                placeholder='City Name'
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
    setStoreServices: (payload) => dispatch(setServices(payload)),
  };
};
export const ModifyContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
