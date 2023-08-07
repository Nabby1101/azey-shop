import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { getProduct } from '../../../redux/actions/productActions';
import CommentTable from '../../components/table/CommentTable';

const ListCommentProduct = (props) => {
    const dispatch = useDispatch();
    let { url } = useRouteMatch();
    const id = url.slice(24);
    const OneProduct = useSelector((state) => state.product.product);

    useEffect(() => {
        document.title = 'Manage Comment Products';
        if (id) dispatch(getProduct(id));
    }, [dispatch, id]);

    return (
        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>Danh Sách Đánh Giá Của Sản Phẩm</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div
                                className="breadcrumb-wrapper"
                                style={{ marginBottom: '30px' }}
                            >
                                <nav aria-label="breadcrumb">
                                    <Link
                                        to="/admin/products"
                                        className="main-btn secondary-btn btn-hover"
                                    >
                                        <i className="fa fa-clipboard-list"></i>
                                        &ensp;Danh Sách Sản Phẩm
                                    </Link>
                                    &nbsp;
                                </nav>
                            </div>
                        </div>
                        {/*-- end col --*/}
                    </div>
                    {/*-- end row --*/}
                </div>
                {/*-- ========== title-wrapper end ========== --*/}
                <CommentTable list={OneProduct.reviews || []} />
            </div>
            {/*-- end container --*/}
        </section>
    );
};

export default ListCommentProduct;
