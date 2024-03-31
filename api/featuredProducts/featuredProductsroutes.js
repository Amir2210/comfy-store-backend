import express from 'express'

import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getFeaturedProducts, getFeaturedProductById } from './featuredProducts.controller.js'

export const featuredProductsRoutes = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

featuredProductsRoutes.get('/', log, getFeaturedProducts)
featuredProductsRoutes.get('/:id', log, getFeaturedProductById)
