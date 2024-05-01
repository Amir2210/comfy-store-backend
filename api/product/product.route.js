import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { getProducts, getProductById } from './product.controller.js'
export const productRoute = express.Router()

productRoute.get(`/`, log, getProducts)
productRoute.get('/:id', log, getProductById)
