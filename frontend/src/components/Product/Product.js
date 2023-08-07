import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from '../../redux/actions/categoryActions';
import { getColors, getProducts, getSizes } from '../../redux/actions/productActions';
import Category from './Category';
import axios from 'axios';
import _ from 'lodash';
const Product = () => {
  const dispatch = useDispatch();
  const lstCate = useSelector((state) => state.category.categories);
  const lstColor = useSelector((state) => state.product.colors_list);
  const lstSize = useSelector((state) => state.product.sizes_list);
  const lstPro = useSelector((state) => state.product.products_list);
  const user = useSelector((state) => state.user.user);
  let match1 = useRouteMatch('/category/:slug');
  let match2 = useRouteMatch('/category/:slug/:slug');
  let match3 = useRouteMatch('/category/:slug/:slug/:slug');
  let match4 = useRouteMatch('/tim-kiem');
  var showPro = [];

  if (lstPro.Products) {
    if (match2 && !match3) {
      const catSlug = lstCate.Categories.filter(
        (value) => value.slug === match1.params.slug
      );
      const catSlug2 = lstCate.Categories.filter(
        (value) => value.slug === match2.params.slug
      );
      let proSlug1 = [];
      if (catSlug && catSlug2) {
        catSlug.forEach((value) => {
          lstPro.Products.forEach((index) => {
            if (
              index.categoryId.trim() == value._id &&
              index.status === '1'
            ) {
              proSlug1.push(index);
            }
          });
        });
        console.log('proSlug1', proSlug1)
        catSlug2.forEach((value) => {
          proSlug1.forEach((index) => {
            if (index.categoryId.includes(value._id)) {
              showPro.push(index);
            }
          });
        });
      }
    } else if (match3) {
      if (match2.params.slug === 'size') {
        const catSlug = lstCate.Categories.filter(
          (value) => value.slug === match1.params.slug
        );
        const sizeSlug3 = lstSize.Sizes.filter(
          (value) => value.slug === match3.params.slug
        );
        let proSlug1 = [];

        if (catSlug && sizeSlug3) {
          catSlug.forEach((value) => {
            lstPro.Products.forEach((index) => {
              if (
                index.categoryId.includes(value._id) &&
                index.status === '1'
              ) {
                proSlug1.push(index);
              }
            });
          });

          sizeSlug3.forEach((value) => {
            proSlug1.forEach((index) => {
              if (index.size.includes(value._id)) {
                showPro.push(index);
              }
            });
          });
        }
      } else if (match2.params.slug === 'color') {
        const catSlug = lstCate.Categories.filter(
          (value) => value.slug === match1.params.slug
        );
        const colorSlug3 = lstColor.Colors.filter(
          (index) => index.slug === match3.params.slug
        );
        let proSlug1 = [];

        if (catSlug && colorSlug3) {
          catSlug.forEach((value) => {
            lstPro.Products.forEach((index) => {
              if (
                index.categoryId.includes(value._id) &&
                index.status === '1'
              ) {
                proSlug1.push(index);
              }
            });
          });

          colorSlug3.forEach((value) => {
            proSlug1.forEach((index) => {
              if (index.color.includes(value._id)) {
                showPro.push(index);
              }
            });
          });
        }
      } else {
        if (lstCate.Categories) {
          const catSlug = lstCate.Categories.filter(
            (value) => value.slug === match1.params.slug
          );
          const catSlug2 = lstCate.Categories.filter(
            (value) => value.slug === match2.params.slug
          );
          const catSlug3 = lstCate.Categories.filter(
            (value) => value.slug === match3.params.slug
          );
          let proSlug1 = [];
          let proSlug2 = [];

          catSlug.forEach((value) => {
            lstPro.Products.forEach((index) => {
              if (
                index.categoryId.includes(value._id) &&
                index.status === '1'
              ) {
                proSlug1.push(index);
              }
            });
          });
          catSlug2.forEach((value) => {
            proSlug1.forEach((index) => {
              if (index.categoryId.includes(value._id) && index.status === '1') {
                proSlug2.push(index);
              }
            });
          });
          catSlug3.forEach((value) => {
            proSlug2.forEach((index) => {
              if (index.categoryId.includes(value._id) && index.status === '1') {
                showPro.push(index);
              }
            });
          });
        }
      }
    } else if (match1 && lstCate && lstCate.Categories) {
      const catSlug = lstCate.Categories.filter(
        (value) => value.slug === match1.params.slug && value.status === '1'
      );
      catSlug.forEach((value) => {
        lstPro.Products.forEach((index) => {
          if (index.categoryId.includes(value._id) && index.status === '1') {
            showPro.push(index);
          }
        });
      });
    } else if (match4) {
      console.log(true);
    }
  }

  const handleCheckFavorite = (id) => {
    var check = false;
    if (user && user.favorites) {
      user.favorites.forEach((values) => {
        if (values._id === id) {
          return (check = true);
        }
      });
    }
    if (check === false) {
      return (
        // <a></a>
        <div className="icon">
          <i className="icon_heart_alt" style={{ color: 'red' }}></i>
        </div>
      );
    } else {
      return (
        // <a>Đã Yêu Thích Sản Phẩm</a>
        <div className="icon">
          <i className="icon_heart" style={{ color: 'red' }}></i>
        </div>
      );
    }
  };

  // 9sp/3sp 1 ul//

  const renderItems = () => {
    const items = [];

    if (currentTodos.length === 0) {
      return <h1 style={{textAlign:'center'}}>Không Có Sản Phẩm Nào Cả</h1>;
    }
    for (let i = 0; i < currentTodos.length; i += 3) {
      const itemSet = currentTodos.slice(i, i + 3);
      const itemList = itemSet.map((value, key) => {
        let Arr = [];
        const imageArr = value.image.split(',');
        Arr.push(imageArr[0]);
        return (
          <li
            className="thumb border"
            style={{ marginLeft: "-1%", maxHeight: "288px", marginBottom: "3%" }}
            key={key}
          >
            <Link
              to={`/product/${value.slug}`}
              onClick={() =>
                localStorage.setItem(
                  'proCate',
                  value.categoryId
                )
              }
            >
              <img
                src={`https://azey-app.onrender.com/uploads/products/${Arr}`}
                alt="アクリルスタンド"
                style={{ zIndex: '-1' }}
              />
              <div className='mask'>
                <div className='caption' style={{ width: '', height: '' }}>
                  {value.priceDiscount !==
                    0 ? (
                    <div className="ariaSale">
                      <a className target>
                        <img src="./assets/common/imgs/Sale_aria.png" alt="セール" />
                        <img src="./assets/common/imgs/Sale_aria.png" alt="セール" className="blur" />
                      </a>
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* <div>
                    {checkCate(value.categoryId)}
                  </div> */}
                  <p style={{ fontSize: '18px' }}>
                    {value.name}
                  </p>
                  <Link to={`/product/${value.slug}`} onClick={() =>
                    localStorage.setItem(
                      'proCate',
                      value.categoryId
                    )}>Chi Tiết</Link>
                  <br />
                  {handleCheckFavorite(
                    value._id
                  )}
                  {value.priceDiscount !==
                    0 ? (
                    <div className="enFont" style={{ fontSize: '20px' }}>
                      {formatVND(
                        value.priceDiscount
                      )}&nbsp;
                      <span style={{ textDecoration: 'line-through' }}>
                        {' '}
                        {formatVND(
                          value.price
                        )}
                      </span>
                    </div>
                  ) : (
                    <div className="enFont" style={{ fontSize: '20px' }}>
                      {formatVND(
                        value.price
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </li>
        );
      });
      items.push(<ul className="thumbList flex post imgHover">{itemList}</ul>);
    }

    return items;
  };


  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(9);

  const last = currentPage * count;
  const first = last - count;
  const currentTodos = showPro.slice(first, last);
  const npage = Math.ceil(showPro.length / count);
  const btnCount = []
  for (let i = 1; i <= Math.ceil(showPro.length / count); i++) {
    btnCount.push(i);
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  };

  const prePage = (a) => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setActivePage(a);
    }
  }

  const nextPage = (a) => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
      setActivePage(a);
    }
  }

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const checkCate = (id) => {
    var catArr = [];
    lstCate.Categories.forEach((value) => {
      if (id.includes(value._id)) {
        catArr.push(value.name);
      }
    });
    if (catArr.length === 3) {
      return catArr[2].toString();
    } else if (catArr.length === 2) {
      return catArr[1].toString();
    }
  };

  const checkImage = (key) => {
    let Arr = [];
    currentTodos.forEach((value) => {
      const imageArr = value.image.split(',');
      Arr.push(imageArr[0]);
      // for(let i = 0; i< imageArr.length; i++){
      //     console.log(imageArr[i])
      // }
    });
    return Arr[key];
  };

  useEffect(() => {
    document.title = 'IA - Sản Phẩm';
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // axios.get(`https://azey-app.onrender.com/api/product`).then((res) => {
    //   setCurrentTodos(res.data);
    // });
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(getColors());
    dispatch(getSizes());
  }, [dispatch]);

  return (
    <div id="live" className="second" style={{ paddingTop: '60px' }}>
      <div className="articleList">
        <h1 className="title enFont">
          <div className="bar">
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
            <div className="cut" />
          </div>
          <div>Sản Phẩm</div>
        </h1>
        {/*  メインコンテンツ */}
        <div className="ichiran flex commonPadding">
          {/* 左側カラム（アーカイブ） ------------- */}
          <Category
            listCate={lstCate.Categories}
            listColor={lstColor.Colors}
            listSize={lstSize.Sizes}
          />
          {/* 本文 ---------------------------- */}
          <div className="main">
            <div className="list container">
              {renderItems()}
            </div>
            {/* <ul className='thumbList flex post imgHover'></ul> */}

            {/* Tsugi e */}
            {/* <ul className="thumbList flex post imgHover">
                <li className="thumb border" style={{ marginLeft: '-1%' }}>
                  <img src="./assets/common/imgs/shop.jpeg" alt="IA Sports BIGアクリルスタンド" />
                  <div className="mask">
                    <div className="caption">
                      <p style={{ fontSize: '20px' }}>IA Sports BIGアクリルスタンド</p>
                      <a href="#" target>INFO</a>
                    </div>
                  </div>
                </li>
                <li className="thumb border" style={{ marginLeft: '-1%' }}>
                  <img src="./assets/common/imgs/shop.jpeg" alt="IA Sports BIGアクリルスタンド" />
                  <div className="mask">
                    <div className="caption">
                      <p style={{ fontSize: '20px' }}>IA Sports BIGアクリルスタンド</p>
                      <a href="#" target>INFO</a>
                    </div>
                  </div>
                </li>
                <li className="thumb border" style={{ marginLeft: '-1%' }}>
                  <img src="./assets/common/imgs/product_test.jpg" alt="IA Sports BIGアクリルスタンド" />
                  <div className="mask">
                    <div className="caption">
                      <p style={{ fontSize: '20px' }}>IA Sports BIGアクリルスタンド</p>
                      <a href="#" target>INFO</a>
                    </div>
                  </div>
                </li>
              </ul> */}
            {/* Pagination */}
            <div className="pager">
              <ul className='listPage'>
                {/* {
                  btnCount.map((btn) =>
                    <li key={btn} className={btn == activePage ? "select" : ""} onClick={() => handlePageChange(btn)} style={{ cursor: 'cell' }}>
                      <a>{btn}</a>
                    </li>
                  )
                } */}
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={activePage}
                  itemsCountPerPage={9}
                  totalItemsCount={showPro.length}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                />
              </ul>
              {/* <span className="m-pagenation__next" style={{ paddingRight: '5%' }}>
                <a onClick={prePage}>PREV</a>
              </span>
              <span className="m-pagenation__next" style={{ paddingLeft: '5%' }}>
                <a onClick={nextPage}>Next</a>
              </span> */}
            </div>
            {/* End of Pagination */}
          </div>
        </div>{/* ichiran */}
        <span className="next_posts_link" style={{ display: 'none' }}>
          <a href="page/2" />
        </span>
        {/* ローディング */}
        <div className="page-load-status">
          <div className="infinite-scroll-request"><img src="./assets/common/imgs/loading.gif" alt="" /></div>
        </div>
        {/* さらに読み込み */}
        {/* <div className="more clearfix">
          <a className="btmHover view-more-button"><span>Loading...</span></a>
        </div> */}
      </div>
    </div >

  )
}

export default Product