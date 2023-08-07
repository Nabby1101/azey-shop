import moment from 'moment';
import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    ORDER_DELETE_RESET,
    ORDER_DESTROY_RESET,
    ORDER_RESTORE_RESET,
} from '../../../constants/orderConstant';
import {
    listOrder,
    listTrashOrders,
} from '../../../redux/actions/orderActions';

const OrderTable = (props) => {
    const list = props.list;
    const dispatch = useDispatch();
    let { url } = useRouteMatch();
    const [itemsChecked, setItemsChecked] = useState([]);
    const [activePage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handelOrder = useSelector((state) => state.order);

    const {
        error: errorHandle,
        trash: pushOrderToTrash,
        delete: deleteOrder,
        restore: restoreOrder,
    } = handelOrder;

    const indexOfLastTodo = activePage * 5;

    const indexOfFirstTodo = indexOfLastTodo - 5;

    var currentTodos = [];
    if (list && list.length !== 0) {
        currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo);
    }

    const onChangeHandler = (text) => {
        let matches = [];
        if (text.charCodeAt(0) === 43) {
            toast.warning(
                'Ký tự bạn nhập không phù hợp. Vui lòng nhập ký tự khác.'
            );
            return;
        }
        if (list && list.length !== 0) {
            matches = list.filter((item) => {
                return item._id.toLowerCase().match(text.toLowerCase());
            });
            setSuggestions(matches);
            setSearch(text);
        }
    };

    const onSuggestHandler = (text) => {
        dispatch(listOrder({ _id: text.toLowerCase() }));
        setSearch(text);
        setSuggestions([]);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const onHandleCancel = () => {
        dispatch(listOrder());
        setSearch('');
    };

    const onHandleChange = (delivery) => {
        if (delivery.length === 0) {
            dispatch(listOrder());
        } else {
            dispatch(listOrder({ deli: delivery }));
        }
    };

    const isChecked = (e, id) => {
        const checked = e.target.checked;
        if (checked) {
            setItemsChecked((oldval) => [...oldval, id]);
        } else {
            setItemsChecked(
                itemsChecked.filter((item) => {
                    return item !== id;
                })
            );
        }
    };

    useEffect(() => {
        if (errorHandle && errorHandle.length !== 0) {
            toast.error(errorHandle);
        }

        // if (activeOrder && activeOrder === true) {
        //     dispatch(listOrder());
        //     dispatch({ type: ORDER_STATUS_RESET });
        // }

        if (pushOrderToTrash && pushOrderToTrash === true) {
            var inputs = document.querySelectorAll('#checkbox-1');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
            setItemsChecked([]);
            dispatch(listOrder());
            dispatch({ type: ORDER_DELETE_RESET });
        }

        if (deleteOrder && deleteOrder === true) {
            var inputsTrash = document.querySelectorAll('#checkbox-1');
            for (var j = 0; j < inputsTrash.length; j++) {
                inputsTrash[j].checked = false;
            }
            setItemsChecked([]);
            dispatch(listTrashOrders());
            dispatch({ type: ORDER_DESTROY_RESET });
        }

        if (restoreOrder && restoreOrder === true) {
            var inputTrash = document.querySelectorAll('#checkbox-1');
            for (var k = 0; k < inputTrash.length; k++) {
                inputTrash[k].checked = false;
            }
            setItemsChecked([]);
            dispatch(listTrashOrders());
            dispatch({ type: ORDER_RESTORE_RESET });
        }

        props.setDeleteItems(itemsChecked);
    }, [
        deleteOrder,
        dispatch,
        errorHandle,
        itemsChecked,
        props,
        pushOrderToTrash,
        restoreOrder,
    ]);

    return (
        <div className="tables-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card-style mb-30">
                        <div className="option-order">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="search-order">
                                                <input
                                                    value={search}
                                                    type="text"
                                                    onChange={(e) =>
                                                        onChangeHandler(
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={() => {
                                                        setTimeout(() => {
                                                            setSuggestions([]);
                                                        }, 1000);
                                                    }}
                                                    placeholder="Nhập từ khóa tìm kiếm"
                                                />
                                                <button
                                                    className="cancel-search-order"
                                                    onClick={() =>
                                                        onHandleCancel()
                                                    }
                                                >
                                                    <i className="lni lni-close"></i>
                                                </button>
                                                <div className="col-md-11 justify-content-md-center order-suggestions">
                                                    {suggestions &&
                                                        suggestions.map(
                                                            (value, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="col-md-12 suggest"
                                                                    onClick={() =>
                                                                        onSuggestHandler(
                                                                            value._id
                                                                        )
                                                                    }
                                                                >
                                                                    {value._id}
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div class="select-style-1 select-delivery">
                                                <div className="select-position select-sm">
                                                    <select
                                                        className="light-bg"
                                                        onChange={(e) =>
                                                            onHandleChange(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Chọn trạng thái giao
                                                            hàng
                                                        </option>
                                                        <option value="Preparing">
                                                            Đang Chuẩn Bị
                                                        </option>
                                                        <option value="Delivering">
                                                            Đang Giao Hàng
                                                        </option>
                                                        <option value="Delivered">
                                                            Đã Giao Hàng
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-wrapper table-responsive text-center">
                            <table className="table table-bordered order-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <h6>#</h6>
                                        </th>
                                        <th>
                                            <h6>Mã Đơn Hàng</h6>
                                        </th>
                                        <th>
                                            <h6>Khách Hàng</h6>
                                        </th>
                                        <th>
                                            <h6>Trạng Thái Thanh Toán</h6>
                                        </th>
                                        <th>
                                            <h6>Trạng Thái Giao Hàng</h6>
                                        </th>
                                        <th>
                                            <h6>Thời Điểm Giao Hàng</h6>
                                        </th>
                                        <th>
                                            <h6>Thời Điểm Tạo</h6>
                                        </th>
                                        <th>
                                            <h6>Tổng Tiền</h6>
                                        </th>
                                        {url === '/admin/orders/trash' ? (
                                            <th>
                                                <h6>Thời Điểm Xóa</h6>
                                            </th>
                                        ) : (
                                            <>
                                                <th>
                                                    <h6
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Trạng Thái
                                                    </h6>
                                                </th>
                                                <th>
                                                    <h6>Chức Năng</h6>
                                                </th>
                                            </>
                                        )}
                                    </tr>
                                    {/*-- end table row--*/}
                                </thead>
                                {currentTodos.length === 0 ? (
                                    <p className="text-center">
                                        Không Có Đơn Hàng Nào Cả
                                    </p>
                                ) : (
                                    <tbody>
                                        {currentTodos.map((value, key) => {
                                            return (
                                                <tr key={key} id={value._id}>
                                                    <td>
                                                        <div className="check-input-primary">
                                                            <input
                                                                className="form-check-input check-admin"
                                                                type="checkbox"
                                                                id="checkbox-1"
                                                                onClick={(e) =>
                                                                    isChecked(
                                                                        e,
                                                                        value._id
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value._id}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {
                                                                value
                                                                    .shippingAddress
                                                                    .firstName
                                                            }{' '}
                                                            {
                                                                value
                                                                    .shippingAddress
                                                                    .lastName
                                                            }
                                                        </p>
                                                    </td>
                                                    <td
                                                        className="min-width"
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <p>
                                                            {value.isPaid ===
                                                            true
                                                                ? 'Đã Thanh toán'
                                                                : 'Chưa thanh toán'}
                                                        </p>
                                                    </td>
                                                    <td
                                                        className="min-width"
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <p>
                                                            {value.delivered ===
                                                            'Preparing'
                                                                ? 'Đang chuẩn bị'
                                                                : value.delivered ===
                                                                  'Delivering'
                                                                ? 'Đang giao hàng'
                                                                : 'Đã giao hàng'}
                                                        </p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {value.deliveredAt &&
                                                            value.delivered ===
                                                                'Delivered'
                                                                ? new Date(
                                                                      value.deliveredAt
                                                                  ).toLocaleString(
                                                                      'en-CA'
                                                                  )
                                                                : ''}
                                                        </p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {new Date(
                                                                value.createdAt
                                                            ).toLocaleString(
                                                                'en-CA'
                                                            )}
                                                        </p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {value.discount
                                                                ? formatVND(
                                                                      value.totalPrice -
                                                                          value.discount
                                                                  )
                                                                : formatVND(
                                                                      value.totalPrice
                                                                  )}
                                                        </p>
                                                    </td>
                                                    {value.deleted === false ? (
                                                        <>
                                                            <td className="min-width status-order">
                                                                {value.status ===
                                                                'Pending' ? (
                                                                    <span className="status-btn warning-btn">
                                                                        {
                                                                            'Chưa giải quyết'
                                                                        }
                                                                    </span>
                                                                ) : value.status ===
                                                                  'Processing' ? (
                                                                    <span className="status-btn active-btn">
                                                                        {
                                                                            'Đang xử lý'
                                                                        }
                                                                    </span>
                                                                ) : value.status ===
                                                                  'Completed' ? (
                                                                    <span className="status-btn success-btn">
                                                                        {
                                                                            'Đã hoàn tất'
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    <span className="status-btn close-btn">
                                                                        {
                                                                            'Hủy hàng'
                                                                        }
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="min-width">
                                                                <div
                                                                    className="action"
                                                                    style={{
                                                                        textAlign:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    <Link
                                                                        to={`${url}/${value._id}`}
                                                                        className="text-primary"
                                                                    >
                                                                        <i className="fa fa-info-circle" style={{fontSize: '33px', color: '#FF00E2'}}></i>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className="min-width">
                                                                <p>
                                                                    {moment(
                                                                        value.deletedAt
                                                                    )
                                                                        .utc()
                                                                        .format(
                                                                            'DD-MM-YYYY HH:ss'
                                                                        )}
                                                                </p>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                        {/*-- end table row --*/}
                                    </tbody>
                                )}
                            </table>
                            {/*-- end table --*/}
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={list ? list.length : 0}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                    {/*-- end card --*/}
                </div>
                {/*-- end col --*/}
            </div>
            {/*-- end row --*/}
        </div>
    );
};

export default OrderTable;
