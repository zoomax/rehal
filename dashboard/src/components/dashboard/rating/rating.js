import React from "react";
import { Layout } from "../../layout/layout";
import { RatingChart } from "./ratingChart/ratingChart";
import { Total } from "./total/total";
import "./rating.css";
export const Rating = () => {
  return (
    <div className="rating-border">
      <Layout>
        <div className="rating">
          {" "}
          <div className="select-type">
            <p> type:</p>
            <select className="form-select">
              <option value="1">All</option>
              <option value="2">tourist</option>
              <option value="3">food</option>
              <option value="4">hospital</option>
              <option value="5">clubs</option>
            </select>
          </div>
          <Total />
          <RatingChart />
        </div>
      </Layout>
    </div>
  );
};
