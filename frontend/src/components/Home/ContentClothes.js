/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// import './style.scss';

const ContentClothes = (props) => {
    const listImg = useSelector((state) => state.image.images);
    const user = useSelector((state) => state.user.user);
    var img = [];
    if (listImg.Images) {
        img = listImg.Images.filter(
            (value) => value.position === '1' && value.status === '1'
        );
    }
    var [childCateClothes, setChildCateClothes] = useState([]);
    var [proCateClothes, setProCateClothes] = useState([]);
    var [count, setCount] = useState(1);

    const id = childCateClothes[count];

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
        childCateClothes.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        return catArr.toString();
    };

    const checkImage = (key) => {
        let Arr = [];
        proCateClothes.forEach((value) => {
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
        const Clothes = props.listClothes;
        const ProClothes = props.listProClothes;
        let parentClothes = [];
        if (Clothes) {
            parentClothes = Clothes.filter((value) => value.name === 'Trang Phục');
        }
        let valueArr = [];
        let Arr = [];
        let proArr = [];
        parentClothes.forEach((data) => {
            if (Clothes && ProClothes) {
                ProClothes.forEach((value) => {
                    if (
                        value.categoryId.includes(data._id) &&
                        value.status === '1' &&
                        value.deleted === false
                    ) {
                        Arr.push(value);
                    }
                });
                Clothes.forEach((option) => {
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
        setProCateClothes(proArr);
        proArr = [];
        setChildCateClothes(valueArr);
    }, [props, id]);

    return (
        <section className="">
            <div id="video" className="video">
                <div className="img sticky">
                    {/* {img.length !== 0 ? (
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
                    )} */}
                    <img src="./assets/common/imgs/top_live.jpg" alt="" />
                </div>
                <div className="list">
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
                        <div>TRANG PHỤC</div>
                        <div className="link">
                            {/* <img src="./assets/common/imgs/youtube.png" alt="youtube" className="youtubelogo" /><br /> */}
                            {childCateClothes.map((value, key) => {
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
                            {/* <a href="#" target>1st PLACE OFFICIAL</a>
                            <a href="#" target>IA &amp; ONE OFFICIAL</a> */}
                        </div>
                    </h1>

                    <ul className="flex imgHover">
                        {proCateClothes.slice(0, 4).map((value, key) => {
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
                                        style={{ }}
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
                        })}
                    </ul>
                    {/* more */}
                    <div className="more clearfix">
                        <Link
                            to={'/category/trang-phuc'}
                            className="btmHover">
                            <span>Xem thêm</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentClothes;
