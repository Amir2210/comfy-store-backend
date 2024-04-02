import express from 'express'
import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getProducts } from './product.controller.js'
export const productRoute = express.Router()

productRoute.get(`/`, log, getProducts)
