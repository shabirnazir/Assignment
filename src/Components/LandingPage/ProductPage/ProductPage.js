import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { data } from "../../../config";
import css from "./ProductPage.module.css";
export const ProductPage = () => {
  const location = useLocation();
  const history = useNavigate();
  const id = Number(location.pathname.split("/")[2]);
  const product = data.find((item) => item.product_id == id);
  return (
    <div className={css.container}>
      <h2
        onClick={() => {
          history("/");
        }}
        className={css.back}
      >
        Home
      </h2>
      <div className={css.imageContainer}>
        <img className={css.image} src={product.product_image} alt="product" />
      </div>
      <h1>{product.product_name}</h1>
      <h2>${product.product_price}</h2>
      <div className={css.lastContainer}>
        <h2 className={css.reviews}>Reviews</h2>
        {product?.review?.map((item) => (
          <div className={css.reviewContainer}>
            <h3>Review Text</h3>
            <p>{item.review_text}</p>
            <h3>Rating</h3>
            <ReactStars
              value={item.review_rating}
              size={24}
              edit={false}
              activeColor="#ffd700"
            />
            {/* <p>{item.review_rating}</p> */}
            <h3>Date</h3>
            <p>{item.review_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
