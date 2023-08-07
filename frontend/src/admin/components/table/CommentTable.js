import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch } from 'react-redux';
import './style.scss';

const CommentTable = (props) => {
    const list = props.list;
    const dispatch = useDispatch();
    const [activePage, setCurrentPage] = useState(1);

    const indexOfLastTodo = activePage * 5;

    const indexOfFirstTodo = indexOfLastTodo - 5;

    var currentTodos = [];
    if (list && list.length !== 0) {
        currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {}, [dispatch, props]);

    return (
        <div className="tables-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card-style mb-30">
                        <div className="table-wrapper table-responsive text-center">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>
                                            <h6>Giới Tính</h6>
                                        </th>
                                        <th>
                                            <h6>Tên Khách Hàng</h6>
                                        </th>
                                        <th>
                                            <h6>Đánh Giá</h6>
                                        </th>
                                        <th>
                                            <h6>Bình Luận</h6>
                                        </th>
                                        <th>
                                            <h6>Ngày Đánh Giá</h6>
                                        </th>
                                    </tr>
                                    {/*-- end table row--*/}
                                </thead>
                                {currentTodos.length === 0 ? (
                                    <p className="text-center">
                                        Không Có Đánh Giá Nào Hết !
                                    </p>
                                ) : (
                                    <tbody>
                                        {currentTodos.map((value, key) => {
                                            return (
                                                <tr key={key} id={value._id}>
                                                    <td className="min-width th-admin-comment">
                                                        {value.sex === 0 ? (
                                                            <img
                                                                src="assets/common/imgs/avtMale.jpg"
                                                                alt=""
                                                            />
                                                        ) : (
                                                            <img
                                                                src="assets/common/imgs/avtFemale.jpg"
                                                                alt=""
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value.name}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value.rating}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value.comment}</p>
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

export default CommentTable;
