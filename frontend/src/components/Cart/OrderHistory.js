import React, { useEffect } from 'react';
import { listOrderMine } from '../../redux/actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import './styles/history.scss';

const OrderHistory = (props) => {
    const dispatch = useDispatch();
    const orderMineList = useSelector((state) => state.order);
    const { orders } = orderMineList;

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    useEffect(() => {
        document.title = 'IA - Lịch Sử Mua Hàng'
        dispatch(listOrderMine());
    }, [dispatch]);

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
                    <div>Lịch Sử Mua Hàng</div>
                </h1>
                <div className="commonPadding">
                    <table className="bordered">
                        <thead>
                            <tr>
                                <th className="text-center" style={{ borderRight: 'none' }}>Id</th>
                                <th className="text-center" style={{ borderRight: 'none' }}>Ngày</th>
                                <th className="text-center" style={{ borderRight: 'none' }}>Tổng Tiền</th>
                                <th className="text-center" style={{ borderRight: 'none' }}>Tình Trạng Thanh Toán</th>
                                <th className="text-center" style={{ borderRight: 'none' }}>Tình Trạng Giao Hàng</th>
                                <th className="text-center" style={{ borderRight: '1px solid #333' }}>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.length !== 0 ? (
                                orders.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="cart-title first-row">
                                                <h5>{item._id}</h5>
                                            </td>
                                            <td className="cart-title first-row">
                                                <h5>
                                                    {new Date(
                                                        item.createdAt
                                                    ).toLocaleDateString()
                                                    }
                                                </h5>
                                            </td>
                                            <td className="p-price first-row">
                                                {item.discount
                                                    ? formatVND(
                                                        item.totalPrice -
                                                        item.discount
                                                    )
                                                    : formatVND(
                                                        item.totalPrice
                                                    )}
                                            </td>
                                            <td className="qua-col first-row">
                                                <div className="quantity">
                                                    <span>
                                                        {item.isPaid ? (
                                                            <b className="text-success">
                                                                {new Date(
                                                                    item.paidAt
                                                                ).toLocaleDateString()
                                                                }
                                                            </b>
                                                        ) : (
                                                            <b className="text-danger">
                                                                Chưa
                                                                thanh
                                                                toán
                                                            </b>
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="qua-col first-row">
                                                {item.status ===
                                                    'Cancel' ? (
                                                    <div className="quantity">
                                                        <span className="text-danger">
                                                            <b>
                                                                Đã hủy hàng ({new Date(
                                                                    item.updatedAt
                                                                ).toLocaleDateString()
                                                                })
                                                            </b>
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="quantity">
                                                        {item.delivered ===
                                                            'Delivered' ? (
                                                            <span className="text-success">
                                                                <b>
                                                                    Đã giao hàng (
                                                                    {new Date(
                                                                        item.deliveredAt
                                                                    ).toLocaleDateString()
                                                                    }
                                                                    ) &nbsp;

                                                                </b>
                                                            </span>
                                                        ) : item.delivered ===
                                                            'Delivering' ? (
                                                            <span className="text-info">
                                                                <b>
                                                                    Đang giao hàng, dự kiến nhận hàng sau 3 ngày
                                                                </b>
                                                            </span>
                                                        ) : (
                                                            <b>
                                                                Đang
                                                                chuẩn
                                                                bị
                                                            </b>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="close-td first-row" style={{ borderRight: '1px solid #333' }}>
                                                <Link to={`/order/${item._id}`}
                                                    // onClick={() => {
                                                    //     props.history.push(
                                                    //         `/order/${item._id}`
                                                    //     );
                                                    // }}
                                                    className="fa fa-info-circle text-primary"
                                                    style={{ fontSize: '32px', color: 'red', textDecoration: 'none' }}
                                                ></Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ borderRight: '1px solid #333' }}>
                                        <h2
                                            style={{
                                                textAlign: 'center',
                                            }}
                                        >
                                            Bạn Chưa Có Đơn Hàng Nào
                                            !
                                        </h2>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
