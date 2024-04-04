import { ObjectId } from 'mongodb'

import { utilService } from '../../services/util.service.js'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

export const productsService = {
  query,
  getById,
}

async function query(filterBy = { txt: '', category: '', company: '', maxPrice: '', freeShipping: '' }, sortBy = { subject: '' }) {
  console.log(' filterBy.freeShipping:', filterBy.freeShipping, true)
  try {
    const criteria = {
      title: { $regex: filterBy.txt, $options: 'i' },
    }
    if (filterBy.category) {
      criteria.category = filterBy.category
    }
    if (filterBy.company) {
      criteria.company = filterBy.company
    }
    if (filterBy.maxPrice) {
      criteria.price = { $lte: parseFloat(filterBy.maxPrice) };
    }
    if (filterBy.freeShipping === 'true') {
      criteria.shipping = filterBy.freeShipping === 'true'
    }
    if (sortBy.subject === 'price') {
      const collection = await dbService.getCollection('products')
      var products = await collection.find(criteria).sort({ price: -1 }).toArray()
      return products
    }
    if (sortBy.subject === '-price') {
      const collection = await dbService.getCollection('products')
      var products = await collection.find(criteria).sort({ price: 1 }).toArray()
      return products
    }
    if (sortBy.subject === 'title') {
      const collection = await dbService.getCollection('products')
      var products = await collection.find(criteria).sort({ title: 1 }).toArray()
      return products
    }
    if (sortBy.subject === '-title') {
      const collection = await dbService.getCollection('products')
      var products = await collection.find(criteria).sort({ title: -1 }).toArray()
      return products
    }
    // console.log(criteria)
    const collection = await dbService.getCollection('products')
    var products = await collection.find(criteria).toArray()
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