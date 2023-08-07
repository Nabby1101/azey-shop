import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, FastField } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import InputField from '../inputField/InputField';
import { login, openGoogle, openFacebook } from '../../redux/actions/userActions';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const failMess = useSelector((state) => state.user.message_login_fail);
  const isLogged =
    JSON.parse(localStorage.getItem('userInfo')) !== null ? true : false;

  const initialValues = {
    email: '',
    password: '',
  };

  const notify = () =>
    toast.error(
      JSON.parse(localStorage.getItem('message-user_error')).message
    );

  const clearMess = () => {
    localStorage.removeItem('message-user_error');
  };

  const google = () => {
    localStorage.setItem('authGoogle', JSON.stringify({ isGoogle: true }));
    dispatch(openGoogle());
  };

  const facebook = () => {
    localStorage.setItem(
      'authFacebook',
      JSON.stringify({ isFacebook: true })
    );
    dispatch(openFacebook());
  };

  useEffect(() => {
    document.title = 'IA - Đăng Nhập';
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (localStorage.getItem('message-user_error') && failMess) {
      notify();
      setTimeout(clearMess, 5000);
    } else {
      clearTimeout(clearMess);
    }
  }, [failMess]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Bạn phải nhập email'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Ít nhất 8 kí tự, gồm chữ HOA, chữ thường, số và kí tự đặc biệt'
      )
      .required('Bạn phải nhập Mật khẩu'),
  });

  useEffect(() => {
    document.title = 'IA - Đăng Nhập';
    if (isLogged) {
      history.push('/');
    }
  }, [isLogged, history]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) =>
        dispatch(
          login({
            email: values.email,
            password: values.password,
          })
        )
      }
    >
      {(FormikProps) => {
        // const { values, error, touched } = FormikProps;
        // console.log({ values, error, touched });
        return (
          <div id="software" className="second" style={{ paddingTop: '60px' }}>
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
                <div>Đăng Nhập</div>
              </h1>
              <div className="commonPadding">
                <div id="formArea" className="smallWidth">
                  {/* ------------------------------------------------------- */}
                  <p>&nbsp;</p>
                  <div className="txt" style={{ color: "red", width: "100%", background: "rgba(255,199,253,0.7) 25%", textAlign: "center" }}>
                    Nhập đầy đủ thông tin theo yêu cầu!
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

                    <FastField
                      type="password"
                      name="password"
                      className="userForm"
                      component={InputField}
                      id="password"
                      placeholder="Nhập mật khẩu"
                    /> <hr />
                    <div className='Inori'>
                      <div className='InoriLeft'>
                        <Link to="/forget-password"
                          className=''
                        >
                          Quên Mật Khẩu
                        </Link>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="registerbtn"
                    >
                      <span>Đăng Nhập</span>
                    </button> <hr />

                  </Form>
                  {/* <div className="">
                    <p className="text-center">
                      Hoặc Đăng Nhập Với:
                    </p>
                    <div className="">
                      <button
                        className="loginbtnFB"
                        onClick={() => facebook()}
                      >
                        <img className='iconLogin' src='assets/common/imgs/fb_wh.png' alt=''></img>
                        <span>Facebook</span>
                      </button>
                      <button
                        className="loginbtnGG"
                        onClick={() => google()}
                      >
                        <img className='iconLogin' style={{ paddingTop: '5px' }} src='assets/common/imgs/gg_wh.png' alt=''></img>
                        <span>Google</span>
                      </button>
                    </div>
                  </div>
                  <hr /> */}
                  <div className='Yuzuriha'>
                    <p className="txt">Bạn Chưa Có Tài Khoản?</p>
                    <div id="" className="clearfix" style={{ marginBottom: '50px' }}>
                      <Link to="/register" target className="btmHover enFont"><span>Đăng Ký Ngay!</span></Link>
                    </div>
                  </div>
                  {/* ------------------------------------------------------- */}
                </div>{/* commonwidth */}
              </div>
            </div>{/* #ページ名 */}
          </div>
        )
      }
      }
    </Formik>
  );
};

export default Login