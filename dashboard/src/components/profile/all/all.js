import React from "react";
import { Layout } from "../../layout/layout";
import img from "../../../assets/images/x.svg";
import "./all.css";
// import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
const All = ({ places, services, cities }) => {
  const history = useHistory();
  const getCity = (id) => {
    const city = cities.find((city) => {
      return city.id === id.toString();
    });
    return city ? city.name : "";
  };
  const getService = (id) => {
    const service = services.find((service) => {
      return service.id === id.toString();
    });
    return service ? service.name : "";
  };
  const redirect = () => {
    history.push("/profile");
  };
  const getPlaceRating = (id) => {
    history.push(`/rating/${id}`);
  };
  return (
    <div className='all-border'>
      <Layout>
        <div className='alls'>
          <div className='btns' onClick={redirect}>
            Show All <i className='fa fa-chevron-down'></i>
          </div>
          <div className='container all-data'>
            <div className='row'>
              {places.map((place, key) => {
                return (
                  <div
                    onClick={() => {
                      getPlaceRating(place.id);
                    }}
                    className='col-md-4 col-sm-6 col-12'
                    key={key}>
                    <div className='row'>
                      <div className='img'>
                        <img src={place.image ? place.image : img} alt='img' />
                      </div>
                      <div className='data-content'>
                        <div className='row1'>
                          <h5>{place.name}</h5>
                          <img src={img} alt='im' />
                        </div>
                        <div className='row2'>
                          <p>{getCity(place.city)}</p>
                          <p>{getService(place.service)}</p>
                          <i className='fa fa-star'></i>
                          <p>{place.rating}</p>
                        </div>
                        <div className='row3'>
                          <p>{place.description ? place.description : ""}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
const mapStateToProps = ({ places, services, cities }) => {
  return {
    places,
    services,
    cities,
  };
};
export default connect(mapStateToProps)(All);
