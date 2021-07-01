import React from "react";
import contactIcon from "../../../../assets/images/c.svg";
import "./contact.css";
export const Contact = () => {
  return (
    <div className="contact">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-12 row">
            <div className="col-md-6 col-12">
              <div className="col-12 row">
                <i className="fa fa-user"></i>
                <div className="form-group">
                  <div className="row">
                    <label>Name</label>
                    <i className="fa fa-pencil"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="UserName"
                  />
                </div>
              </div>
              <div className="col-12 row">
                <i className="fa fa-google"></i>
                <div className="form-group">
                  <div className="row">
                    <label>Gmail</label>
                    <i className="fa fa-pencil"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="UserName@gmail.com"
                  />
                </div>
              </div>
              <div className="col-12 row">
                <i className="fa fa-lock"></i>
                <div className="form-group">
                  <div className="row">
                    <label>Password</label>
                    <i className="fa fa-pencil"></i>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="************"
                  />
                </div>
              </div>
            </div>
            {/* *************************************************************** */}
            <div className="col-md-6 col-12">
              <div className="col-12 row">
                <i className="fa fa-phone"></i>
                <div className="form-group">
                  <div className="row">
                    <label>Phone</label>
                    <i className="fa fa-pencil"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="00000000000"
                  />
                </div>
              </div>
              <div className="col-12 row">
                <i className="fa fa-map-marker"></i>
                <div className="form-group">
                  <div className="row">
                    <label>Address</label>
                    <i className="fa fa-pencil"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-md-2 col-2">
            <div className="contact-icon ">
              <img src={contactIcon} alt="contact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
