import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    destroyVouchers,
    listTrashVoucher,
    restoreVouchers,
} from '../../../redux/actions/voucherActions';
import VoucherTable from '../../components/table/VoucherTable';

const ListTrashVouchers = () => {
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstVouchers = useSelector((state) => state.voucher.vouchers);

    const checkButtonDestroy = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn danger-btn btn-hover"
                    onClick={() => {
                        Swal.fire({
                            title: 'Bạn muốn xóa danh sách mã này ?',
                            text: 'Danh sách mã sẽ bị xóa vĩnh viễn!',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#218838',
                            cancelButtonColor: '#dc3545',
                            confirmButtonText: 'Có, tôi muốn!',
                            cancelButtonText: 'Không, cám ơn!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                dispatch(
                                    destroyVouchers(deleteItems.toString())
                                );
                            }
                        });
                    }}
                >
                    <i className="fa fa-minus-circle"></i>&ensp;Xóa Vĩnh Viễn
                </button>
            );
        } else {
            return (
                <button className="main-btn danger-btn-outline" disabled>
                    <i className="fa fa-minus-circle"></i>&ensp;Xóa Vĩnh Viễn
                </button>
            );
        }
    };

    const checkButtonRestore = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn info-btn btn-hover"
                    onClick={() => {
                        Swal.fire({
                            title: 'Bạn muốn phục hồi danh sách mã này ?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#218838',
                            cancelButtonColor: '#dc3545',
                            confirmButtonText: 'Có, tôi muốn!',
                            cancelButtonText: 'Không, cám ơn!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                dispatch(
                                    restoreVouchers(deleteItems.toString())
                                );
                            }
                        });
                    }}
                >
                    <i className="fa fa-eraser"></i>&ensp;Phục Hồi
                </button>
            );
        } else {
            return (
                <button className="main-btn info-btn-outline" disabled>
                    <i className="fa fa-eraser"></i>&ensp;Phục Hồi
                </button>
            );
        }
    };

    useEffect(() => {
        document.title = 'Manage Voucher';
        dispatch(listTrashVoucher());
    }, [dispatch]);

    return (
        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>Danh Sách Mã Giảm Giá Đã Xóa</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <Link
                                        to="/admin/vouchers"
                                        className="main-btn secondary-btn btn-hover"
                                    >
                                        <i className="fa fa-clipboard-list"></i>
                                        &ensp;Danh Sách Mã Giảm Giá
                                    </Link>
                                    &nbsp;
                                    {checkButtonRestore()}
                                    &nbsp;
                                    {checkButtonDestroy()}
                                    &nbsp;
                                </nav>
                            </div>
                        </div>
                        {/*-- end col --*/}
                    </div>
                    {/*-- end row --*/}
                </div>
                {/*-- ========== title-wrapper end ========== --*/}
                {lstVouchers && lstVouchers.length ? (
                    <VoucherTable
                        list={lstVouchers}
                        setDeleteItems={setDeleteItems}
                    />
                ) : (
                    <VoucherTable list={[]} setDeleteItems={setDeleteItems} />
                )}
            </div>
            {/*-- end container --*/}
        </section>
    );
};

export default ListTrashVouchers;
