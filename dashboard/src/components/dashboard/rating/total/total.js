import React from "react";
import "./total.css";
export class Total extends React.Component {
  state = {
    data: [
      { names: "Raters", value: "7,771" },
      { names: "Places", value: "7,771" },
      { names: "Rate Avg", value: "3.5" },
      { names: "Top rate", value: "3.5" },
      { names: "Lowest rate", value: "3.5" },
    ],
  };
  render() {
    return (
      <div className="rating-total">
        <div className="container">
          <div className="row">
            {this.state.data.map((data, id) => {
              return (
                <div className="col-md-2 col-sm-6 col-12" key={id}>
                  <h5>{data.names}</h5>
                  <p>{data.value}</p>
                  <div className="border-bottom"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
