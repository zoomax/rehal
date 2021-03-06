import React, { useState } from "react";
import arrow from "../../../../assets/images/arrow.svg";
import loader from "../../../../assets/images/loader.gif";
import { getRequest } from "../../../../utils/http";
import { useHistory } from "react-router-dom";
import { BASE_URL, CITIES } from "../../../../utils/endpoints";
import { connect } from "react-redux";
import { setCities } from "../../../../redux-store/actions/citiesActions";
import { toast } from "react-toastify";
export const Container = ({ setCities }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const getCities = () => {
    getRequest(`${BASE_URL}${CITIES}`)
      .then((res) => {
        console.log(res.data);
        setCities(res.data);
        setIsSubmitting(false);
        toast.success("Data has been fetched successfully ");
        history.push("/cities/all");
      })
      .catch((e) => {
        setIsSubmitting(false);
        // failure
        toast.error(e.response.data);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    getCities();
  };
  return (
    <div className='add-content'>
      <div className='container'>
        <form
          className='row'
          onSubmit={(e) => {
            onSubmit(e);
          }}>
          <div className='col-md-9 col-9'></div>
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
    setCities: (payload) => dispatch(setCities(payload)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Container);
