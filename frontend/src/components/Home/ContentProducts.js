/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// import './style.scss';

const ContentProducts = (props) => {
    const listImg = useSelector((state) => state.image.images);
    const user = useSelector((state) => state.user.user);
    var img = [];
    if (listImg.Images) {
        img = listImg.Images.filter(
            (value) => value.position === '1' && value.status === '1'
        );
    }
    var [childCateProducts, setChildCateProducts] = useState([]);
    var [proCateProducts, setProCateProducts] = useState([]);
    var [count, setCount] = useState(1);

    const id = childCateProducts[count];

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
                    <i className="icon_heart_alt" style={{ color: 'red' }}></i>
                </div>
            );
        } else {
            return (
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

    const checkCate = (id) => {
        var catArr = [];
        childCateProducts.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        return catArr.toString();
    };

    const checkImage = (key) => {
        let Arr = [];
        proCateProducts.forEach((value) => {
            const imageArr = value.image.split(',');
            Arr.push(imageArr[0]);
            // for(let i = 0; i< imageArr.length; i++){
            //     console.log(imageArr[i])
            // }
        });
        return Arr[key];
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
        const Products = props.listProducts;
        const ProProducts = props.listProProducts;
        let parentProducts = [];
        if (Products) {
            parentProducts = Products.filter((value) => value.name === 'Vật Phẩm Khác');
        }

        let valueArr = [];
        let Arr = [];
        let proArr = [];
        parentProducts.forEach((data) => {
            if (Products && ProProducts) {
                ProProducts.forEach((value) => {
                    if (
                        value.categoryId.includes(data._id) &&
                        value.status === '1' &&
                        value.deleted === false
                    ) {
                        Arr.push(value);
                    }
                });
                Products.forEach((option) => {
                    if (
                        option.parentCate.includes(data._id) &&
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
                if (option.categoryId.includes(id._id)) {
                    proArr.push(option);
                }
            }
        });
        // setProCateMale(Arr);
        setProCateProducts(proArr);
        proArr = [];
        setChildCateProducts(valueArr);
    }, [props, id]);

    return (
        <section className="">
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
                            {proCateProducts.slice(0, 6).map((value, key) => {
                                return (
                                    <li data-aos="zoom-out" data-aos-delay={200 + key * 200}
                                        key={key}
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
                                                {/* {value.priceDiscount !==
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
                                            )} */}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                {/* shop */}
                <div className="shopLink">
                    <div className="btm">              
                        <a href="#" target>
                            <img src="./assets/common/imgs/shop_hachimaki.png" alt="HACHIMAKI" />
                        </a>
                        <small>国内販売サイト</small>
                    </div>
                    <div className="btm">
                        <a href="#" target>
                            <img src="./assets/common/imgs/shop_otaku.png" alt="OTAKU MODE" />
                        </a>
                        <small>海外販売サイト</small>
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
        </section>
    );
};

export default ContentProducts;
