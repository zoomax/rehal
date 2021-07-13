import React, { useEffect, useState } from "react";
import arrow from "../../../../assets/images/arrow.svg";
import loader from "../../../../assets/images/loader.gif";
import { getRequest } from "../../../../utils/http";
import { useHistory } from "react-router-dom";
import { BASE_URL, CITIES, PLACES } from "../../../../utils/endpoints";
import { connect } from "react-redux";
import { setPlaces } from "../../../../redux-store/actions/placesActions";
import { toast } from "react-toastify";
export const Container = ({ setPlaces, storeCities }) => {
  const [cities, setCities] = useState(storeCities);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [city, setCity] = useState("");
  const history = useHistory();
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
  const getPlaces = (id) => {
    getRequest(`${BASE_URL}${PLACES}/cities/${id}`)
      .then((res) => {
        console.log(res.data);
        setPlaces(res.data);
        setIsSubmitting(false);
        history.push("/profile/all");
        toast.success("Data has been fetched successfully ");
      })
      .catch((e) => {
        setIsSubmitting(false);
        // failure
        toast.error(e.response.data);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!city) return;

    setIsSubmitting(true);
    getPlaces(city);
  };
  return (
    <div className='add-content'>
      <div className='container'>
        <form
          className='row'
          onSubmit={(e) => {
            onSubmit(e);
          }}>
          <div className='col-md-9 col-9'>
            <div className='col-m-12 row'>
              <div className='col-lg-4 col-md-4 col-6'>
                <select
                  type='text'
                  name='city '
                  placeholder='select City'
                  onChange={(e) => {
                    setCity(e.target.value);
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
            </div>
          </div>
          <div className='col-md-3 col-3'>
            <button
              className={!isSubmitting ? "none min" : "none"}
              type='submit'>
              <img src={isSubmitting ? loader : arrow} alt='img' />
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
const mapDispathToProps = (dispatch) => {
  return {
    setPlaces: (payload) => dispatch(setPlaces(payload)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Container);
