import { logger } from '../../services/logger.service.js'
import { featuredProductsService } from './featuredProducts.service.js'

export async function getFeaturedProducts(req, res) {
    try {
        logger.debug('Getting featuredProducts')
        const featuredProducts = await featuredProductsService.query()
        res.json(featuredProducts)
    } catch (err) {
        logger.error('Failed to get featuredProducts', err)
        res.status(500).send({ err: 'Failed to get featuredProducts' })
    }
}
