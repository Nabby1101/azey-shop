import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter, useParams } from 'react-router-dom';
import { getPosts, getPostSlug } from '../../redux/actions/postActions';
import { getTopics } from '../../redux/actions/topicActions';
import { getProducts } from '../../redux/actions/productActions';

const DetailNews = (props) => {
    const dispatch = useDispatch();
    // const { id } = useParams();
    const slug = props.match.params.slug;
    const post = useSelector((state) => state.post.post);
    const listTopic = useSelector((state) => state.topic.topics);
    const listPost = useSelector((state) => state.post.posts_list);
    const lstPro = useSelector((state) => state.product.products_list);
    const pro = [];

    var lstTopic = [];
    if (listTopic.Topics) {
        lstTopic = listTopic.Topics.filter((value) => value.status === '1');
    }

    var listPostByTopic = [];
    if (listPost && listPost.Posts) {
        listPostByTopic = listPost.Posts.filter(
            (value) => value.topicId === post.topicId && value.status === '1'
        );
    }
    var i = 0;

    listPostByTopic.forEach((value, key) => {
        if (value._id === post._id) {
            i = key;
        }
    });

    if (post.productId && lstPro && lstPro.Products) {
        lstPro.Products.forEach((item) => {
            if (post.productId.includes(item._id)) {
                pro.push(item);
            }
        });
    }

    const checkTopic = (id) => {
        var topicArr = [];
        if (listTopic && listTopic.Topics) {
            listTopic.Topics.forEach((value) => {
                if (id.includes(value._id)) {
                    topicArr.push(value.name);
                }
            });
        }
        return topicArr.toString();
    };

    const checkImage = (key) => {
        let Arr = [];
        pro.forEach((value) => {
            const imageArr = value.image.split(',');
            Arr.push(imageArr[0]);
        });
        return Arr[key];
    };

    useEffect(() => {
        document.title = 'IA - ' + post.title;
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        dispatch(getPosts());
        dispatch(getTopics());
        if (!lstPro.Products) {
            dispatch(getProducts());
        }
        if (slug) {
            dispatch(getPostSlug(slug));
        }
    }, [dispatch, lstPro.Products, slug]);

    return (
        <div id="news" className="second">
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
                {/*  メインコンテンツ */}
                <div className="article flex commonPadding">
                    {/* Menu ------------- */}
                    <div className="navColumn">
                        <form id="searchBox" action="" method="get" className="flex">
                            <input id="s-box" name="s" type="text" placeholder="キーワードを入力" />
                            <button className="btmHover enFont" type="submit"><span>Tìm Kiếm</span></button>
                        </form>
                        <ul className="beforeLine">
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
                    </div>
                    {/* 本文 ---------------------------- */}
                    {post.length !== 0 ? (
                        <div className="main">
                            <div className="topimg imgfit">
                                <img
                                    src={`https://azey-app.onrender.com/uploads/posts/${post.image}`}
                                    alt="画像"
                                />
                            </div>
                            {/* 日付 */}
                            <div className="day">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                            {/*  記事タイトル */}
                            <div className="wp_title">
                                {/* カテゴリー */}
                                <div className="cat">
                                    <ul className="post-categories">
                                        <li>
                                            <a>
                                                {checkTopic(
                                                    post.topicId
                                                )}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {post.title}
                            </div>
                            <div className="honbun">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: post.summary,
                                    }}
                                >{/* Honbun */}</p>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: post.content,
                                    }}
                                >{/* Honbun */}</p>
                                <div className="sns-share">
                                    {/* Guess See! */}
                                </div>
                                {/* <div className="tag-share">
                                    <div className="details-tag">
                                        <ul>
                                            <li>
                                                <i className="fa fa-tags"></i>
                                            </li>
                                            {listTopic.Topics &&
                                                listTopic.Topics.length !==
                                                0 ? (
                                                listTopic.Topics.filter(
                                                    (item) =>
                                                        item.slug !==
                                                        props.location.pathname.split(
                                                            '/'
                                                        )[2]
                                                ).map((value) => {
                                                    return (
                                                        <Link
                                                            to={`/chu-de/${value.slug}`}
                                                            key={
                                                                value._id
                                                            }
                                                        >
                                                            <li>
                                                                {
                                                                    value.name
                                                                }
                                                            </li>
                                                        </Link>
                                                    );
                                                })
                                            ) : (
                                                <li></li>
                                            )}
                                        </ul>
                                    </div>
                                </div> */}
                                {/* <div className="blog-post">
                                    <div className="row">
                                        {listPostByTopic.length !==
                                            0 ? (
                                            i === 0 ? (
                                                <>
                                                    <div className="col-lg-5 col-md-6"></div>
                                                    <div className="col-lg-5 offset-lg-2 col-md-6">
                                                        <Link
                                                            to={`/tin-tuc/${listPostByTopic[
                                                                    i +
                                                                    1
                                                                ].slug
                                                                }`}
                                                            className="next-blog"
                                                        >
                                                            <div className="nb-pic">
                                                                <img
                                                                    src={`https://azey-app.onrender.com/uploads/posts/${listPostByTopic[
                                                                            i +
                                                                            1
                                                                        ]
                                                                            .image
                                                                        }`}
                                                                    alt=""
                                                                />
                                                                <i className="ti-arrow-right"></i>
                                                            </div>
                                                            <div className="nb-text">
                                                                <span>
                                                                    Tin
                                                                    Tiếp
                                                                    Theo:
                                                                </span>
                                                                <h5>
                                                                    {
                                                                        listPostByTopic[
                                                                            i +
                                                                            1
                                                                        ]
                                                                            .title
                                                                    }
                                                                </h5>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </>
                                            ) : i ===
                                                listPostByTopic.length -
                                                1 ? (
                                                <>
                                                    <div className="col-lg-5 col-md-6">
                                                        <Link
                                                            to={`/tin-tuc/${listPostByTopic[
                                                                    i -
                                                                    1
                                                                ].slug
                                                                }`}
                                                            className="prev-blog"
                                                        >
                                                            <div className="pb-pic">
                                                                <i className="ti-arrow-left"></i>
                                                                <img
                                                                    src={`https://azey-app.onrender.com/uploads/posts/${listPostByTopic[
                                                                            i -
                                                                            1
                                                                        ]
                                                                            .image
                                                                        }`}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="pb-text">
                                                                <span>
                                                                    Tin
                                                                    Trước:
                                                                </span>
                                                                <h5>
                                                                    {
                                                                        listPostByTopic[
                                                                            i -
                                                                            1
                                                                        ]
                                                                            .title
                                                                    }
                                                                </h5>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="col-lg-5 offset-lg-2 col-md-6"></div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="col-lg-5 col-md-6">
                                                        <Link
                                                            to={`/tin-tuc/${listPostByTopic[
                                                                    i -
                                                                    1
                                                                ].slug
                                                                }`}
                                                            className="prev-blog"
                                                        >
                                                            <div className="pb-pic">
                                                                <i className="ti-arrow-left"></i>
                                                                <img
                                                                    src={`https://azey-app.onrender.com/uploads/posts/${listPostByTopic[
                                                                            i -
                                                                            1
                                                                        ]
                                                                            .image
                                                                        }`}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="pb-text">
                                                                <span>
                                                                    Tin
                                                                    Trước:
                                                                </span>
                                                                <h5>
                                                                    {
                                                                        listPostByTopic[
                                                                            i -
                                                                            1
                                                                        ]
                                                                            .title
                                                                    }
                                                                </h5>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="col-lg-5 offset-lg-2 col-md-6">
                                                        <Link
                                                            to={`/tin-tuc/${listPostByTopic[
                                                                    i +
                                                                    1
                                                                ].slug
                                                                }`}
                                                            className="next-blog"
                                                        >
                                                            <div className="nb-pic">
                                                                <img
                                                                    src={`https://azey-app.onrender.com/uploads/posts/${listPostByTopic[
                                                                            i +
                                                                            1
                                                                        ]
                                                                            .image
                                                                        }`}
                                                                    alt=""
                                                                />
                                                                <i className="ti-arrow-right"></i>
                                                            </div>
                                                            <div className="nb-text">
                                                                <span>
                                                                    Tin
                                                                    Tiếp
                                                                    Theo:
                                                                </span>
                                                                <h5>
                                                                    {
                                                                        listPostByTopic[
                                                                            i +
                                                                            1
                                                                        ]
                                                                            .title
                                                                    }
                                                                </h5>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </>
                                            )
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div> */}
                            </div>
                            <div className='topnews clearfix' style={{ margin: '0' }}>
                                {pro.length !== 0 ? (
                                    <div className="blog-more">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="section-title">
                                                    <h2 style={{ textAlign: 'center' }}>
                                                        Có thể bạn sẽ
                                                        thích các sản
                                                        phẩm này
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ width: '100%', float: 'left' }}>
                                            {pro
                                                .slice(0, 3)
                                                .map((value, key) => {
                                                    return (
                                                        <div
                                                            key={key}
                                                            className=""
                                                            style={{ float: 'left', margin: '5%', border: '1px solid grey' }}
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
                                                                    style={{
                                                                        height: '200px',
                                                                    }}
                                                                    src={`https://azey-app.onrender.com/uploads/products/${checkImage(
                                                                        key
                                                                    )}`}
                                                                    alt=""
                                                                />
                                                            </Link>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <hr/>
                            <div className="footbtm">
                                <a href="/tin-tuc" className="beforeLine">HẾT! , TRỞ LẠI TRANG TIN TỨC</a><br />
                                {/* <a className="beforeLine" href="#" rel="prev">PASSED</a><br />
                                <a className="beforeLine" href="#" rel="next">FUTUER</a> */}
                            </div>
                        </div>

                    ) : (
                        <div>Post Not Found</div>
                    )}
                </div>
            </div>
            {/* #ページ名 */}
        </div>
    )
}


export default withRouter(DetailNews);