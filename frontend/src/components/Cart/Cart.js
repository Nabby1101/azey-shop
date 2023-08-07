/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import {
    decreaseQuantity,
    deleteAllCart,
    deleteCart,
    increaseQuantity,
} from '../../redux/actions/cartActions';
import { getColors, getSizes } from '../../redux/actions/productActions';
// import './styles/shoppingCart.scss';

const Cart = () => {
    const dispatch = useDispatch();
    const proCart = useSelector((state) => state.cart.carts);
    const lstColors = useSelector((state) => state.product.colors_list);
    const lstSizes = useSelector((state) => state.product.sizes_list);
    const [totalCart, setTotalCart] = useState(0);
    const [qtyPro, setQtyPro] = useState();
    let { url } = useRouteMatch();

    const QtyUpdateIncr = (key, quantity) => {
        dispatch(increaseQuantity(key));
        setQtyPro(quantity);
        handleChangeQty();
    };

    const QtyUpdateDecr = (key, quantity) => {
        dispatch(decreaseQuantity(key));
        setQtyPro(quantity);
        handleChangeQty();
    };

    const handleChangeQty = () => {
        if (proCart.length !== 0) {
            const total = proCart.reduce((prev, item) => {
                return prev + item.price * item.quantity;
            }, 0);
            setTotalCart(total);
        }
    };

    const handleDelate = (key) => {
        dispatch(deleteCart(key));
        if (key !== 0) {
            handleChangeQty();
        } else {
            setTotalCart(0);
        }
        // window.location.reload();
    };

    const deleteAll = () => {
        dispatch(deleteAllCart());
        setTotalCart(0);
        // window.location.reload();
    };

    const checkColor = (id) => {
        var colorArr = [];
        if (lstColors.Colors) {
            lstColors.Colors.forEach((value) => {
                if (id.includes(value._id)) {
                    colorArr.push(value.code);
                }
            });
        }
        return colorArr.toString();
    };

    const checkSize = (id) => {
        var sizeArr = [];
        if (lstSizes.Sizes) {
            lstSizes.Sizes.forEach((value) => {
                if (id.includes(value._id)) {
                    sizeArr.push(value.name);
                }
            });
        }
        return <b>{sizeArr.toString()}</b>;
    };

    const checkImage = (key) => {
        let Arr = [];
        proCart.forEach((value) => {
            const imageArr = value.image.split(',');
            Arr.push(imageArr[0]);
        });
        return Arr[key];
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    useEffect(() => {
        document.title = 'IA - Giỏ Hàng'
        dispatch(getColors());
        dispatch(getSizes());

        const getTotal = () => {
            if (proCart.length !== 0) {
                const total = proCart.reduce((prev, item) => {
                    return prev + item.price * item.quantity;
                }, 0);
                setTotalCart(total);
            }
        };
        getTotal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [proCart]);

    return (
        <div id="news" className="second" style={{ paddingTop: '60px' }}>
            <div className="musiclist">
                <h1 className="title enFont">
                    {/*Light is so beautiful*/}
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
                    <div>Giỏ Hàng</div>
                </h1>
                {proCart.length !== 0 ? (
                    <div className="commonPadding">
                        <table className="bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Hình Ảnh</th>
                                    <th className="text-center">Tên Sản Phẩm</th>
                                    <th className="text-center" style={{ width: '75px' }}>Size</th>
                                    <th className="text-center">Màu</th>
                                    <th className="text-center">Đơn Giá</th>
                                    <th className="text-center">Số Lượng</th>
                                    <th>Tổng</th>
                                    <th style={{ borderRight: '1px solid #333' }}>
                                        <p
                                            style={{cursor: 'pointer', color: 'red'}}
                                            onClick={() =>
                                                deleteAll()
                                            }
                                            className=''
                                        >Xóa hết</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {proCart.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="cart-pic first-row">
                                                <img
                                                    src={`https://nabby-app-backend.onrender.com/uploads/products/${checkImage(
                                                        key
                                                    )}`}
                                                    alt=""
                                                    style={{ width: '300px' }}
                                                />
                                            </td>
                                            <td className="cart-title first-row">
                                                <h5>{item.name}</h5>
                                            </td>
                                            {item.size.length !==
                                                0 ? (
                                                <td className="cart-size first-row">
                                                    <h5>
                                                        {checkSize(
                                                            item.size
                                                        )}
                                                    </h5>
                                                </td>
                                            ) : (
                                                <td
                                                    className="cart-size first-row"
                                                    style={{
                                                        paddingLeft:
                                                            '20px',
                                                        paddingRight:
                                                            '15px',
                                                        fontStyle:
                                                            'italic',
                                                        opacity:
                                                            '50%',
                                                    }}
                                                >
                                                    <h5>
                                                        Không có
                                                    </h5>
                                                </td>
                                            )}

                                            <td className="cart-color first-row">
                                                {item.color
                                                    .length !==
                                                    0 ? (
                                                    <div
                                                        className="code-color"
                                                        style={{
                                                            backgroundColor:
                                                                checkColor(
                                                                    item.color
                                                                ),
                                                        }}
                                                    >
                                                        {' '}
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            paddingLeft:
                                                                '15px',
                                                            paddingRight:
                                                                '15px',
                                                            fontStyle:
                                                                'italic',
                                                            opacity:
                                                                '50%',
                                                            fontSize:
                                                                '18px',
                                                        }}
                                                    >
                                                        <h5>
                                                            Không có
                                                        </h5>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-price first-row">
                                                {formatVND(
                                                    item.price
                                                )}
                                            </td>
                                            <td className="qua-col first-row">
                                                <div className="quantity">
                                                    <div className="pro-qty">
                                                        <span
                                                            onClick={() =>
                                                                QtyUpdateDecr(
                                                                    key,
                                                                    item.quantity
                                                                )
                                                            }
                                                            className="changeQuantity"
                                                        >
                                                            -
                                                        </span>
                                                        <input
                                                            type="text"
                                                            value={
                                                                item.quantity
                                                                    ? item.quantity
                                                                    : 1
                                                            }
                                                            className='inputQuantity'
                                                            readOnly
                                                        />
                                                        <span
                                                            onClick={() =>
                                                                QtyUpdateIncr(
                                                                    key,
                                                                    item.quantity
                                                                )
                                                            }
                                                            className="changeQuantity"
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="total-price first-row">
                                                {formatVND(
                                                    item.price *
                                                    item.quantity
                                                )}
                                            </td>
                                            <td className="close-td first-row" style={{ borderRight: '1px solid #333' }}>
                                                <p
                                                    style={{ cursor: 'pointer', color: 'red' }}
                                                    onClick={() =>
                                                        handleDelate(
                                                            key
                                                        )
                                                    }
                                                    className="ti-close"
                                                ><b>X</b></p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <hr />
                        <div className="enFont" style={{}}>
                            <div className='checkout'>
                                <span className=''>
                                    Giỏ hàng hiện có ({' '}
                                    {proCart.reduce((a, c) =>
                                        a + c.quantity, 0
                                    )}{' '}
                                    Sản phẩm), tổng tiền:{' '}
                                </span>
                                <span>{formatVND(totalCart)}</span>
                            </div>
                            <Link to={`${url}/check-out`}
                                target className="btmHover borderLB"
                                style={{ marginTop: '1%' }}>
                                <span>Thanh Toán</span>
                            </Link>
                        </div>
                        <hr />
                        <div className="" style={{ marginBottom: '2%', marginTop: '3%' }}>
                            <a href="/category" className="btmHover borderLB">
                                <span>Tiếp Tục Mua Sắm</span>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="commonPadding">
                        <h1>Không có sản phẩm nào trong giỏ hàng.</h1>
                        <Link to='/' target className='backtoHome enFont btmHover'><span>Quay về trang chủ</span></Link>
                    </div>
                )}
            </div>{/* #ページ名 */}
            {/* footer /////////////////////////////////////////////////// */}
        </div>
    );
};

export default Cart;
