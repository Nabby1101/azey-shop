import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import InputField from '../../components/inputField/InputField';
import TextareaField from '../../components/inputField/TextareaField';
import { ORDER_CREATE_RESET } from '../../constants/orderConstant';
import { createOrder } from '../../redux/actions/orderActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './styles/checkout.scss';
import { detailsVoucher } from '../../redux/actions/voucherActions';
import { VOUCHER_DETAILS_RESET } from '../../constants/voucherConstant';

const CheckOut = (props) => {
    const dispatch = useDispatch();
    const proCart = useSelector((state) => state.cart.carts);
    const orderCreate = useSelector((state) => state.order);
    const handleVoucher = useSelector((state) => state.voucher);
    const { success, order } = orderCreate;
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalCart, setTotalCart] = useState(0);
    const [shippingFee, setShippingFee] = useState(0);
    const [checkCash, setCheckCash] = useState(true);
    const [checkPaypal, setCheckPaypal] = useState(false);
    const [payment, setPayment] = useState('Tiền Mặt');
    const [code, setCode] = useState('');
    const [checkCode, setCheckCode] = useState(false);

    const {
        error: ErrorHandle,
        success: SuccessHandle,
        voucher: VoucherCode,
    } = handleVoucher;

    const initialValues = localStorage.getItem('userInfo')
        ? {
            id: JSON.parse(localStorage.getItem('userInfo'))._id,
            firstName: JSON.parse(localStorage.getItem('userInfo')).firstName,
            lastName: JSON.parse(localStorage.getItem('userInfo')).lastName,
            address: JSON.parse(localStorage.getItem('userInfo')).address,
            emailAddress: JSON.parse(localStorage.getItem('userInfo')).email,
            phone: JSON.parse(localStorage.getItem('userInfo')).phone,
            note: '',
        }
        : {
            id: '6389728f1681b54d863db4c5',
            firstName: '',
            lastName: '',
            address: '',
            emailAddress: '',
            phone: '',
            note: '',
        };

    const notifySize = (data, qty) => {
        toast.error('Vui lòng chọn size cho ' + qty + ' sản phẩm, là ' + data, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyColor = (data, qty) => {
        toast.error('Vui lòng chọn màu cho ' + qty + ' sản phẩm, là ' + data, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Bạn phải nhập họ'),
        lastName: Yup.string().required('Bạn phải nhập Tên'),
        address: Yup.string().required('Bạn phải nhập địa chỉ'),
        phone: Yup.string()
            .min(10, 'Số điện thoại không hợp lệ')
            .max(11, 'Số điện thoại không hợp lệ')
            .required('Bạn phải nhập Số ĐT')
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Số điện thoại không hợp lệ'
            ),
        emailAddress: Yup.string()
            .email('Email không hợp lệ')
            .required('Bạn phải nhập Email'),
    });

    const checkedPayment = (id) => {
        if (id === 'pc-paypal') {
            setCheckPaypal(true);
            setCheckCash(false);
            setPayment('Paypal');
        } else {
            setCheckPaypal(false);
            setCheckCash(true);
            setPayment('Tiền Mặt');
        }
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const handleVoucherInput = () => {
        if (code.length !== 0) {
            dispatch(detailsVoucher(code));
        } else {
            toast.warn('Bạn chưa nhập mã giảm giá.');
        }
    };

    const handleVoucherCancel = () => {
        setCheckCode(false);
        setCode('');
        document.getElementById('cancelCode').value = '';
        dispatch({ type: VOUCHER_DETAILS_RESET });
        setDiscount(0);
    };

    useEffect(() => {
        document.title = 'IA - Thanh Toán'
        if (success === true && order._id) {
            window.location.href = `/order/${order._id}`;
            dispatch({ type: ORDER_CREATE_RESET });
            dispatch({ type: VOUCHER_DETAILS_RESET });
        }
        if (ErrorHandle.length !== 0) {
            toast.error(ErrorHandle);
            setCode('');
            dispatch({ type: VOUCHER_DETAILS_RESET });
        } else if (SuccessHandle === true) {
            var voucher = VoucherCode.voucher;
            var message = VoucherCode.message;
            if (voucher.min <= subTotal) {
                if (voucher.type === 0) {
                    setDiscount((subTotal * voucher.discount) / 100);
                    toast.success(message);
                } else {
                    setDiscount(voucher.discount);
                    toast.success(message);
                }
                setCheckCode(true);
            }

            return 0;
        }
        const getTotal = () => {
            const total = proCart.reduce((prev, item) => {
                return prev + item.price * item.quantity;
            }, 0);
            setSubTotal(total);
            if (total !== 0) {
                setShippingFee(total > 2000000 ? 0 : 50000);
            }
            setTotalCart(total + shippingFee);
        };
        getTotal();
    }, [
        ErrorHandle,
        SuccessHandle,
        VoucherCode.message,
        VoucherCode.voucher,
        dispatch,
        order._id,
        proCart,
        props.history,
        shippingFee,
        subTotal,
        success,
    ]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(value) => {
                var sizes = proCart.filter((value) => value.size === '');
                var colors = proCart.filter((value) => value.color === '');
                if (sizes.length !== 0) {
                    var temp1 = '';
                    sizes.forEach((element) => {
                        temp1 += element.name + ' và ';
                    });
                    notifySize(temp1.slice(0, -4), sizes.length);
                } else if (colors.length !== 0) {
                    var temp2 = '';
                    colors.forEach((element) => {
                        temp2 += element.name + ' và ';
                    });
                    notifyColor(temp2.slice(0, -4), colors.length);
                } else {
                    dispatch(
                        createOrder({
                            orderItems: proCart,
                            shippingFee: shippingFee,
                            totalPrice: totalCart,
                            shippingAddress: {
                                firstName: value.firstName,
                                lastName: value.lastName,
                                address: value.address,
                                emailAddress: value.emailAddress,
                                phone: value.phone,
                                note: value.note,
                            },
                            paymentMethod: payment,
                            user: value.id,
                            voucher: code,
                            discount: discount,
                        })
                    );
                }
            }}
        >
            {(FormikProps) => {
                return (
                    <div id="contact" className="second" style={{ paddingTop: '160px', marginBottom: '-5%' }}>
                        <Form>
                        <div className='checkout50'>
                            <div className='checkoutz' style={{ borderRight: '1px solid black' }}>
                                <h1>Thông Tin Cá Nhân</h1>
                                <hr />
                                <div className="">
                                    {localStorage.getItem(
                                        'userInfo'
                                    ) ? (
                                        <div></div>
                                    ) : (
                                        <div
                                            style={{
                                                textAlign: 'center',
                                            }}>
                                            <Link
                                                to='/login'
                                                className="registerbtn"
                                                style={{ textDecoration: 'none', color: 'white', width: '100%' }}
                                            >
                                                <span>Đăng nhập ngay để đặt hàng!</span>
                                            </Link>
                                        </div>
                                    )}
                                    {/* <div className="checkout-content">
                                            {localStorage.getItem(
                                                'userInfo'
                                            ) ? (
                                                <div></div>
                                            ) : (
                                                <a
                                                    href="/#"
                                                    className="content-btn"
                                                >
                                                    Click Here To Login
                                                </a>
                                            )}
                                        </div> */}
                                    <div id="formArea" className="smallWidth" style={{ width: '100%' }}>
                                        <FastField
                                            type="firstName"
                                            name="firstName"
                                            label="Họ"
                                            component={InputField}
                                            className="userForm"
                                            id="firstName"
                                            placeholder="Nhập Họ Của Bạn"
                                        /> <hr />
                                        <FastField
                                            type="lastName"
                                            name="lastName"
                                            label="Tên"
                                            component={InputField}
                                            className="userForm"
                                            id="lastName"
                                            placeholder="Nhập Tên Của Bạn"
                                        /> <hr />
                                        <FastField
                                            type="address"
                                            name="address"
                                            label="Địa Chỉ"
                                            component={InputField}
                                            className="userForm"
                                            id="address"
                                            placeholder="Nhập Địa Chỉ Của Bạn"
                                        /> <hr />
                                        <FastField
                                            type="email"
                                            name="emailAddress"
                                            label="Emai"
                                            component={InputField}
                                            className="userForm"
                                            id="emailAddress"
                                            placeholder="Nhập Email Của Bạn"
                                        /> <hr />
                                        <FastField
                                            type="phone"
                                            name="phone"
                                            label="Số Điện Thoại"
                                            component={InputField}
                                            className="userForm"
                                            id="phone"
                                            placeholder="Nhập Số Điện Thoại Của Bạn"
                                        /> <hr />
                                        <FastField
                                            type="textarea"
                                            name="note"
                                            label="Lưu Ý"
                                            component={TextareaField}
                                            rows="6"
                                            className="jpFont" required
                                            id="note"
                                            placeholder="Nhập Lưu Ý"
                                        />

                                        {/* <div className="col-lg-12">
                                                <div className="create-item">
                                                    <label htmlFor="acc-create">
                                                        Create an account?
                                                        <input type="checkbox" id="acc-create" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className='checkoutz' >
                                <h1>Chi Tiết Đơn Hàng</h1>
                                <hr />
                                <div className="discount-coupon checkout-cp">
                                    {checkCode === false ? (
                                        <div className="voucher">
                                            <input
                                                id="cancelCode"
                                                type="text"
                                                className="inputbtn"
                                                placeholder="Nhập Mã Giảm Giá"
                                                onChange={(e) =>
                                                    setCode(
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                style={{ textDecoration: 'none', color: 'black' }}
                                            />
                                            <button
                                                type="button"
                                                className="btmHover enFont voucherbtn"
                                                onClick={() =>
                                                    handleVoucherInput()
                                                }
                                            >
                                                <span>Áp Dụng</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="voucher">
                                            <input
                                                id="cancelCode"
                                                type="text"
                                                className="voucher-applied"
                                                placeholder="Nhập Mã Giảm Giá"
                                                disabled
                                            />
                                            <button
                                                type="button"
                                                className="btmHover enFont voucherbtn"
                                                onClick={() =>
                                                    handleVoucherCancel()
                                                }
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="">
                                    <ul className="priceCart">
                                        <li>
                                            Sản Phẩm{' '}
                                            <span style={{ color: 'red' }}>Tổng</span>
                                        </li>
                                        {proCart.length !==
                                            0 ? (
                                            proCart.map(
                                                (item, key) => {
                                                    return (
                                                        <li
                                                            key={
                                                                key
                                                            }
                                                            className=""
                                                        >
                                                            {
                                                                item.name
                                                            }{' '}
                                                            x{' '}
                                                            {
                                                                item.quantity
                                                            }
                                                            <span>
                                                                {formatVND(
                                                                    item.price *
                                                                    item.quantity
                                                                )}
                                                            </span>
                                                        </li>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <li className="">
                                                Không Có Sản
                                                Phẩm{' '}
                                                <span>
                                                    {formatVND(
                                                        0
                                                    )}
                                                </span>
                                            </li>
                                        )}
                                        <li className="totalPrice">
                                            Tạm Tính({' '}
                                            {proCart.reduce(
                                                (a, c) =>
                                                    a +
                                                    c.quantity,
                                                0
                                            )}{' '}
                                            Sản phẩm ):{' '}
                                            <span>
                                                {formatVND(
                                                    subTotal
                                                )}
                                            </span>
                                        </li>
                                        <li className="">
                                            Phí Giao Hàng: {' '}
                                            <span>
                                                {formatVND(
                                                    shippingFee
                                                )}
                                            </span>
                                        </li>
                                        <li className="">
                                            Giá Giảm: {' '}
                                            <span>
                                                {'-' +
                                                    formatVND(
                                                        discount
                                                    )}
                                            </span>
                                        </li>
                                        <li className="">
                                            Tổng tiền:{' '}
                                            <span style={{ color: '#FF00E2' }}>
                                                {formatVND(
                                                    totalCart -
                                                    discount
                                                )}
                                            </span>
                                        </li>
                                    </ul> <hr/>
                                    <div className="payment-check">
                                        <div className="pc-item">
                                            <label htmlFor="pc-cash">
                                                Tiền mặt
                                                <input
                                                    checked={
                                                        checkCash
                                                    }
                                                    type="checkbox"
                                                    id="pc-cash"
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        checkedPayment(
                                                            e
                                                                .target
                                                                .id
                                                        )
                                                    }
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        {/* <div className="pc-item">
                                            <label htmlFor="pc-paypal">
                                                Paypal
                                                <input
                                                    checked={
                                                        checkPaypal
                                                    }
                                                    type="checkbox"
                                                    id="pc-paypal"
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        checkedPayment(
                                                            e
                                                                .target
                                                                .id
                                                        )
                                                    }
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div> */}
                                    </div><hr/>
                                    {proCart.length !== 0 ? (
                                        <div className="">
                                            <button
                                                type="submit"
                                                className="btmHover borderLB enFont"
                                                style={{ height: '50px', fontSize: '20px' }}
                                            >
                                                <span>Thanh Toán</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default CheckOut;
