import React from "react";
import { Layout } from "../../layout/layout";
import img from "../../../assets/images/x.svg";
import "./all.css";
import { connect } from "react-redux";
const All = ({ services }) => {
  // const getServices = () => {
  //   return services.map((service) => {
  //     return service.name;
  //   });
  // };
  return (
    <div className='all-border services'>
      <Layout>
        <div className='alls'>
          <div className='btns'>
            Show All <i className='fa fa-chevron-down'></i>
          </div>
          <div className='container all-data'>
            <div className='row'>
              {services.map((service, key) => {
                return (
                  <div
                    className='col-md-4 col-sm-6 col-12 place-card'
                    key={key}>
                    <div className='row'>
                      <div className='img'>
                        <img
                          src={service.image ? service.image : img}
                          alt='img'
                        />
                      </div>
                      <div className='data-content'>
                        <div className='row1'>
                          <h5>{service.name}</h5>
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
