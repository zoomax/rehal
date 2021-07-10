import React, { useState } from "react";
import arrow from "../../../../assets/images/arrow.svg";
import loader from "../../../../assets/images/loader.gif";
import { getRequest } from "../../../../utils/http";
import { useHistory } from "react-router-dom";
import { BASE_URL, SERVICES } from "../../../../utils/endpoints";
import { connect } from "react-redux";
import { setServices } from "../../../../redux-store/actions/servicesActions";
export const Container = ({ setServices }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const getCities = () => {
    getRequest(`${BASE_URL}${SERVICES}`)
      .then((res) => {
        console.log(res.data.docs);
        setServices(res.data.docs);
        setIsSubmitting(false);
        history.push("/services/all");
      })
      .catch(() => setIsSubmitting(false));
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

const mapStateToProps = ({ services }) => {
  return {
    storeService: services,
  };
};
const mapDispathToProps = (dispatch) => {
  return {
    setServices: (payload) => dispatch(setServices(payload)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Container);
