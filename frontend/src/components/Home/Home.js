import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import ContentClothes from './ContentClothes';
import ContentAccessory from './ContentAccessory';

import { getCategories } from '../../redux/actions/categoryActions';
import { getPosts } from '../../redux/actions/postActions';
import { getColor, getProducts, getSize } from '../../redux/actions/productActions';
import { getTopics } from '../../redux/actions/topicActions';
import { getImages } from '../../redux/actions/imageActions';

import {
  getRole,
  getUserFacebook,
  getUserGoogle,
} from '../../redux/actions/userActions';
import ContentNews from './ContentNews';
import ContentProducts from './ContentProducts';
import api from '../../api';

const Home = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  let match = useRouteMatch('/chu-de/:slug');
  let matchPro = useRouteMatch('/product/:slug');

  // Topic
  const [limit, setLimit] = useState(0);
  const listTopic = useSelector((state) => state.topic.topics);
  const listPost = useSelector((state) => state.post.posts_list);

  var lstTopic = [];
  if (listTopic.Topics) {
    lstTopic = listTopic.Topics.filter((value) => value.status === '1');
  }

  var list = [];
  if (listPost.Posts) {
    list = listPost.Posts.filter((value) => value.status === '1');
  }

  if (match) {
    list = [];
    if (listTopic.Topics) {
      let slugTopic = listTopic.Topics.filter(
        (value) => value.slug === match.params.slug
      );
      console.log('slugTopic', slugTopic)
      slugTopic.forEach((item) => {
        listPost.Posts.forEach((value) => {
          if (value.topicId.includes(item._id) && value.status === '1') {
            list.push(value);
          }
        });
      });
    }
  }

  const checkTopic = (id) => {
    if (id && listTopic.Topics) {
      var topicArr = [];
      listTopic.Topics.forEach((value) => {
        if (id.includes(value._id)) {
          topicArr.push(value.name);
        }
      });
      return topicArr.toString();
    }
  };

  // Products
  const lstCate = useSelector((state) => state.category.categories);
  const lstColor = useSelector((state) => state.product.colors_list);
  const lstSize = useSelector((state) => state.product.sizes_list);
  const lstPro = useSelector((state) => state.product.products_list);
  const user = useSelector((state) => state.user.user);

  var showCate = [];
  if (lstCate.Categories) {
    showCate = lstCate.Categories.filter((value) => value.status === '1');
  }

  var showPro = [];
  if (lstPro.Products) {
    showPro = lstPro.Products.filter((value) => value.status === '1');
  }

  if (match) {
    showPro = [];
    if (lstCate.Categories) {
      let slugCategory = lstCate.Categories.filter(
        (value) => value.slug === match.params.slug
      );
      console.log('slugCategory', slugCategory)
      slugCategory.forEach((item) => {
        lstPro.Products.forEach((value) => {
          if (value.categoryIdId.includes(item._id) && value.status === '1') {
            showPro.push(value);
          }
        });
      });
    }
  }

  const checkCategory = (id) => {
    if (id && lstCate.Categories) {
      var cateArr = [];
      lstCate.Categories.forEach((value) => {
        if (id.includes(value._id)) {
          cateArr.push(value.name);
        }
      });
      return cateArr.toString();
    }
  };

  const checkImage = (key) => {
    let Arr = [];
    showPro.forEach((value) => {
      const imageArr = value.image.split(',');
      Arr.push(imageArr[0]);
      // for(let i = 0; i< imageArr.length; i++){
      //     console.log(imageArr[i])
      // }
    });
    return Arr[key];
  };

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

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const id =
    localStorage.getItem('userInfo') !== null
      ? JSON.parse(localStorage.getItem('userInfo'))._id
      : null;

  const authGoogle = localStorage.getItem('authGoogle')
    ? JSON.parse(localStorage.getItem('authGoogle')).isGoogle
    : false;

  const authFacebook = localStorage.getItem('authFacebook')
    ? JSON.parse(localStorage.getItem('authFacebook')).isFacebook
    : false;

  useEffect(() => {
    setLimit(5);
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(getPosts());
    dispatch(getTopics());
    dispatch(getImages());
    dispatch(getColor());
    dispatch(getSize());

    if (!window.location.hash) {
      window.location = window.location + '#trang-chu';
      window.location.reload();
    }

    if (id) dispatch(getRole(id));

    if (authGoogle === true) {
      dispatch(getUserGoogle());
    }

    if (authFacebook === true) {
      dispatch(getUserFacebook());
    }
  }, [id, dispatch, authGoogle, authFacebook]);

  return (
    <div id="top" className="">
      {/* キービジュアル ///////////////////////////////////////// */}
      <div className="keyvisual flex">
        {/* ロゴ */}
        <div className="logo">
          <img src="./assets/common/imgs/logo.svg" alt="IA" className="ia_logo" style={{ width: '100%' }} />
          <div className="blinking"><img src="./assets/common/imgs/arrow_down.svg" alt="arrow" /></div>
        </div>
        画像
        <div className="slide">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <picture>
                  <source media="(min-width: 480px)" srcSet="./assets/common/imgs/名称未設定-3.png" />
                  <img src="./assets/common/imgs/mob_main_202010_-1.jpg" className="slide-img" />
                </picture>
              </div>
            </div>
            {/* ページネーションを表示する場合 */}
            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
      {/* VIDEO/ CLOTHES ///////////////////////////////////////// */}
      <ContentClothes
        listClothes={lstCate.Categories}
        listProClothes={lstPro.Products}
      />
      {/* ARIA ///////////////////MUSIC/ ACCESSORY ///////////////////// */}
      <ContentAccessory
        listAccessory={lstCate.Categories}
        listProAccessory={lstPro.Products}
      />
      {/* NEWS ///////////////////////////////////////// */}
      <div id="" className="news">
        <div className="articleList">
          <h1 className="title enFont">
            {/* Light is so beautiful */}
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
            <div>TIN TỨC</div>
          </h1>
          <div className='topnews clearfix'>
            {list.length !== 0 ? (
              list.slice(0, 1).map((value) => {
                return (
                  <div className=''>
                    <Link
                      key={value._id}
                      to={`/tin-tuc/${value.slug}`}
                      className=''
                    >
                      <div className='newstop imgfit'>
                        <img
                          src={`https://azey-app.onrender.com/uploads/posts/${value.image}`}
                          alt='画像'
                        />
                      </div>
                    </Link>
                    <div className='txt'>
                      {/* 日付 */}
                      <div className='day'>
                        {/*  記事タイトル */}
                        {new Date(value.createdAt).toLocaleDateString()}
                      </div>
                      <div className="wp_title">
                        {/* カテゴリー */}
                        <div className="cat">
                          <ul>
                            <li>
                              <a>
                                {checkTopic(
                                  value.topicId
                                )}
                              </a>
                            </li>
                          </ul>
                        </div>
                        <Link
                          to={`/tin-tuc/${value.slug}`}
                        >
                          {value.title}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
          {/* 本文 ---------------------------- */}
          <div className="ichiran flex commonPadding">
            <ul className="thumbList flex">
              {list.length !== 0 ? (
                list.slice(1, limit).map((value, key) => {
                  return (
                    <li
                      key={key}
                      className='thumb aos-init'
                      data-aos="zoom-out"
                      data-aos-delay={200 + key * 200}>
                      {/* 日付 */}

                      <div className="day">{new Date(value.createdAt).toLocaleDateString()}</div>
                      {/* 画像 */}
                      <Link
                        to={`/tin-tuc/${value.slug}`}>
                        <div className="imgfit">
                          <img
                            src={`https://azey-app.onrender.com/uploads/posts/${value.image}`}
                            alt="画像" />
                        </div>
                      </Link>
                      {/* カテゴリー */}
                      <div className="cat">
                        <ul>
                          <ul className="post-categories">
                            <li>
                              <a>
                                {checkTopic(
                                  value.topicId
                                )}
                              </a>
                            </li>
                            {/* <li><a href="#" rel="category tag">Sự Kiện</a></li>
                                  <li><a href="#" rel="category tag">Nổi Bật</a></li> */}
                          </ul>
                        </ul>
                      </div>
                      {/* 記事タイトル */}
                      <Link
                        to={`/tin-tuc/${value.slug}`}
                      >
                        <h1><span>【{checkTopic(value.topicId)}】</span>{value.title}</h1>
                      </Link>
                    </li>
                  )
                })
              ) : (
                <div>Không Có Tin Tức Nào Cả.</div>
              )}
            </ul>
          </div>
          {/* more */}
          <div className="more clearfix">
            <Link
              to={'/tin-tuc'}
              className="btmHover">
              <span>Xem thêm</span>
            </Link>
          </div>
        </div>
      </div>

      {/* SHOP ///////////////////////////////////////// */}
      <div id="" className="shop">
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
          <div>SHOP</div>
        </h1>
        <div className="commonPadding">
          <div className="item">
            <ul className="imgHover">
              {showPro.length !== 0 ? (
                showPro.slice(0, 6).map((value, key) => {
                  return (
                    <li
                      key={key}
                      data-aos="zoom-out"
                      data-aos-delay={200 + key * 200}
                      className='aos-init'
                    >
                      <img
                        src={`https://azey-app.onrender.com/uploads/products/${checkImage(
                          key
                        )}`}
                        alt="サムネイル"
                        style={{}}
                      />
                      <div className="mask">
                        <div className="caption">
                          {value.priceDiscount !==
                            0 ? (
                            <div className="ariaSale">
                              <a className='' style={{}}>
                                <img src="./assets/common/imgs/Sale_aria.png" alt="セール" />
                                <img src="./assets/common/imgs/Sale_aria.png" alt="セール" className="blur" />
                              </a>
                            </div>
                          ) : (
                            <></>
                          )}
                          <p style={{ fontSize: '20px' }}>【 {value.name} 】</p>
                          <Link
                            to={`/product/${value.slug}`}
                            onClick={() =>
                              localStorage.setItem(
                                'proCate',
                                value.categoryId
                              )}
                          >Chi Tiết
                          </Link>
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
                    </li>
                  );
                })
              ) : (
                <div>
                  <h1>Không Có Sản Phẩm Nào Cả</h1>
                </div>
              )}
            </ul>
          </div>
        </div>
        {/* shop */}
        <div className="shopLink">
          <div className="btm">
            <Link to={`/category/trang-phuc`}>
              <img src="https://azey-app.onrender.com/uploads/categories/2023-06-04T14-41-56.061Z-4.jpg" alt="HACHIMAKI" />
            </Link>
            <small style={{backgroundColor: 'aquamarine'}}><b>TRANG PHỤC</b></small>
          </div>
          <div className="btm">
            <Link to={`/category/vat-pham-khac`}>
              <img src="https://azey-app.onrender.com/uploads/categories/2022-12-12T12-56-56.607Z-cate_2.jpg" alt="OTAKU MODE" />
            </Link>
            <small style={{backgroundColor: 'aquamarine'}}><b>VẬT PHẨM KHÁC</b></small>
          </div>
        </div>
        {/* more */}
        <div className="more clearfix">
          <Link
            to={'/category/tat-ca'}
            className="btmHover">
            <span>Xem thêm</span>
          </Link>
        </div>
      </div>
    </div>
  )
}


export default Home