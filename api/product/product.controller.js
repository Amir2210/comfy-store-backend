import { logger } from '../../services/logger.service.js'
import { productsService } from './product.service.js'

export async function getProducts(req, res) {
  const nameInputValue = req.query.params.filterBy.txt
  console.log('nameInputValue', nameInputValue)
  try {
    const filterBy = {
      txt: nameInputValue || ''
    }
    logger.debug('Getting products', filterBy)
    const products = await productsService.query(filterBy)
    // console.log(products)
    res.json(products)
  } catch (err) {
    logger.error('Failed to get products', err)
    res.status(500).send({ err: 'Failed to get products' })
  }
}

export async function getProductById(req, res) {
  try {
    const productId = req.params.id
    const product = await productsService.getById(productId)
    res.json(product)
  } catch (error) {
    logger.error('Failed to get product', err)
    res.status(500).send({ err: 'Failed to get product' })
  }
}