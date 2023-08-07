import React, { useEffect, useState, Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { getCategories } from '../../redux/actions/categoryActions';
import { getProducts, getSearch } from '../../redux/actions/productActions';
import './stylePro.scss';

const Category = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  var arrCate = [];
  var [typeCate, setTypeCate] = useState();
  var [actCate, setActCat] = useState();
  var [childCate, setChildCate] = useState(arrCate);
  var [grandChildCate, setGrandChildCate] = useState(null);
  const [isOpen, setOpen] = useState(false);
  var [count, setCount] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const lstCate = props.listCate;
  const lstColor = props.listColor;
  const lstSize = props.listSize;
  const product = useSelector((state) => state.product.product);

  const lstPro = useSelector((state) => state.product.products_list);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  let match = useRouteMatch('/category/:slug');
  let match2 = useRouteMatch('/product/:slug');

  const checkSlug = (id) => {
    var catArr = [];
    if (id && lstCate) {
      lstCate.forEach((value) => {
        if (id.includes(value._id)) {
          catArr.push(value.slug);
        }
      });
    }
    return catArr[0];
  };

  var slugCate = match
    ? match.params.slug
    : match2
      ? checkSlug(localStorage.getItem('proCate'))
      : '';

  var lstParentCate = [];

  if (lstCate) {
    lstParentCate = lstCate.filter(
      (value) => value.parentCate === '' && value.status === '1'
    );
  }

  const getChild = (id) => {
    setChildCate([]);
    lstCate.forEach((value, key) => {
      if (value.deleted === false && value.status === '1') {
        if (value.parentCate.includes(id)) {
          setChildCate((oldVal) => [...oldVal, value]);
        }
      }
    });
  };
  const getGrandChild = (id, parentType) => {
    setGrandChildCate([]);
    lstCate.forEach((value, key) => {
      if (value.deleted === false && value.status === '1') {
        if (value.parentCate.includes(id)) {
          if (value.type === parentType || value.type === '0') {
            setGrandChildCate((oldVal) => [...oldVal, value]);
          } else if (
            value.type === '3' &&
            (parentType === '1')
          ) {
            setGrandChildCate((oldVal) => [...oldVal, value]);
          } else if (
            value.type === '4' &&
            (parentType === '2')
          ) {
            setGrandChildCate((oldVal) => [...oldVal, value]);
          }
          else if (
            value.type === '5' &&
            (parentType === '2')
          ) {
            setGrandChildCate((oldVal) => [...oldVal, value]);
          }
        }
      }
    });
  };

  const toggleDropdown = (key, data) => {
    getGrandChild(data._id, typeCate);
    setOpen(!isOpen);
    setCount(key);
    // setItem(grandChildCate)
  };

  const handleItemClick = (id) => {
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
  };


  //search

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.charCodeAt(0) === 43) {
      toast.warning(
        'Ký tự bạn nhập không phù hợp. Vui lòng nhập ký tự khác.'
      );
      return;
    }
    if (lstPro && lstPro.Products) {
      matches = lstPro.Products.filter((item) => {
        return item.name.toLowerCase().match(text.toLowerCase());
      });
      setSuggestions(matches);
      setSearch(text);
    }
  };

  const onSuggestHandler = (text) => {
    setSearch('');
    setSuggestions([]);
    if (text.length !== 0) {
      dispatch(getSearch(text.toLowerCase()));
      history.push(`/tim-kiem?key=${text.toLowerCase()}`);
      setSuggestions([]);
    }
  };

  const handleFind = () => {
    if (search.length !== 0) {
      dispatch(getSearch(search.toLowerCase()));
      history.push(`/tim-kiem?key=${search.toLowerCase()}`);
      setSuggestions([]);
    }
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleFind();
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    var arrActCate = '';
    var idCate = '';
    lstParentCate.forEach((value) => {
      if (value.slug === slugCate) {
        arrActCate = value.name;
        idCate = value._id;
        setTypeCate(value.type);
      }
    });
    if (lstCate) {
      lstCate.forEach((value) => {
        if (
          value.parentCate.includes(idCate) &&
          value.deleted === false &&
          value.status === '1'
        ) {
          arrCate.push(value);
        }
      });
    }
    setActCat(arrActCate);
  }, [lstParentCate, lstCate]);

  return (
    <>
      <div className="navColumn">

        {/* <ul className="beforeLine">
          <h1>Trang Phục</h1>
          <li><a href="#">Trung Quốc</a></li>
          <li><a href="#">Hàn Quốc</a></li>
          <li><a href="#">Nhật Bản</a></li>
        </ul>
        <ul className="beforeLine">
          <h1>Vật Phẩm Khác</h1>
          <li><a href="#">Phụ Kiện</a></li>
          <li><a href="#">Tóc Giả</a></li>
          <li><a href="#">Figure</a></li>
        </ul> */}
        <div id="searchBox" method="get" class="flex">
          <input
            id='s-box'
            value={search}
            type="text"
            onChange={(e) =>
              onChangeHandler(e.target.value)
            }
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 1000)
            }}
            onKeyPress={(e) =>
              handleKeypress(e)}
            // placeholder="キーワードを入力"
            placeholder='Nhập ký tự tìm kiếm'
          />
          {/* <div className="col-md-11 justify-content-md-center show-suggestions">
            {suggestions &&
              suggestions.map((value, i) => (
                <div
                  key={i}
                  className="col-md-12 suggest"
                  onClick={() =>
                    onSuggestHandler(
                      value.name
                    )
                  }
                >
                  {value.name}
                </div>
              ))}
          </div> */}
          <button class="btmHover enFont" type="submit" onClick={handleFind}><span>Tìm Kiếm</span></button>
        </div>
        <div>
          <h1>Danh Mục</h1>
          <ul className='beforeLine'>
            {lstParentCate.map((cate, key) => {
              if (cate.slug !== slugCate) {
                return (
                  <li key={key}
                    onClick={() => {
                      getChild(cate._id);
                    }}
                  >
                    <Link to={`/category/${cate.slug}`}>
                      {cate.name}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="filter-widget">
          <h4 className="cateName">{actCate}</h4>
          <div className="dropdown cate-child">
            {actCate ? (
              childCate.map((value, key) => {
                // var ddmenu = key + 1;
                return (
                  <div key={key}>
                    <div
                      className="dropdown-header cate-name"
                      onClick={() =>
                        toggleDropdown(key, value)
                      }
                    >
                      {value.name}
                    </div>
                    {key === count ? (
                      <div
                        className={`dropdown-body ${isOpen && 'open'
                          }`}
                      >
                        {grandChildCate !== null ? (
                          grandChildCate.length > 0 ? (
                            grandChildCate.map(
                              (item, key) => (
                                <div
                                  className="dropdown-item"
                                  onClick={(e) =>
                                    handleItemClick(
                                      e.target
                                        .id
                                    )
                                  }
                                  key={key}
                                >
                                  <span
                                    className={`dropdown-item-dot ${item.id ===
                                      selectedItem &&
                                      'selected'
                                      }`}
                                  >
                                    •{' '}
                                  </span>
                                  <Link
                                    className="grandChildCate"
                                    to={`/category/${slugCate}/${value.slug}/${item.slug}`}
                                  >
                                    {item.name}
                                  </Link>
                                </div>
                              )
                            )
                          ) : (
                            <Redirect
                              to={`/category/${slugCate}/${value.slug}`}
                            />
                          )
                        ) : null}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div><hr />
        {match || match2 ? (
          <>
            <div className="sc-item">
              <h4 className="cateName">Size</h4>
              <div className="sc-itemSize">
                {lstSize && lstSize.length !== 0 ? (
                  lstSize.slice(0, 10).map((value, key) => {
                    if (value.deleted === false) {
                      return (
                        <div key={key} className="sc-item">
                          <Link
                            to={`/category/${slugCate}/size/${value.slug}`}
                          >
                            <div className='cs-item1'>
                              {value.name}
                            </div>
                          </Link>
                        </div>
                      );
                    }
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="sc-item">
              <h4 className="cateName">Màu</h4>
              <div className="sc-itemSize">
                {lstColor && lstColor.length !== 0 ? (
                  lstColor.slice(0, 12).map((value, key) => {
                    if (value.deleted === false) {
                      return (
                        <div key={key} className="cs-item">
                          <Link
                            to={`/category/${slugCate}/color/${value.slug}`}
                          >
                            <div
                              className="circle"
                              style={{
                                background:
                                  value.code,
                              }}
                            ></div>
                            <a className="name-color">
                              {value.name}
                            </a>
                          </Link>
                        </div>
                      );
                    }
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )}

      </div>
    </>
  )
}


export default Category