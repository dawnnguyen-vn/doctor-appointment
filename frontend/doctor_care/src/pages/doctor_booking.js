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
            <div class="input">
              <span class="dauvao-bt bt-g bt-g-nguoi"></span>
              <input
                class="input-name"
                name="name"
                type="text"
                placeholder="Họ tên bệnh nhân (bắt buộc)"
                autocomplete="name"
                required
              />
            </div>
            <div className="input-name-title">
              Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần
              Văn Phú
            </div>
            <div class="">
              <label>
                <input
                  class="dauv"
                  type="radio"
                  name="gender"
                  value="0"
                  dl-luu="gender"
                />{" "}
                Nam
              </label>
              <label>
                <input
                  class="dauv"
                  type="radio"
                  name="gender"
                  value="1"
                  dl-luu="gender"
                />{" "}
                Nữ
              </label>
              <div class="dauvao-thongbao"></div>
              <div class="input">
                <span class="dauvao-bt bt-g bt-g-nguoi"></span>
                <input
                  class="input-name"
                  name="phone"
                  type="text"
                  placeholder="Số điện thoại liên hệ (bắt buộc)"
                  autocomplete="phone"
                  required
                />
              </div>
              <div class="input">
                <span class="dauvao-bt bt-g bt-g-nguoi"></span>
                <input
                  class="input-name"
                  name="year"
                  type="number"
                  placeholder="Năm sinh"
                  autocomplete="year"
                />
              </div>
              <div class="input">
                <span class="dauvao-bt bt-g bt-g-nguoi"></span>
                <input
                  class="input-name"
                  name="address"
                  type="text"
                  placeholder="Địa chỉ liên hệ"
                  autocomplete="address"
                />
              </div>

              <div class="input">
                <span class="dauvao-bt bt-g bt-g-nguoi"></span>
                <input
                  class="input-name"
                  name="address"
                  type="text"
                  placeholder="Địa chỉ liên hệ"
                  autocomplete="address"
                />
              </div>
              <div class="input">
                <span class="dauvao-bt bt-g bt-g-nguoi"></span>
                <textarea
                  name="reason_other"
                  class=""
                  placeholder="Lý do khám"
                ></textarea>
              </div>
            </div>
            <div className="input">
              <label>
                <input
                  class=""
                  style={{ display: "inline", width: "10px" }}
                  type="radio"
                  name="pay_type"
                  value="1"
                  checked="checked"
                />{" "}
                Thanh toán sau tại cơ sở y tế
              </label>
            </div>
          </form>
          <div className="payment">
            <div className="container">
              <div className="gia-kham">
                <h3>Giá khám </h3>
                <h3>300.000đ</h3>
              </div>
              <div className="phi-dat-lich">
                <h3>Phí đặt lịch </h3>
                <h3>Miễn phí</h3>
              </div>
              <hr />
              <div className="total">
                <h3>Tổng cộng</h3>
                <h3 style={{ color: "red" }}>300.000đ</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
