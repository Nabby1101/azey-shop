import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from '../inputField/InputField';
import TextareaField from '../inputField/TextareaField';
import { createContact } from '../../redux/actions/contactAction';
import MessageBox from '../Box/MessageBox';

const Contact = () => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  var iframe = `<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d111067.38640611373!2d106.3928949!3d29.5496927!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x369334b51e9f1db5%3A0x813a20c55a1e2220!2zRHUgVHJ1bmcsIFRyw7luZyBLaMOhbmgsIFRydW5nIFF14buRYw!5e0!3m2!1svi!2s!4v1675315765818!5m2!1svi!2s" height="250" width='100%' style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;

  const tesst = () => {
    return {
      __html: iframe,
    };
  };

  useEffect(() => {
    document.title = 'IA - Liên Hệ';
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const notify = () => {
    toast.error('Vui lòng nhập nội dung cần gửi ', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const initialValues = localStorage.getItem('userInfo')
    ? {
      name:
        JSON.parse(localStorage.getItem('userInfo')).firstName +
        ' ' +
        JSON.parse(localStorage.getItem('userInfo')).lastName,
      email: JSON.parse(localStorage.getItem('userInfo')).email,
      message: '',
    }
    : {
      name: '',
      email: '',
      message: '',
    };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Bạn phải nhập tên'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Bạn phải nhập Email'),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(value) => {
        if (value.message.length === 0) {
          notify();
        } else {
          setConfirm(true);
          dispatch(
            createContact({
              name: value.name,
              email: value.email,
              message: value.message,
            })
          );
        }
      }}
    >
      {(FormikProps) => {
        return (
          <div id="contact" className="second" style={{ paddingTop: '50px' }}>
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
                <div>Liên Hệ</div>
              </h1>
              <div className="commonPadding">
                <div id="formArea" className="smallWidth">
                  {/* ------------------------------------------------------- */}
                  <div className='txt'
                    dangerouslySetInnerHTML={tesst()}
                  ></div>
                  <div className="txt">
                    Nếu bạn có bất kỳ yêu cầu, tư vấn, hoặc các câu hỏi khác, xin vui lòng liên hệ với chúng tôi bằng cách sử dụng biểu mẫu bên dưới. <br />
                    Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất. Tùy thuộc vào nội dung, chúng tôi có thể không trả lời được hoặc có thể mất một khoảng thời gian. <br />
                  </div>

                  {/**End of Information */}

                  {confirm === false ? (
                    <Form>
                      {/* ////////////////////////////////////////////////// */}
                      <dl>
                        <dt>Tên</dt>
                        <dd>
                          <FastField
                            type="text"
                            name="name"
                            placeholder="ex: Nguyễn Văn A" required
                            id="yourName"
                            component={InputField}
                          />
                        </dd>
                      </dl>
                      <dl>
                        <dt>Địa Chỉ Email</dt>
                        <dd>
                          <FastField
                            type="email"
                            name="email"
                            placeholder="ex: info@domain.com" required
                            id="email"
                            component={InputField}
                          /></dd>
                      </dl>
                      {/* <dl>
                        <dt>Loại yêu cầu</dt>
                        <dd>
                          <div className="pullDown">
                            <select name="typeofdemand" required>
                              <option value="Chất Liệu Sản Phẩm">Chất Liệu Sản Phẩm</option>
                              <option value="Đội Ngũ Nhân Sự">Đội Ngũ Nhân Sự</option>
                              <option value="Giá Thành Sản Phẩm">Giá Thành Sản Phẩm</option>
                              <option value="Thời Gian Vận Chuyển">Thời Gian Vận Chuyển</option>
                              <option value="Đóng Góp Ý Kiến">Đóng Góp Ý Kiến</option>
                              <option value="Phàn Nàn Khác">Phàn Nàn Khác</option>
                            </select>
                          </div>
                        </dd>
                      </dl> */}
                      <dl>
                        <dt>Nội Dung Tâm Sự</dt>
                        <dd>
                          <FastField
                            type="textarea"
                            name="message"
                            className="jpFont" required
                            defaultValue={""}
                            component={TextareaField}
                          /></dd>
                      </dl>
                      {/* ////////////////////////////////////////////// */}
                      <div className="submit">
                        <button
                          type="submit">
                          Gửi Tới Azey_Shop
                        </button>
                      </div>
                    </Form>
                  ) : (
                    <MessageBox variant="success">
                      Đã gửi thành công, xin hãy kiên nhẫn để nhận lại phản hồi !!!.
                    </MessageBox>
                  )}

                  {/* ------------------------------------------------------- */}
                </div>{/* commonwidth */}
              </div>
            </div>{/* #ページ名 */}
          </div>
        )
      }}
    </Formik >





  )
}

export default Contact