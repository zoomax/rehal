import React, { useEffect, useState } from "react";
import check from "../../../../assets/images/check.svg";
import "./modifyContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditPlaceSchema } from "../../../../utils/validators/auth";
import upload from "../../../../assets/images/upload.png";
import loader from "../../../../assets/images/loader.gif";
import { getRequest, putRequest } from "../../../../utils/http";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import {
  BASE_URL,
  CITIES,
  SERVICES,
  PLACES,
} from "../../../../utils/endpoints";
import { connect } from "react-redux";
export const Container = ({ cityClicked, title, storeCities }) => {
  const user = getObjFromLocalStorage("user");
  const [image, setImage] = useState(null);
  const [cities, setCities] = useState(storeCities);
  const [services, setServices] = useState([]);
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(EditPlaceSchema),
  });
  const setPlaceInfo = (id) => {
    const info = places.find((place) => {
      return place.id === id;
    });
    if (info) {
      setImage(null);
      setPlace(info);
      const formData = {
        rating: info.rating ? +info.rating.toFixed(5) : "",
        lat:
          info.location && info.location.coordinates
            ? info.location.coordinates[1]
            : "",
        lng:
          info.location && info.location.coordinates
            ? info.location.coordinates[0]
            : "",
        address: info.address ? info.address : "",
        name: info.name ? info.name : "",
        service: info.service ? info.service : "",
      };
      Object.keys(formData).forEach((key) => {
        setValue(key, formData[key]);
      });
    }
  };
  // get citiess
  useEffect(() => {
    if (storeCities.length === 0) {
      getRequest(`${BASE_URL}${CITIES}`).then((res) => {
        const data = res.data.docs;
        console.log(data);
        setCities(data);
      });
    }
  }, []);
  // getting services
  useEffect(() => {
    getRequest(`${BASE_URL}${SERVICES}`).then((res) => {
      const data = res.data.docs;
      console.log(data);
      setServices(data);
    });
  }, []);
  // getting errors
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  // on file change
  const onFileChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };
  // reset form values
  function resetForm() {
    const formData = {
      rating: "",
      lat: "",
      lng: "",
      address: "",
      service: "",
      name: "",
    };
    Object.keys(formData).forEach((key) => {
      setValue(key, formData[key]);
    });
  }
  // get city's places
  const getPlaces = (id) => {
    resetForm();
    setPlace(null);
    getRequest(`${BASE_URL}${PLACES}/cities/${id}`)
      .then((res) => {
        console.log(res.data.docs);
        setPlaces(res.data.docs);
      })
      .catch((error) => console.log(error));
  };
  // onSubmit function
  const onSubmit = (data) => {
    setIsSubmitting(true);
    console.log(data);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (image) {
      formData.append("image", image);
    }
    putRequest(`${BASE_URL}${PLACES}edit/${place.id}`, formData, {
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

  // templete
  return (
    <div className='add-content'>
      <div className='container'>
        <form className='row' onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-md-9 col-9'>
              <div className='col-m-12 row'>
                <div className='col-lg-4 col-md-4 col-6'>
                  <select
                    type='text'
                    name='city '
                    placeholder='select City'
                    onChange={(e) => {
                      getPlaces(e.target.value);
                      console.log("clicked");
                    }}>
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
                    name='place'
                    defaultValue={place ? `${place.id}` : ""}
                    onClick={(e) => {
                      setPlaceInfo(e.target.value);
                    }}>
                    <option value=''>Select A Place...</option>
                    {places.map((place, index) => {
                      return (
                        <option value={place.id} key={index}>
                          {place.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='col-lg-4 col-md-4 col-6'>
                  <input
                    type='text'
                    name='name'
                    placeholder='Name...'
                    {...register("name")}
                  />
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
                    step='0.0001'
                    {...register("rating")}
                  />
                </div>
                <div className='col-lg-4 col-md-4 col-6 '>
                  <input
                    type='file'
                    name='file'
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
export const ModifyContent = connect(mapStateToProps)(Container);
