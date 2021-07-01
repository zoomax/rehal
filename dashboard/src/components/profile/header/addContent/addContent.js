import React from "react";
import check from "../../../../assets/images/check.svg";
import "./addContent.css";
export class AddContent extends React.Component {
  state = {
    data: [
      { name: "name" },
      { name: "city", clicked: true },
      { name: "type" },
      { name: "* times" },
      { name: "descriptions" },
      { name: "profile pic" },
      { name: "* tickets" },
      { name: "rate" },
      { name: "media" },
    ],
  };

  render() {
    let { data } = this.state;
    return (
      <div className="add-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-9">
              <div className="col-m-12 row">
                {data.map((data, id) => {
                  return (
                    <div className="col-lg-4 col-md-4 col-6" key={id}>
                      <div
                        onClick={data.clicked && this.props.cityClicked}
                        style={{ cursor: data.clicked && "pointer" }}
                      >
                        {data.name === "city" ? this.props.title : data.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-3 col-3">
              <img src={check} alt="img" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
