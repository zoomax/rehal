import React, { Component } from "react";
import { TouristIcon } from "../../elements/touristIcon/touristIcon";
import { Food } from "../../elements/food/food";
import { Hospital } from "../../elements/hospital/hospital";
import { Clubs } from "../../elements/clubs/clubs";
import "./header.css";
import { Visibility } from "../../elements/visibility/visibility";
import { Foundation } from "../../elements/foundation/foundation";
class Header extends Component {
  state = {
    data: [
      { name: "tourist", total: 124, total2: 150, svg: <TouristIcon /> },
      { name: "food", total: 124, total2: 150, svg: <Food /> },
      { name: "hospital", total: 124, total2: 150, svg: <Hospital /> },
      { name: "clubs", total: 124, total2: 150, svg: <Clubs /> },
    ],
  };
  render() {
    let { data } = this.state;
    return (
      <div className="dashboard-header">
        <div className="container">
          <div className="row">
            {data.map((data, id) => {
              return (
                <div className="col-md-3 col-sm-3 col-6" key={id}>
                  <div
                    className={`data text-center ${data.name} `}
                    onClick={() => this.props.openDiv(data.name)}
                  >
                    {data.svg}
                    <h2>{data.name}</h2>
                    <div className="row">
                      <p>
                        {data.total}
                        <Visibility />
                      </p>

                      <p>
                        {data.total2}
                        <Foundation />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
