import { ObjectId } from 'mongodb'

import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

const PAGE_SIZE = 10
export const productsService = {
  query,
  getById,
}


async function query(filterBy = { txt: '', category: '', company: '', maxPrice: '', freeShipping: '', pageIdx: 0 }, sortBy = { subject: '' }) {
  const skip = filterBy.pageIdx === 0 ? 0 : filterBy.pageIdx * PAGE_SIZE
  const limit = PAGE_SIZE
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
      criteria.price = { $lte: parseFloat(filterBy.maxPrice) }
    }
    if (filterBy.freeShipping === 'true') {
      criteria.shipping = filterBy.freeShipping === 'true'
    }

    const collection = await dbService.getCollection('products')
    let totalItems = 0
    let products

    if (sortBy.subject === 'price') {
      products = await collection.find(criteria, { skip, limit }).sort({ price: -1 }).toArray()
    } else if (sortBy.subject === '-price') {
      products = await collection.find(criteria, { skip, limit }).sort({ price: 1 }).toArray()
    } else if (sortBy.subject === 'title') {
      products = await collection.find(criteria, { skip, limit }).sort({ title: 1 }).toArray()
    } else if (sortBy.subject === '-title') {
      products = await collection.find(criteria, { skip, limit }).sort({ title: -1 }).toArray()
    } else {
      totalItems = await collection.countDocuments(criteria)
      products = await collection.find(criteria, { skip, limit }).toArray()
    }

    if (!totalItems) {
      // totalItems = await collection.find(criteria).count()
      totalItems = await collection.countDocuments(criteria)
    }
    return { products, totalItems }
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