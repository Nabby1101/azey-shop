import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategories } from '../../redux/actions/categoryActions';
import { getProducts, getSearch } from '../../redux/actions/productActions';
import { getUser } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const lstCate = useSelector((state) => state.category.categories);
  const lstPro = useSelector((state) => state.product.products_list);
  const numberCart = useSelector((state) => state.cart.numberCart);
  const proCart = useSelector((state) => state.cart.carts);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const userId = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))._id
    : '';
  const user = useSelector((state) => state.user.user);

  const image = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')).avatar || ''
    : '';

  // useEffect(() => {
  //   console.log('header', props.user)
  // }, [props.user])

  var total = 0;

  const ToTalPro = (price, quantity) => {
    total += price * quantity;
  };

  const checkImage = (key) => {
    let Arr = [];
    proCart.forEach((value) => {
      const imageArr = value.image.split(',');
      Arr.push(imageArr[0]);
    });
    return Arr[key];
  };

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    dispatch(getCategories());
    dispatch(getProducts());
    if (userId !== '') {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);
  return (
    <header className="global" style={{ left: '0px' }}>
      {/* ナビ：スマホ用メニューONOFF */}
      <div className="hamburger">
        <a>
          <span className="top" />
          {/* <span class="center"></span> */}
          <span className="bottom" />
        </a>
      </div>
      <h1><a href="/"><img src="./assets/common/imgs/logo.svg" alt="IA" /></a></h1>
      {/* グローバルナビ ///////////////////////////////////////////// */}
      <nav className="global">
        <div className="wrap">
          {/* ナビ */}
          <ul className="nav">
            {/**/}
            <li><Link to="/" target>Trang Chủ</Link></li>
            {/**/}
            <li><Link to="/category/tat-ca" >Sản Phẩm</Link></li>
            {/**/}
            <li><Link to="/tin-tuc">Tin Tức</Link></li>
            {/**/}
            <li><Link to="/contact" >Liên Hệ</Link></li>
            {/**/}
            <li>{localStorage.getItem('userInfo') ? (
              // <Link
              //   to="/profile"
              //   className=''
              //   target
              // >
              //   Trang Cá Nhân
              // </Link>
              null
            ) : (
              <Link to="/login" className='' >Đăng Nhập</Link>
            )}
            </li>
            <li>{JSON.parse(localStorage.getItem('userInfo')) !== null && JSON.parse(localStorage.getItem('userInfo')).role === 0 ? (
              <Link
                to="/admin"
                className=''
                target
              >
                Trang Quản Trị
              </Link>
            ) : null}
            </li>
            {/**/}
          </ul>
          {/* SNSアイコン */}
          <div className="sns">
            <a href="#" target><img src="./assets/common/imgs/top_ytb.png" alt="youtube" /></a>
            <a href="#" target><img src="./assets/common/imgs/top_line.png" alt="LINE" /></a>
            <a href="#" target><img src="./assets/common/imgs/top_tw.png" alt="Twitter" /></a>
            <a href="#" target><img src="./assets/common/imgs/top_fb.png" alt="facebook" /></a>
            <a href="#" target><img src="./assets/common/imgs/top_inst.png" alt="instagram" /></a>
            {localStorage.getItem('userInfo') ? (
              <Link to={'/danh-muc-ua-thich'} style={{ marginRight: '10px' }}>
                <i className='icon_heart_alt sns_favorites' alt="Favorites" />
                {user && user.favorites ? (
                  <span className='numFavorites'>
                    {user.favorites.length}
                  </span>
                ) : (
                  <span>0</span>
                )}
              </Link>
            ) : null}
            {/* {localStorage.getItem('userInfo') ? (
              <a href="/gio-hang">
                <i className='icon_bag_alt sns_favorites' alt="Favorites" />
                <span className='numFavorites'>
                  {numberCart}
                </span>
              </a>
            ) : null} */}
            <a href="/gio-hang">
                <i className='icon_bag_alt sns_favorites' alt="Favorites" />
                <span className='numFavorites'>
                  {numberCart}
                </span>
              </a>
            {/* <a href="#" target><img src="./assets/common/imgs/top_cart.png" alt="HistoryOrder" /></a> */}
          </div>
          {/* コンタクト */}
          <div>
            {localStorage.getItem('userInfo') ? (
              <div className='lang' style={{ width: '', height: '64px' }}>
                <div className='btm'>

                  <div
                    to=""
                    className=""
                  >
                    {image.length !== 0 ? (
                      <img
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                        }}
                        src={`https://azey-app.onrender.com/uploads/users/${image}`}
                        // src={`assets/common/imgs/avtFemale.jpg`}
                        alt=""
                      />
                    ) : (
                      // <i className="fa fa-user"></i>
                      <img
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                        }}
                        // src={`https://azey-app.onrender.com/uploads/users/${image}`}
                        src={`assets/common/imgs/avtMale.jpg`}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <ul className="select">
                  <li><Link to='/profile'>Trang Cá Nhân</Link></li>
                  <li><Link to='/lich-su-mua-hang'>Lịch Sử Mua Hàng</Link></li>
                  <li><Link to='/logout'>Đăng Xuất</Link></li>
                </ul>
              </div>
            ) : (
              // <span>Logout</span>
              null
            )}
          </div>
          {/* <div className="mail">
            <Link to="/contact" target><img src="./assets/common/imgs/contact.svg" alt="contact" /></Link>
          </div> */}
          {/* 言語 */}
          <div className="lang">
            <div className="btm">
              <img src="./assets/common/imgs/language.svg" alt="language" />
            </div>
            <ul className="select">
              <li data-val="ja|en">English</li>
              <li data-val="ja|es">Vietnamese</li>
              <li data-val="ja|zh-CN">Chinese (Simplified)</li>
              <li data-val="ja|zh-TW">Chinese (Traditional)</li>
              <li data-val="ja|ja">Japanese</li>
            </ul>
          </div>
        </div>
        {/*gnav-wrap*/}
      </nav>
    </header>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(Header)
