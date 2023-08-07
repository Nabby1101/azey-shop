/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// import './style.scss';

const ContentAccessory = (props) => {
    const listImg = useSelector((state) => state.image.images);
    const user = useSelector((state) => state.user.user);
    var img = [];
    if (listImg.Images) {
        img = listImg.Images.filter(
            (value) => value.position === '1' && value.status === '1'
        );
    }
    var [childCateAccessory, setChildCateAccessory] = useState([]);
    var [proCateAccessory, setProCateAccessory] = useState([]);
    var [count, setCount] = useState(1);

    const id = childCateAccessory[count];

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
        childCateAccessory.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        return catArr.toString();
    };

    const checkImage = (key) => {
        let Arr = [];
        proCateAccessory.forEach((value) => {
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
        const Accessory = props.listAccessory;
        const ProAccessory = props.listProAccessory;
        let parentAccessory = [];
        if (Accessory) {
            parentAccessory = Accessory.filter((value) => value.name === 'Vật Phẩm Khác');
        }
        let valueArr = [];
        let Arr = [];
        let proArr = [];
        parentAccessory.forEach((data) => {
            if (Accessory && ProAccessory) {
                ProAccessory.forEach((value) => {
                    if (
                        value.categoryId.includes(data._id) &&
                        value.status === '1' &&
                        value.deleted === false
                    ) {
                        Arr.push(value);
                    }
                });
                Accessory.forEach((option) => {
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
        setProCateAccessory(proArr);
        proArr = [];
        setChildCateAccessory(valueArr);
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
                                    backgroundImage: `url(https://nabby-app-backend.onrender.com/uploads/images/${img[0].image})`,
                                }}
                            >
                                <h2>{img[0].title}</h2>
                                <a href="/category/trang-phuc">Xem thêm</a>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )} */}
                    <img src="./assets/common/imgs/lolhhpc.jpg" alt="" />
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
                        <div>VẬT PHẨM KHÁC</div>
                        <div className="link">
                            {/* <img src="./assets/common/imgs/youtube.png" alt="youtube" className="youtubelogo" /><br /> */}
                            {childCateAccessory.map((value, key) => {
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
                        {proCateAccessory.slice(0, 4).map((value, key) => {
                            return (
                                <li data-aos="zoom-out" data-aos-delay={200 + key * 200}
                                    key={key}
                                    className='aos-init'
                                >
                                    <img
                                        src={`https://nabby-app-backend.onrender.com/uploads/products/${checkImage(
                                            key
                                        )}`}
                                        alt="サムネイル"
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
                            to={'/category/vat-pham-khac'}
                            className="btmHover">
                            <span>Xem thêm</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentAccessory;
