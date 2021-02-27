import express from 'express'
const router = express.Router()
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getOrders,
    getAllOrders,
    updateOrderToDelivered
} from '../controllers/orderController.js'
import { protect, admin } from '../midleware/authMiddleware.js'


router.route('/myorders').get(protect, getOrders)
router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router