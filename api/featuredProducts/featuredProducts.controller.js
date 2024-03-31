import { logger } from '../../services/logger.service.js'
import { featuredProductsService } from './featuredProducts.service.js'

export async function getFeaturedProducts(req, res) {
    console.log('req')
    try {
        logger.debug('Getting featuredProducts')
        const featuredProducts = await featuredProductsService.query()
        res.json(featuredProducts)
    } catch (err) {
        logger.error('Failed to get featuredProducts', err)
        res.status(500).send({ err: 'Failed to get featuredProducts' })
    }
}

export async function getFeaturedProductById(req, res) {
    try {
        const featuredProductId = req.params.id
        const featuredProduct = await featuredProductsService.getById(featuredProductId)
        res.json(featuredProduct)
    } catch (error) {
        logger.error('Failed to get featuredProduct', err)
        res.status(500).send({ err: 'Failed to get featuredProduct' })
    }
}
