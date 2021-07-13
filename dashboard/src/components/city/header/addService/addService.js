import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RemoveCitySchema } from "../../../../utils/validators/auth";
import check from "../../../../assets/images/check.svg";
import loader from "../../../../assets/images/loader.gif";
import { getRequest, postRequest } from "../../../../utils/http";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import { BASE_URL, CITIES, SERVICES } from "../../../../utils/endpoints";
import { connect } from "react-redux";
import { toast } from "react-toastify";
export const Container = ({ storeCities, storeServices }) => {
  const user = getObjFromLocalStorage("user");
  const [cities, setCities] = useState(storeCities);
  const [services, setServices] = useState(storeServices);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(RemoveCitySchema),
  });
  // get citiess
  useEffect(() => {
    if (storeCities.length === 0) {
      getRequest(`${BASE_URL}${CITIES}`).then((res) => {
        const data = res.data;
        console.log(data);
        setCities(data);
      });
    }
  }, [storeCities.length]);
  useEffect(() => {
    if (storeServices.length === 0) {
      getRequest(`${BASE_URL}${SERVICES}`).then((res) => {
        const data = res.data;
        console.log(data);
        setServices(data);
      });
    }
  }, [storeServices.length]);
  // show errors
  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      toast.error(errors[key].message);
    });
  }, [errors]);
  const onSubmit = (data) => {
    console.log(data);
    console.log(user.token);
    const { city, service } = data;
    setIsSubmitting(true);
    const url = `${BASE_URL}${CITIES}${city}/services/${service}`;
    console.log(url);
    postRequest(url, data, {
      headers: {
        "auth-token": user.token,
      },
    })
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        reset();
        toast.success("A new Service has been Added successfully....");
      })
      .catch((e) => {
        setIsSubmitting(false);
        toast.success(e.response.data);
      });
  };
  return (
    <div className='add-content'>
      <div className='container'>
        <form className='row' onSubmit={handleSubmit(onSubmit)}>
          <div className='col-md-9 col-9'>
            <div className='col-m-12 row'>
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
                  type='text'
                  name='city '
                  placeholder='select Service'
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
export const AddService = connect(mapStateToProps)(Container);
