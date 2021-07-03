import React, { useEffect, useState } from "react";
import check from "../../../../assets/images/check.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RemovePlaceSchema } from "../../../../utils/validators/auth";
import deleteImg from "../../../../assets/images/delete.svg";
import loader from "../../../../assets/images/loader.gif";
import { deleteRequest, getRequest } from "../../../../utils/http";
import { getObjFromLocalStorage } from "../../../../utils/localStorage";
import { BASE_URL, CITIES, PLACES } from "../../../../utils/endpoints";
import { connect } from "react-redux";
export const Container = ({ cityClicked, title, storeCities }) => {
  const user = getObjFromLocalStorage("user");
  const [cities, setCities] = useState(storeCities);
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(RemovePlaceSchema),
  });
  // get citiess
  useEffect(() => {
    if (storeCities.length === 0) {
      getRequest(`${BASE_URL}${CITIES}`).then((res) => {
        const data = res.data.docs;
        console.log(data);
        setCities(data);
      });
    }
  }, [storeCities.length]);
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const getPlaces = (id) => {
    getRequest(`${BASE_URL}${PLACES}/cities/${id}`)
      .then((res) => {
        console.log(res.data.docs);
        setPlaces(res.data.docs);
      })
      .catch((error) => console.log(error));
  };
  const onSubmit = (data) => {
    console.log(data);
    const { place } = data;
    setIsSubmitting(true);
    deleteRequest(`${BASE_URL}${PLACES}delete/${place}`, {
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
          <div className='col-md-9 col-9'>
            <div className='col-m-12 row'>
              <div className='col-lg-4 col-md-4 col-6'>
                <select
                  type='text'
                  name='city '
                  placeholder='select City'
                  {...register("city")}
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
                  {...register("place")}
                  onClick={(e) => {
                    setPlace(e.target.value);
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
export const RemoveContent = connect(mapStateToProps)(Container);
