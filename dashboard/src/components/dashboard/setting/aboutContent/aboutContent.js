import React from "react";
import "./aboutContent.css";
export const AboutContent = () => {
  return (
    <div className="about-content">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="data">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              quam lorem, malesuada quis sagittis eget, congue ut odio.
              Pellentesque aliquet justo quam, et sagittis dolor elementum sed.
              Fusce efficitur magna et sollicitudin facilisis. Fusce vel dolor
              porttitor, luctus lacus in, suscipit diam. Ut pulvinar augue vel
              odio efficitur cursus. Nam risus dolor, aliquet id lacinia vitae,
              dapibus mollis odio. Vestibulum hendrerit tortor vitae massa
              consequat, et tristique eros vestibulum. Donec dictum volutpat
              odio. Cras commodo nisi ac tortor faucibus hendrerit. Maecenas
              vehicula faucibus metus sit amet euismod. Nam sagittis porttitor
              elit, sed blandit ligula condimentum quis. Nam et cursus turpis.
              Ut sed tortor quis sapien bibendum elementum. Nunc ut ex tortor.
              Suspendisse risus urna, tempor nec euismod in, fermentum id sem.
              Sed rhoncus nec lacus et molestie. Etiam ultricies sapien et
              efficitur iaculis. Vestibulum sollicitudin tristique elit, sit
              amet accumsan leo. Nunc id nibh finibus, aliquet magna eu,
              scelerisque ligula. Proin at justo sed tellus consequat lobortis.
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-us">
              <h5>Contact Us:</h5>
              <form>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Mail:</label>
                  <div className="col-sm-8">
                    {" "}
                    <span>apprehal@gmail.com</span>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Phone:</label>
                  <div className="col-sm-8">
                    <span>000000000000</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
