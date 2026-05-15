import { useEffect, useState } from "react"
import { Footer } from "../footer/footer"
import { Navbar } from "../navbar/navbar"
import UserAPIService from "../../../../services/user_service"
import moment from "moment"
import { RiDeleteBinLine } from "react-icons/ri"

export const OrderList = () => {
    const [orderList, setOrderList] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchOrderList = async () => {
            try {
                const response = await UserAPIService.getOrderList( { userId } );
                if (response.status === 1) {
                    setOrderList(response.data.product); }
            } catch (error) {
                console.error("Error fetching order list:", error);
            }
        };

        fetchOrderList();
    }, []);

    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await UserAPIService.deleteOrder({ orderId, userId });
            if (response.status === 1) {
                setOrderList((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };


    const checkDeliveryStatus = (deliveryDate) => {
        return moment(deliveryDate).isBefore(moment(), 'day') ? 'Delivered' : 'Pending';
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <h1 className="mt-3">Orders</h1>
                <div className="row mt-3">
                    <div className="col-md-12 table-responsive">
                        <table className="order_table table shadow">
                            <thead>
                                <tr>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Book Cover</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Delivery Date</th>
                                    <th scope="col">Delivery Address</th>
                                    <th scope="col">Delivery status</th>
                                    <th scope="col">Total Amount</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.length > 0 ? (
                                    orderList.map((order) => (
                                        <tr key={order._id} className="align-middle">
                                            <td>{order._id.slice(15, 24)}</td>
                                            <td><img src={order.productDetails.card_pic} alt="Product" width="100" height="140" className="img-thumbnail" /></td>
                                            <td>{order.productDetails.productName}</td>
                                            <td>Rs. {order.productDetails.price}</td>
                                            <td>{order.totalQuantity}</td>
                                            <td>{moment(order.insert_date_time).format("DD MMM, YYYY")}</td>
                                            <td>{moment(order.delivery_date_time).format("DD MMM, YYYY")}</td>
                                            <td>{order.address.slice(0, 16)}...</td>
                                            <td className={checkDeliveryStatus(order.delivery_date_time) === 'Delivered' ? 'text-success' : 'text-danger'}>
                                                {checkDeliveryStatus(order.delivery_date_time)}
                                            </td>
                                            <td>Rs. {order.totalQuantity * order.productDetails.price}</td>
                                            <td>
                                                <RiDeleteBinLine className="nav-icon" onClick={() => handleDeleteOrder(order._id)} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="text-center py-5">No orders found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}