import { Paper } from "@material-ui/core";
import { useState } from "react";
import { bookingService } from "../../../services/BookingService";

function PatientList() {
  const [value, setValue] = useState("");
  const [bookingList, setBookingList] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = await bookingService.getBooking(value);
      setBookingList(data.data);
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <Paper
      className="specialty-admin"
      style={{ width: "100%", marginTop: "4.5em" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px 0",
        }}
      >
        <p style={{ fontSize: "25px" }}>Tra cứu bệnh án</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input placeholder="Số BHYT" value={value} onChange={handleChange} />
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "#68D583", padding: "0 4px" }}
          >
            Tìm kiếm
          </button>
        </div>

        {bookingList.length > 0 ? (
          bookingList.map((booking) => (
            <div
              style={{
                padding: "20px",
                boxShadow: "1px 4px 15px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "30px",
                  }}
                >
                  <p>
                    <strong>Tên bệnh nhân:</strong>
                  </p>
                  <p>{booking.patient.name}</p>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "30px",
                  }}
                >
                  <p>
                    <strong>Số BHYT:</strong>
                  </p>
                  <p>{booking.patient.phone}</p>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "30px",
                  }}
                >
                  <p>
                    <strong>Số điện thoại:</strong>
                  </p>
                  <p>{booking.patient.phone}</p>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "30px",
                  }}
                >
                  <p>
                    <strong>Địa chỉ:</strong>
                  </p>
                  <p>{booking.patient.address}</p>
                </div>
                <hr></hr>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "30px",
                  }}
                >
                  <p>
                    <strong>Ngày khám bệnh:</strong>
                  </p>
                  <p>{booking.date}</p>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "30px",
                  }}
                >
                  <p>
                    <strong>Chuẩn đoán:</strong>
                  </p>
                  <p>{booking.patient.reason}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
    </Paper>
  );
}

export default PatientList;
