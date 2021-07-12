import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RemoveCitySchema } from "../../../../utils/validators/auth";
import deleteImg from "../../../../assets/images/delete.svg";
import loader from "../../../../assets/images/loader.gif";
import { deleteRequest, getRequest } from "../../../../utils/http";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import { BASE_URL, CITIES } from "../../../../utils/endpoints";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { deleteCity } from "../../../../redux-store/actions/citiesActions";
export const Container = ({ storeCities, deleteCity }) => {
  const user = getObjFromLocalStorage("user");
  const [cities, setCities] = useState(storeCities);
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
    setCities(storeCities);
    if (storeCities && storeCities.length === 0) {
      getRequest(`${BASE_URL}${CITIES}`).then((res) => {
        const data = res.data;
        setCities(data);
      });
    }
  }, [storeCities]);
  // show errors
  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      toast.error(errors[key].message);
    });
  }, [errors]);
  const onSubmit = (data) => {
    const { city } = data;
    setIsSubmitting(true);
    deleteRequest(`${BASE_URL}${CITIES}delete/${city}`, {
      headers: {
        "auth-token": user.token,
      },
    })
      .then((res) => {
        const payload = res.data;
        console.log(payload);
        setIsSubmitting(false);
        reset();
        deleteCity(city);
        toast.success("City has been deleted successfully ");
      })
      .catch((e) => {
        setIsSubmitting(false);
        // failure
        toast.error(e.response);
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
            </div>
          </div>
          <div className='col-md-3 col-3'>
            <button className='none' type='submit'>
              <img src={isSubmitting ? loader : deleteImg} alt='img' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cities }) => {
  return {
    storeCities: cities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCity: (payload) => dispatch(deleteCity(payload)),
  };
};
export const RemoveContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
