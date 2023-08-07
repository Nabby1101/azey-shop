import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts } from '../../redux/actions/productActions';

const RelatedProducts = (props) => {
    const user = useSelector((state) => state.user.user);
    const cate = props.cate;
    const slug = props.slug;
    const listCate = props.listCate;
    const dispatch = useDispatch();
    const lstPro = useSelector((state) => state.product.products_list);

    var relatedPro = [];
    if (lstPro && lstPro.Products) {
        relatedPro = lstPro.Products.filter(
            (value) =>
                value.categoryId === cate &&
                value.slug !== slug &&
                value.status === '1'
        );
    }

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const checkCate = (id) => {
        var catArr = [];
        listCate.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        return catArr.toString();
    };

    // const checkSlug = (id) => {
    //     var catArr = [];
    //     var catSlug = '';
    //     listCate.forEach((value) => {
    //         if (id.includes(value._id)) {
    //             catArr.push(value.slug);
    //         }
    //     });
    //     catArr.forEach((value) => {
    //         catSlug += value + '/';
    //     });
    //     return catSlug.slice(0, -1);
    // };

    const checkImage = (key) => {
        let Arr = [];
        relatedPro.forEach((value) => {
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
                <a></a>
            );
        } else {
            return (
                <a>Đã Yêu Thích Sản Phẩm</a>
            );
        }
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div id='news' className="second" style={{float: 'left'}}>
            <div className="commonWidth commonPadding">
                <div className="enFont">
                    <h2 style={{ textAlign: 'center' }}>Sản Phẩm Liên Quan</h2>
                </div>
                <div className="ichiran flex">
                    <div className='main flex'>
                        <div className='list container' style={{width: '100%', borderLeft: 'none'}}>
                            <ul className='thumbList flex post imgHover'>
                                {relatedPro.length !== 0 ? (
                                    relatedPro.slice(0,3).map((value, key) => {
                                        return (
                                            <li className='thumb border' style={{ marginLeft: '-1%', marginBottom: '3%', height:'333px', background: 'none'}}>
                                                <div
                                                    key={key}
                                                    className=''
                                                >
                                                    <Link
                                                        to={`/product/${value.slug}`}
                                                        // target
                                                        onClick={() =>
                                                            localStorage.setItem(
                                                                'proCate',
                                                                value.categoryId
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={`https://azey-app.onrender.com/uploads/products/${checkImage(key)}`}
                                                            alt="アクリルスタンド"
                                                            style={{ zIndex: '-1', width: '100%', height: '' }}
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
                                                                <p style={{ fontSize: '20px' }}>
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
                                                                {/* {value.priceDiscount !==
                                                  0 ? (
                                                  <div className="">
                                                    {formatVND(
                                                      value.priceDiscount
                                                    )}
                                                    <span>
                                                      {' '}
                                                      {formatVND(
                                                        value.price
                                                      )}
                                                    </span>
                                                  </div>
                                                ) : (
                                                  <div className="">
                                                    {formatVND(
                                                      value.price
                                                    )}
                                                  </div>
                                                )} */}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </li>
                                            // </ul>
                                        );
                                    })
                                ) : (
                                    <div>
                                        <h2>Không Có Sản Phẩm Nào Cả</h2>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;
