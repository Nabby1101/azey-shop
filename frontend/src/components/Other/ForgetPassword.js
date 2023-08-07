import { FastField, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import InputField from "../inputField/InputField";
import { forget } from "../../redux/actions/userActions";
import MessageBox from "../Box/MessageBox";

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState(false);
    const initialValues = {
        email: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Bạn phải nhập email"),
    });

    // useEffect(() => {
    //     document.title = "Customer Login";
    //     if (isLogged) {
    //         history.push("/");
    //     }
    // }, [isLogged, history]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(forget(values));
                setConfirm(true);
            }}
        >
            {(FormikProps) => {
                if (confirm === false) {
                    return (
                        <div id="software" className="second" style={{ paddingTop: '50px' }}>
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
                                    <div>Quên Mật Khẩu</div>
                                </h1>
                                <div className="commonPadding">
                                    <div id="formArea" className="smallWidth">
                                        {/* ------------------------------------------------------- */}
                                        <p>&nbsp;</p>
                                        <div className="txt" style={{ color: "red", width: "100%", background: "rgba(255,199,253,0.7) 25%", textAlign: "center" }}>
                                            Nhập email của bạn để shop gửi bạn mã xác nhận lấy lại mật khẩu của bạn.
                                        </div> <hr />
                                        <Form>
                                            <FastField
                                                type="email"
                                                name="email"
                                                className="userForm"
                                                component={InputField}
                                                id="email"
                                                placeholder="Nhập email"
                                            /> <hr />

                                            <button
                                                type="submit"
                                                className="registerbtn"
                                            >
                                                <span>Gửi Qua Email</span>
                                            </button> <hr />

                                        </Form>
                                        {/* ------------------------------------------------------- */}
                                    </div>{/* commonwidth */}
                                </div>
                            </div>{/* #ページ名 */}
                        </div>
                    );
                } else {
                    return (
                        <div className="register-login-section spad">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 offset-lg-3">
                                        <MessageBox variant="success">
                                            Kiểm Tra Email Của Bạn
                                        </MessageBox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            }}
        </Formik>
    );
};

export default ForgetPassword;