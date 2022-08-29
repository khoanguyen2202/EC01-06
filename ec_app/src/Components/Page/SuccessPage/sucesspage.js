import success from "./img/success.png"

function Successpage() {
    const clickButton = () => {
        window.location.href = "/"
    }
    return (
        <div className="successpage">
            <h1>Đặt đơn hàng thành công</h1>
            <img src={success} alt=""/>
            <button onClick={(e) => {clickButton()}}>Quay lại trang chủ</button>
        </div>
    )
}
export default Successpage