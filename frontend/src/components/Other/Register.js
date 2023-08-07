import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FastField, Form, Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup';
import CheckboxField from '.././inputField/CheckboxField';
import DatepickerField from '.././inputField/DatePickerField';
import InputField from '.././inputField/InputField';
import { register } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isRegister =
    JSON.parse(localStorage.getItem('userInfo')) !== null ? true : false;
  const initialValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    sex: false,
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(100, 'Tối đa 100 kí tự')
      .required('Bạn phải nhập họ'),
    lastName: Yup.string()
      .max(8, 'Tối đa 8 kí tự')
      .required('Bạn phải nhập Tên'),
    dateOfBirth: Yup.date().required('Bạn phải chọn ngày sinh của bạn'),
    phone: Yup.string()
      .min(10, 'Số điện thoại không hợp lệ')
      .max(11, 'Tối đa 11 kí tự')
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Số điện thoại không hợp lệ'
      )
      .required('Bạn phải nhập Số ĐT'),
    address: Yup.string().required('Bạn phải nhập địa chỉ'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Bạn phải nhập Email'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Ít nhất 8 kí tự, gồm chữ HOA, chữ thường, số và kí tự đặc biệt'
      )
      .required('Bạn phải nhập Mật khẩu'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Bạn phải nhập lại đúng Mật khẩu '
    ),
  });
  const notify = () =>
    toast.error(JSON.parse(localStorage.getItem('message-user')).message);
  const clearMess = () => {
    localStorage.removeItem('message-user');
  };
  useEffect(() => {
    document.title = 'IA - Đăng Ký';
    if (isRegister) {
      notify();
      setTimeout(clearMess, 5000);
      history.push('/');
    }
  }, [isRegister, history]);
  return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(
            register({
              firstName: values.firstName,
              lastName: values.lastName,
              dateOfBirth: values.dateOfBirth,
              email: values.email,
              password: values.password,
              phone: values.phone,
              address: values.address,
              sex: values.sex ? 1 : 0,
            })
          )
        }}
      >
        {(FormikProps) => {
          return (
            <div id="software" className="second" style={{paddingTop: '60px'}}>		
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
                  <div>Đăng Ký</div>
                </h1>
                <div className="commonPadding">
                <div id="formArea" className="smallWidth">
                    {/* ------------------------------------------------------- */}               
                    <p>&nbsp;</p>
                    <div className="txt" style={{color: "red", width: "100%", background: "rgba(255,199,253,0.7) 25%", textAlign: "center"}}>Nhập đầy đủ thông tin theo yêu cầu!</div>
                    <Form>

                      <FastField
                        label="Họ"
                        type="firstName"
                        name="firstName"
                        component={InputField}
                        className="userForm"
                        id="firstName"
                        placeholder="Nhập Họ"
                      /> <hr/>

                      <FastField
                        label="Tên"
                        type="lastName"
                        name="lastName"
                        component={InputField}
                        className="userForm"
                        id="lastName"
                        placeholder="Nhập Tên"
                      /> <hr/>

                      <FastField
                        label="Ngày Sinh"
                        type="date"
                        name="dateOfBirth"
                        component={DatepickerField}
                        className="userForm"
                      /> <hr/>

                      <FastField
                        label="Số Điện Thoại"
                        type="phone"
                        name="phone"
                        component={InputField}
                        className="userForm"
                        id="phone"
                        placeholder="Nhập Số Điện Thoại"
                      /> <hr/>

                      <FastField
                        label="Địa Chỉ"
                        type="address"
                        name="address"
                        component={InputField}
                        className="userForm"
                        id="address"
                        placeholder="Nhập Địa Chỉ"
                      /> <hr/>

                      <FastField
                        label="Email"
                        type="email"
                        name="email"
                        component={InputField}
                        className="userForm"
                        id="email"
                        placeholder="Nhập Email"
                      /> <hr/>

                      <FastField
                        label="Mật Khẩu"
                        type="password"
                        name="password"
                        component={InputField}
                        className="userForm"
                        id="password"
                        placeholder="Nhập Mật Khẩu"
                      /> <hr/>

                      <FastField
                        label="Nhập Lại Mật Khẩu"
                        type="password"
                        name="confirmPassword"
                        component={InputField}
                        className="userForm"
                        id="confirmPassword"
                        placeholder="Xác Nhận Mật Khẩu"
                      /> <hr/>

                      <FastField
                        type="checkbox"
                        name="sex"
                        component={CheckboxField}
                        id="sex"
                      /> 
                      <button 
                        type="submit" 
                        className="registerbtn"
                      >
                          <span>Đăng Ký</span>
                      </button>
                    </Form>
                    <hr/>
                    <div className='Yuzuriha'>
                    <p className="txt">Bạn Đã có tài khoản?</p>
                    <div id="" className="clearfix" style={{marginBottom: '50px'}}>
                      <Link to="/login" target className="btmHover enFont"><span>Đăng Nhập Ngay!</span></Link>
                    </div>
                    </div>
                    {/* <form action="/action_page.php">
                      <div className="userForm">
                        <hr />                  
                        <p><b>Username</b></p>
                        <input type="text" placeholder="username" name="email" id="email" required />
                        <hr />
                        <p><b>Mật Khẩu</b></p>
                        <input type="password" placeholder="*****" name="password" id="password" required />               
                        <hr /> 
                        <p><b>Nhập Lại Mật Khẩu</b></p>
                        <input type="password" placeholder="*****" name="passwordCofirm" id="passwordCofirm" required />               
                        <hr /> 
                        <p><b>Số Điện Thoại</b></p>
                        <input type="text" placeholder="phone number" name="phone" id="phone" required />
                        <hr />
                        <p><b>Địa Chỉ</b></p>
                        <input type="text" placeholder="address" name="address" id="address" required />
                        <button type="submit" className="registerbtn btmHover"><span>Đăng Ký</span></button>
                        <hr />
                      </div>                   
                    </form>
                    <p className="txt">Bạn Đã có tài khoản? Đăng Nhập Ngay --&gt;</p>
                    <div id="backTop" className="clearfix" style={{marginBottom: '50px'}}>
                      <Link to="/login" className="btmHover enFont"><span>Login Now!</span></Link>
                    </div> */}
                    {/* ------------------------------------------------------- */}
                  </div>{/* commonwidth */}
                </div>        
              </div>{/* #ページ名 */}
            </div>    
          )
        }}
      </Formik>
  );
};

export default Register