import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc Create New Order
//@route POST /api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No ORder Items");
  } else {
    const order = new Order({
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//@desc Get Logged In Users Orders
//@route GET /api/orders/myorders
//@access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//@desc Get Order By ID
//@route GET /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//@desc Update Order To PAID
//@route GET /api/orders/:id/pay
//@access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update Order To Paid");
});

//@desc Update Order To Delivered
//@route GET /api/orders/:id/deliver
//@access Private

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update Order To Delivered");
});

//@desc Get All Orders
//@route GET /api/orders
//@access Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  res.send("Get All Orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};