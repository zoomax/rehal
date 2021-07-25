import React from "react";
import { Layout } from "../../layout/layout";
import img from "../../../assets/images/x.svg";
import "./all.css";
import { connect } from "react-redux";
const All = ({ cities, services }) => {
  const getServices = () => {
    return services.map((service) => {
      return service.name;
    });
  };
  return (
    <div className='all-border cities'>
      <Layout>
        <div className='alls'>
          <div className='btns'>
            Show All <i className='fa fa-chevron-down'></i>
          </div>
          <div className='container all-data'>
            <div className='row'>
              {cities.map((city, key) => {
                return (
                  <div
                    className='col-md-4 col-sm-6 col-12 place-card'
                    key={key}>
                    <div className='row'>
                      <div className='img'>
                        <img src={city.image ? city.image : img} alt='img' />
                      </div>
                      <div className='data-content'>
                        <div className='row1'>
                          <h5>{city.name}</h5>
                        </div>
                        <div className='row2'>
                          <p>Postal Code: {city.postalCode}</p>
                        </div>
                        <div className='row3'>
                          <p>
                            {getServices().map((service) => (
                              <span className='service-badge'>{service}</span>
                            ))}
                          </p>
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
const mapStateToProps = ({ cities, services }) => {
  return {
    cities,
    services,
  };
};
export default connect(mapStateToProps)(All);
