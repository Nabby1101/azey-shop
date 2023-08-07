import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
      <footer className="global">
        <div className="midashi"><div className="commonPadding">SPECIALIZE</div></div>
        {/*  バナー */}
        <div className="bn">
          <a href="#" target className=" ">
            <img src="./assets/common/imgs/footer_01.jpg" />
          </a>
          <a href="#" target className=" ">
            <img src="./assets/common/imgs/footer_02.jpeg" />
          </a>
          <a href="#" target className=" ">
            <img src="./assets/common/imgs/footer_03.jpg" />
          </a>
          <a href="#" target className=" ">
            <img src="./assets/common/imgs/footer_04.jpg" />
          </a>
          <a href="#" target className=" ">
            <img src="./assets/common/imgs/footer_05.jpg" />
          </a>
          <a href="#" target className=" ">
            <img src="./assets/common/imgs/footer_06.jpg" />
          </a>
          <a href="#" target className=" ">
            <img src="./assets/common/imgs/footer_07.jpg" />
          </a>
          <a href="#" target className=" ">
            <img src="./assets/common/imgs/footer_08.jpg" />
          </a>
          <a href="#" target className=" ">
            <img src="./assets/common/imgs/footer_09.jpg" />
          </a>
        </div>
        {/* トップへ戻る */}
        <div id="backTop" className="more clearfix">
          <a href className="btmHover enFont"><span>Lên Đầu Trang</span></a>
        </div>
        <div className="logo1stplace">
          <a href="#" target><img src="./assets/common/imgs/1stplace.svg" alt="1stPLACE" /></a>
        </div>
        <nav>
          <a href="/contact" target>Liên Hệ</a>
          {/* <a href="#">PRIVACY POLICY</a> */}
          <a href="/about" target>Về Chúng Tôi</a>
        </nav>
        {/* SNSアイコン */}
        <div className="sns">
          <a href="#" target><img src="./assets/common/imgs/youtube_wh.png" alt="youtube" /></a>
          <a href="#" target><img src="./assets/common/imgs/line_wh.png" alt="LINE" /></a>
          <a href="#" target><img src="./assets/common/imgs/tw_wh.png" alt="Twitter" /></a>
          <a href="#" target><img src="./assets/common/imgs/fb_wh.png" alt="facebook" /></a>
          <a href="#" target><img src="./assets/common/imgs/inst_wh.png" alt="instagram" /></a>
          <a href="#" target><img src="./assets/common/imgs/sp_wh.png" alt="Spotify" /></a>
        </div>
        {/*Coppyright by IA-ARIA*/}
        <div className="copyright">©Copyright By IA-ARIA ❤️❤️❤️</div>
      </footer>
    )
  }
}

export default Footer