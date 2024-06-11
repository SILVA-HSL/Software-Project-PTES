import React from "react";
import "./TotalPriceLabel.css";

interface TotalPriceLableProps {
  passengers: number;
  totalPrice: number;
  buttonText?: string; // Optional prop
  onSave?: () => void; // Optional prop
}

const TotalPriceLable: React.FC<TotalPriceLableProps> = ({
  passengers,
  totalPrice,
  buttonText = "Pay Now", // Default value is Pay Now
  onSave,
}) => {
  return (
    <div className="PriceLable col-12 pt-5 h-auto">
      <div className="row1 row col-12 pb-2 m-auto h-auto pt-lg-4 pb-lg-5">
        <div className="col col-8 fs-4 d-flex justify-content-start m-auto p-0  fw-semibold">
          Passengers
        </div>
        <div className="col col-2 fs-4 fw-semibold d-flex d-flex justify-content-end m-auto">
          {passengers}
        </div>
      </div>
      <div className="row2 row col-12 pb-2 m-auto h-auto ">
        <div className="col col-md-6 col-sm-8 fs-4 d-flex justify-content-start p-0  m-auto ">
          Total
        </div>
        <div className="col col-md-4 col-sm-8 fs-4 fw-semibold d-flex  justify-content-end m-auto ">
          LKR {totalPrice}.00
        </div>
      </div>
      <div className="row row3 col-12 pb-2 pt-2 pb-2 h-auto pt-lg-3">
        <div className=" d-flex p-0 align-items-center justify-content-center ">
          <button
            className=" button PayNowButton w-100 h-auto  border-0 p-1 fs-4 fw-bold "
            type="button"
            onClick={onSave}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalPriceLable;