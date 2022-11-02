import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { data } from "../../config";
import css from "./LandingPage.module.css";
const LandingPage = () => {
  const reviewData = data;
  const location = useLocation();
  const history = useNavigate();
  const page = location.search;
  const pageValue = Number(page.split("=")[1] || 1);
  useEffect(() => {
    history(`/?page=${1}`);
  }, []);
  //pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(3);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = reviewData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    history(`/?page=${pageNumber}`);
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviewData.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  //sort by rating
  const [sort, setSort] = React.useState("asc");
  const [sortData, setSortData] = React.useState(reviewData);
  const sortRating = () => {
    if (sort === "asc") {
      setSort("desc");
      setSortData(
        reviewData.sort((a, b) => {
          return (
            b.review?.reduce((acc, item) => acc + item.review_rating, 0) /
              b.review?.length -
            a.review?.reduce((acc, item) => acc + item.review_rating, 0) /
              a.review?.length
          );
        })
      );
    } else {
      setSort("asc");
      setSortData(
        reviewData.sort((a, b) => {
          return (
            a.review?.reduce((acc, item) => acc + item.review_rating, 0) /
              a.review?.length -
            b.review?.reduce((acc, item) => acc + item.review_rating, 0) /
              b.review?.length
          );
        })
      );
    }
  };
  // console.log({ reviewData });
  return (
    <>
      <div className={css.headingContainer}>
        <h1>Products</h1>
      </div>
      <div className={css.sortContainer}>
        <h2>Sort By Rating</h2>
        <select onChange={sortRating}>
          <option>select</option>
          <option value="asc">Highest to Lowest</option>
          <option value="desc">Lowest to Highest</option>
        </select>
      </div>

      <div className={css.mainContainer}>
        {currentPosts?.map((item) => (
          <div
            className={css.card}
            onClick={() => history(`/product/${item.product_id}`)}
          >
            <div className={css.imageContainer}>
              <img
                className={css.image}
                src={item.product_image}
                alt="product"
              />
            </div>
            <div className={css.lastContainer}>
              <div className={css.productName}>{item.product_name}</div>

              <div className={css.rating}>
                <ReactStars
                  value={
                    item.review?.reduce(
                      (acc, item) => acc + item.review_rating,
                      0
                    ) / item.review?.length
                  }
                  size={16}
                  edit={false}
                  half={true}
                  activeColor="#ffd700"
                />
                ({item.review?.length})
              </div>
              <div className={css.productPrice}>${item.product_price}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={css.pagination}>
        {pageNumbers.map((number) => (
          <p
            key={number}
            className={pageValue == number ? css.activePage : css.page}
            onClick={() => paginate(number)}
          >
            {number}
          </p>
        ))}
      </div>
    </>
  );
};

export default LandingPage;
