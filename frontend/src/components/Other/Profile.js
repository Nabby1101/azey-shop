import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { USER_INFO_RESET } from '../../constants/userConstant';
import { updateUserInfo } from '../../redux/actions/userActions';
import AvatarEditor from 'react-avatar-editor';
const Profile = () => {
    const dispatch = useDispatch();
    const [checkEditInfo, setCheckEditInfo] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const history = useHistory();
    const handleUser = useSelector((state) => state.user);

    const { error: errorHandle, userInfo: handleUserInfo } = handleUser;

    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);
    const [phone, setPhone] = useState(userInfo.phone);
    const [address, setAddress] = useState(userInfo.address);
    const [dateOfBirth, setDateOfBirth] = useState(userInfo.dateOfBirth);
    const [sex, setSex] = useState(userInfo.sex);
    const [image, setImage] = useState(
        `https://nabby-app-backend.onrender.com/uploads/users/${userInfo.avatar}`
    );
    const [file, setFile] = useState([]);
    const [position, setPosition] = useState([]);
    const [urlImage, setUrlImage] = useState('');

    const handleChangeImage = async (value) => {
        var output = document.getElementById('showImg');
        setUrlImage(output.src);
        console.log(setUrlImage);
        output.src = URL.createObjectURL(value[0]);
        setImage(output.src);
        if (output) {
            output.onload = function () {
                var height = this.height;
                var width = this.width;
                if (width > 2000 || height > 2000) {
                    toast.warn(
                        'Kích thước hình ảnh không được vượt qua 460 x 460'
                    );
                    output.src = urlImage;
                    return;
                }
                URL.revokeObjectURL(output.src); // free memory
            };
        }
        setFile(value);
    };

    const handleCancelEdit = () => {
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setPhone(userInfo.phone);
        setAddress(userInfo.address);
        setDateOfBirth(userInfo.dateOfBirth);
        setSex(userInfo.sex);
        userInfo.avatar ? setImage(image) : setImage(userInfo.avatar);
        setFile([]);
        if (urlImage.length !== 0) {
            document.getElementById('showImg').src = urlImage;
        }
        setCheckEditInfo(false);
    };

    const handleSaveEdit = () => {
        const formData = new FormData();
        const option = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            address: address,
            dateOfBirth: dateOfBirth,
            sex: sex,
        };
        if (image && image.length !== 0 && file.length !== 0) {
            option.avatar = image;

            for (let i = 0; i < file.length; i++) {
                formData.append('image', file[i]);
            }
        }
        formData.append('infos', JSON.stringify(option));
        dispatch(
            updateUserInfo({
                formData: formData,
                id: userInfo._id,
            })
        );
        setCheckEditInfo(false);
    };

    useEffect(() => {
        document.title = 'IA - Trang Cá Nhân'
        if (errorHandle && errorHandle.length !== 0) {
            toast.error(errorHandle);
        }

        if (handleUserInfo && handleUserInfo === true) {
            dispatch({ type: USER_INFO_RESET });
        }
    }, [dispatch, errorHandle, handleUserInfo]);
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
                    <div>Trang Cá Nhân</div>
                </h1>
                <div className="commonPadding">
                    <div id="formArea" className="smallWidth">
                        {/* ------------------------------------------------------- */}
                        {checkEditInfo === true ? (
                            <>
                                {image && image.length !== 0 ? (
                                    <img
                                        src={`${image}`}
                                        // src='https://nabby-app-backend.onrender.com/uploads/users/Egoist.jpg'
                                        id="showImg" className='avt'
                                        alt="アバター"
                                    />
                                ) : userInfo.sex === 0 ? (
                                    <img
                                        id="showImg" className='avt'
                                        src="assets/common/imgs/avtMale.jpg"
                                        alt='アバター'
                                    />
                                ) : (
                                    <img
                                        id="showImg" className='avt'
                                        src="assets/common/imgs/avtFemale.jpg"
                                        alt='アバター'
                                    />
                                )}
                                <input
                                    style={{ display: 'none', }}
                                    type="file"
                                    id="chooseAVT"
                                    name="avatar"
                                    onChange={(e) =>
                                        handleChangeImage(
                                            e
                                                .target
                                                .files
                                        )}
                                />
                                <label
                                    htmlFor='chooseAVT'
                                    className='btmHover'
                                >
                                    <span>Chọn Hình</span>
                                </label>
                            </>
                        ) : (
                            <>
                                {userInfo.avatar ? (
                                    <img
                                        src={image} alt="アバター"
                                        style={{ float: 'left', width: '460px', height: '460px', borderRadius: '50%', marginLeft: '-20%' }}
                                    />
                                ) : userInfo.sex === 0 ? (
                                    <img
                                        id="showImg" className='avt'
                                        src='assets/common/imgs/avtMale.jpg'
                                        alt='アバター'
                                    />
                                ) : (
                                    <img
                                        id="showImg" className='avt'
                                        src='assets/common/imgs/avtFemale.jpg'
                                        alt='アバター'
                                    />
                                )}
                            </>
                        )}
                        {/* ------------------------------------------------------- */}
                    </div>{/* commonwidth */}
                    {checkEditInfo === false ? (
                        <div className=''>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Họ Và Tên: </label>
                                </div>
                                <div className='profileText2'>
                                    <p><strong>{userInfo.firstName}{' '}{userInfo.lastName}</strong></p>
                                    {/* Nối tên */}
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Email: </label>
                                </div>
                                <div className='profileText2'>
                                    <p><strong>{userInfo.email}</strong></p>
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Số Điện Thoại: </label>
                                </div>
                                <div className='profileText2'>
                                    <p><strong>{userInfo.phone}</strong></p>
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Địa Chỉ: </label>
                                </div>
                                <div className='profileText2'>
                                    <p><strong>{userInfo.address}</strong></p>
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Ngày Sinh: </label>
                                </div>
                                <div className='profileText2'>
                                    <p>
                                        <strong>
                                            {new Date(
                                                userInfo.dateOfBirth
                                            )
                                                .toLocaleString(
                                                    'en-CA'
                                                )
                                                .substring(
                                                    0,
                                                    10
                                                ) ||
                                                NaN}
                                        </strong>
                                    </p>
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Giới Tính: </label>
                                </div>
                                <div className='profileText2'>
                                    <p>
                                        <strong>
                                            {userInfo.sex === 0
                                                ? 'Nam'
                                                : 'Nữ'}
                                        </strong>
                                    </p>
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Mật Khẩu: </label>
                                </div>
                                <div className='profileText2'>
                                    <p style={{ color: '#FF00e2' }}><strong>*********</strong></p>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className=''>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Họ Và Tên: </label>
                                </div>
                                <div className='profileText2'>
                                    <input
                                        className=''
                                        name='firstName'
                                        type="text"
                                        defaultValue={firstName}
                                        placeholder="Nhập Họ Của Bạn"
                                        onChange={(e) => setFirstName(
                                            e
                                                .target
                                                .value
                                        )}
                                    />
                                    <input
                                        className=''
                                        type="text"
                                        name='lastName'
                                        defaultValue={lastName}
                                        placeholder="Nhập Tên Của Bạn"
                                        onChange={(e) => setLastName(
                                            e
                                                .target
                                                .value
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Email: </label>
                                </div>
                                <div className='profileText2'>
                                    <p><strong>{userInfo.email}</strong></p>
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Số Điện Thoại: </label>
                                </div>
                                <div className='profileText2'>
                                    <input
                                        className=''
                                        name='phone'
                                        type="number"
                                        defaultValue={phone}
                                        placeholder="Nhập Số Điện Thoại Của Bạn"
                                        onChange={(e) => setPhone(
                                            e
                                                .target
                                                .value
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Địa Chỉ: </label>
                                </div>
                                <div className='profileText2'>
                                    <input
                                        className=''
                                        name='address'
                                        type="text"
                                        defaultValue={address}
                                        placeholder="Nhập Địa Chỉ Của Bạn"
                                        onChange={(e) => setAddress(
                                            e
                                                .target
                                                .value
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Ngày Sinh: </label>
                                </div>
                                <div className='profileText2'>
                                    <input
                                        className=''
                                        name='dateOfBirth'
                                        type="date"
                                        defaultValue={new Date(dateOfBirth)
                                            .toLocaleString('en-CA')
                                            .substring(0, 10)
                                        }
                                        placeholder="Nhập Ngày Sinh Của Bạn"
                                        onChange={(e) => setDateOfBirth(
                                            e
                                                .target
                                                .value
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Giới Tính: </label>
                                </div>
                                <div className='profileText2'>
                                    <select
                                        className=''
                                        defaultValue={sex}
                                        onChange={(e) => setSex(
                                            e
                                                .target
                                                .value
                                        )}
                                    >
                                        <option value="0">Nam</option>
                                        <option value="1">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className='tezt'>
                                <div className='profileText1'>
                                    <label>Mật Khẩu: </label>
                                </div>
                                <div className='profileText2'>
                                    <p><strong>*********</strong></p>
                                </div>
                                <div className=''>
                                    <button
                                        className=''
                                        onClick={() => history.push(
                                            `/change-password/${userInfo._id}`
                                        )}
                                    >
                                        Đổi Mật Khẩu
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className=''>
                        {checkEditInfo === false ? (
                            <div>
                                <button
                                    className='registerbtn'
                                    target
                                    style={{ width: "70%", marginLeft: '15%' }}
                                    onClick={() =>
                                        setCheckEditInfo(true)
                                    }
                                >
                                    <span>Chỉnh sửa thông tin cá nhân</span>
                                </button>
                                <hr />
                                {/* <Link to={'/danh-muc-ua-thich'}>favorites</Link> */}
                            </div>
                        ) : (
                            <>
                                <button
                                    type='submit'
                                    className='registerbtn recancel'
                                    onClick={() => handleCancelEdit()}
                                >
                                    Hủy
                                </button>
                                <button
                                    type='submit'
                                    target
                                    className='registerbtn completeEdit'
                                    onClick={() => handleSaveEdit()}
                                >
                                    Lưu Chỉnh Sửa
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>{/* #ページ名 */}
        </div>
    );
};


export default Profile