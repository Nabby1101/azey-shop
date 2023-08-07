import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useRouteMatch, withRouter } from 'react-router-dom';
import { getPosts } from '../../redux/actions/postActions';
import { getTopics } from '../../redux/actions/topicActions';

const News = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  let match = useRouteMatch('/chu-de/:slug');
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


  // console.log(list)

  // const checkSlug = (id) => {
  //     var topicSlug = '';
  //     if (listTopic.Topics) {
  //         listTopic.Topics.forEach((value) => {
  //             if (id.includes(value._id)) {
  //                 topicSlug += value.slug + '/';
  //             }
  //         });
  //     }
  //     return topicSlug.slice(0, -1);
  // };

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

  // 9sp/3sp 1 ul//

  const renderItems = () => {
    const items = [];

    if (list.length === 0) {
      return <h1 style={{ textAlign: 'center' }}>Không Có Sản Phẩm Nào Cả</h1>;
    }
    for (let i = 1 ;i < limit && i < list.length; i += 3) {
      const itemSet = list.slice(i, i + 3);
      const itemList = itemSet.map((value, key) => {
        let Arr = [];
        const imageArr = value.image.split(',');
        Arr.push(imageArr[0]);
        return (
          <li className='thumb' key={key}>
            {/* 日付 */}
            
              <div className="day">{new Date(value.createdAt).toLocaleDateString()}</div>
              {/* 画像 */}
              <Link
                to={`/tin-tuc/${value.slug}`}>
                <div className="imgfit">
                  <img
                    src={`https://nabby-app-backend.onrender.com/uploads/posts/${value.image}`}
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
        );
      });
      items.push(<ul className="thumbList flex post">{itemList}</ul>);
    }

    return items;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setLimit(7);
    dispatch(getTopics());
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div id="news" className="second" style={{ paddingTop: '60px' }}>
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
          <div>Tin Tức</div>
        </h1>
        {/* 記事読み込み ---------------------------- */}
        {/*  最新ニュース ------------------ */}
        {/*Fist News */}
        <div>
          {list.length !== 0 ? (
            list.slice(0, 1).map((value) => {
              return (
                <div className='topnews clearfix'>
                  <Link
                    key={value._id}
                    to={`/tin-tuc/${value.slug}`}
                    className=''
                  >
                    <div className='newstop imgfit'>
                      <img
                        src={`https://nabby-app-backend.onrender.com/uploads/posts/${value.image}`}
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
        {/*  メインコンテンツ */}
        <div className="ichiran flex commonPadding">
          {/* 左側カラム（アーカイブ） ------------- */}
          <div className="navColumn">
            <form id="searchBox" action="#" method="get" className="flex">
              <input id="s-box" name="s" type="text" placeholder="キーワードを入力" />
              <button className="btmHover enFont" type="submit"><span>Tìm Kiếm</span></button>
            </form>
            <ul className='beforeLine'>
              {lstTopic.length !== 0 ? (
                lstTopic.map((value, key) => {
                  return (
                    <li key={key}>
                      <Link
                        to={`/chu-de/${value.slug}`}
                      >
                        {value.name}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li></li>
              )}
            </ul>
            {/* <ul className="beforeLine">
              <li><a href="https://ia-aria.com/news/">Mới</a></li>
              <li><a href="https://ia-aria.com/category/goods/">Nổi Bật</a></li>
              <li><a href="https://ia-aria.com/category/event/">Sự Kiện</a></li>
            </ul> */}
          </div>
          {/* 本文 ---------------------------- */}
          <div className="main">
            <div className="list container">
              {renderItems()}
                {/* {list.length !== 0 ? (
                  list.slice(1, limit).map((value) => {
                    return (
                      renderItems().slice(1, limit)
                    )
                  })
                ) : (
                  <div>Không Có Tin Tức Nào Cả.</div>
                )} */}
            </div>
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
        {list.length !== 0 && list.length > limit ? (
          <div
            className="more clearfix"
            onClick={() => setLimit(limit + 3)}
          >
            <Link
              to={location.pathname}
              className="btmHover view-more-button"
            >
              <span>TIN TỨC KHÁC</span>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}


export default News