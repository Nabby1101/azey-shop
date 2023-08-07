import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Category from '../../components/Product/Category';
import { getCategories } from '../../redux/actions/categoryActions';
import { getColors, getSizes } from '../../redux/actions/productActions';
// import './styles/search.scss';

const Search = () => {
    const dispatch = useDispatch();
    const lstCate = useSelector((state) => state.category.categories);
    const lstColor = useSelector((state) => state.product.colors_list);
    const lstSize = useSelector((state) => state.product.sizes_list);
    const lstPro = useSelector((state) => state.product.products_search);
    const user = useSelector((state) => state.user.user);

    var showPro = [];

    if (lstPro) {
        showPro = lstPro;
    }

    const [activePage, setCurrentPage] = useState(1);

    const indexOfLastTodo = activePage * 6;

    const indexOfFirstTodo = indexOfLastTodo - 6;

    const currentTodos = showPro.slice(indexOfFirstTodo, indexOfLastTodo);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                <div className="icon">
                    <i className="icon_heart_alt"></i>
                </div>
            );
        } else {
            return (
                <div className="icon">
                    <i className="icon_heart"></i>
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
        });
        return Arr[key];
    };

    // 9sp/3sp 1 ul//

    const renderItems = () => {
        const items = [];

        if (currentTodos.length === 0) {
            return <h1 style={{ textAlign: 'center' }}>Không Có Sản Phẩm Nào Cả</h1>;
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

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getColors());
        dispatch(getSizes());
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
                    <div>Danh sách tìm kiếm</div>
                </h1>
                <div className="ichiran flex commonPadding">
                    <Category
                        listCate={lstCate.Categories}
                        listColor={lstColor.Colors}
                        listSize={lstSize.Sizes}
                    />
                    {/* -- Breadcrumb Section End -- */}
                    {/* -- Product Shop Section Begin -- */}
                    <div className="main">
                        <div className="list container">
                            {renderItems()}

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
                <div className="more clearfix">
                    <a className="btmHover view-more-button"><span>Loading...</span></a>
                </div>
            </div>
        </div >
    );
};

export default Search;
