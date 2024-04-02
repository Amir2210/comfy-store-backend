import { logger } from '../../services/logger.service.js'
import { productsService } from './product.service.js'

export async function getProducts(req, res) {
  console.log('req')
  try {
    logger.debug('Getting products')
    const products = await productsService.query()
    console.log(products)
    res.json(products)
  } catch (err) {
    logger.error('Failed to get products', err)
    res.status(500).send({ err: 'Failed to get products' })
  }
}