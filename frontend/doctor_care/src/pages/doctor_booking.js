import React from "react";
import "../styles/booking.scss";

export const BookingPage = () => {
  return (
    <div className="booking">
      <div className="booking-header">
        <div className="container">
          <img
            src="	https://cdn.bookingcare.vn/fr/w100/2020/03/17/114430-bshung.jpg"
            alt=""
          />
          <div className="header-title">
            <h3>Đặt lịch khám</h3>
            <h2>Phó giáo sư , tiến sĩ , bác sĩ Nguyễn Hữu Cảnh</h2>
            <p>15:30 - 15:45 - Thứ 6 - 29/4/2022</p>{" "}
          </div>
        </div>
      </div>
      <div className="booking-form">
        <div className="container">
          <form action="">
            <div>
              <label class="price" data-price="300000">
                <input type="radio" checked="checked" name="price" value="54" />
                <span>Giá khám</span>
                <div>300.000đ</div>
              </label>
            </div>
            <div class="o-nhap">
              <span class="dauvao-bt bt-g bt-g-nguoi"></span>
              <input
                class="dauvao-nhap batbuoc"
                name="name"
                value=""
                dl-luu="name"
                type="text"
                placeholder="Họ tên bệnh nhân (bắt buộc)"
                autocomplete="name"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
