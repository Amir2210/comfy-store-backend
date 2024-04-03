import { ObjectId } from 'mongodb'

import { utilService } from '../../services/util.service.js'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

export const productsService = {
  query,
  getById,
}

async function query() {
  try {
    const collection = await dbService.getCollection('products')
    var products = await collection.find().toArray()
    return products
  } catch (err) {
    logger.error('cannot find products', err)
    throw err
  }
}

async function getById(productId) {
  try {
    const collection = await dbService.getCollection('products')
    const product = await collection.findOne({ _id: new ObjectId(productId) })
    return product
  } catch (error) {
    logger.error(`while finding product ${productId}`, err)
    throw err
  }
}