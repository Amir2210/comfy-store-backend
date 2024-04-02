import { ObjectId } from 'mongodb'

import { utilService } from '../../services/util.service.js'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

export const productsService = {
  query,
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