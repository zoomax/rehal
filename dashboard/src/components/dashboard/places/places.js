import React from "react";
import { Layout } from "../../layout/layout";
import imgIcon from "../../../assets/images/x.svg";
import TotalData from "./totalData/totalData";
import { RightInfo } from "./rightInfo/rightInfo";
import { Chart } from "./chart/chart";
import "./places.css";
export const Places = () => {
  return (
    <div className="places-border">
      <Layout>
        <div className="places">
          <div className="select-type">
            <p> type:</p>
            <select className="form-select">
              <option value="1">tourist</option>
              <option value="2">food</option>
              <option value="3">hospital</option>
              <option value="4">clubs</option>
            </select>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-3">
              <div className="img">
                <img src={imgIcon} alt="icon" />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <TotalData />
            </div>
            <div className="col-md-3 col-sm-3">
              <RightInfo />
            </div>
          </div>
          <Chart />
        </div>
      </Layout>
    </div>
  );
};
