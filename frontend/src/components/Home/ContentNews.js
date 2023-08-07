/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// import './style.scss';

const ContentNews = (props) => {
  const listImg = useSelector((state) => state.image.images);
  const user = useSelector((state) => state.user.user);
  const listTopic = useSelector((state) => state.topic.topics);
  const listPost = useSelector((state) => state.post.posts_list);
  var img = [];
  if (listImg.Images) {
    img = listImg.Images.filter(
      (value) => value.position === '1' && value.status === '1'
    );
  }
  var [childCateNews, setChildCateNews] = useState([]);
  var [proCateNews, setProCateNews] = useState([]);
  var [count, setCount] = useState(1);

  const id = childCateNews[count];

  const checkCate = (id) => {
    var catArr = [];
    childCateNews.forEach((value) => {
      if (id.includes(value._id)) {
        catArr.push(value.name);
      }
    });
    return catArr.toString();
  };

  const checkImage = (key) => {
    let Arr = [];
    proCateNews.forEach((value) => {
      const imageArr = value.image.split(',');
      Arr.push(imageArr[0]);
      // for(let i = 0; i< imageArr.length; i++){
      //     console.log(imageArr[i])
      // }
    });
    return Arr[key];
  };

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  useEffect(() => {
    const News = props.listNews;
    const ProNews = props.listProNews;
    let parentNews = [];
    if (News) {
      parentNews = News.filter((value) => value.status === '1');
    }

    let valueArr = [];
    let Arr = [];
    let proArr = [];
    parentNews.forEach((data) => {
      if (News && ProNews) {
        ProNews.forEach((value) => {
          if (
            value.topicId.includes(data._id) &&
            value.status === '1' &&
            value.deleted === false
          ) {
            Arr.push(value);
          }
        });
        News.forEach((option) => {
          if (
            option.parentTopic.includes(data._id) &&
            option.status === '1' &&
            option.deleted === false
          ) {
            valueArr.push(option);
          }
        });
      }
    });
    Arr.forEach((option) => {
      if (id) {
        if (option.topicId.includes(id._id)) {
          proArr.push(option);
        }
      }
    });
    // setProCateMale(Arr);
    setProCateNews(proArr);
    proArr = [];
    setChildCateNews(valueArr);
  }, [props, id]);

  return (
    <section className="">
      <div id="" className="news">
        {/* <div className="img sticky">
                    {img.length !== 0 ? (
                        <div className="col-lg-3">
                            <div
                                className="product-large set-bg m-large large-man"
                                style={{
                                    backgroundImage: `url(https://azey-app.onrender.com/uploads/images/${img[0].image})`,
                                }}
                            >
                                <h2>{img[0].title}</h2>
                                <a href="/category/trang-phuc">Xem thêm</a>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    <img src="./assets/common/imgs/top_live.jpg" alt="" />
                </div> */}
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
            <div>TIN TỨC</div>
            {/* <div className="link">
              <img src="./assets/common/imgs/youtube.png" alt="youtube" className="youtubelogo" /><br />
              {childCateNews.map((value, key) => {
                if (key === count) {
                  return (
                    <a key={key} className='active'>
                      {value.name}
                    </a>
                  );
                } else {
                  return (
                    <a key={key}
                      onClick={() => setCount(key)}
                    >
                      {value.name}
                    </a>
                  );
                }
              })}
              <a href="#" target>1st PLACE OFFICIAL</a>
              <a href="#" target>IA &amp; ONE OFFICIAL</a>
            </div> */}
          </h1>
          <div className=''>
            {proCateNews.length !== 0 ? (
              proCateNews.slice(0, 1).map((value) => {
                return (
                  <div className='topnews clearfix'>
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
              {proCateNews.length !== 0 ? (
                proCateNews.slice(1, 4).map((value, key) => {
                  return (
                    <li className='thumb aos-init' data-aos="zoom-out" data-aos-delay={200 + key * 200}>
                      {/* 日付 */}
                      <div
                        key={value._id}
                        className=''
                        style={{ marginBottom: '15%', borderTop: '1px solid red' }}
                      >
                        <div className="day">{new Date(value.createdAt).toLocaleDateString()}</div>
                        {/* 画像 */}
                        <Link
                          to={`/tin-tuc/${value.slug}`}>
                          <div className="imgfit">
                            <img
                              src={`https://azey-app.onrender.com/uploads/posts/${checkImage(
                                key
                              )}`}
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
                      </div>
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
    </section>
  );
};

export default ContentNews;
