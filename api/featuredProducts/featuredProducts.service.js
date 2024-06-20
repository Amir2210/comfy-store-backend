import { ObjectId } from 'mongodb'

import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

export const featuredProductsService = {
    query,
    getById
}

async function query() {
    try {
        const collection = await dbService.getCollection('featuredProducts')
        console.log(collection)
        var featuredProducts = await collection.find().toArray()
        return featuredProducts
    } catch (err) {
        logger.error('cannot find featuredProducts', err)
        throw err
    }
}

async function getById(featuredProductId) {
    try {
        const collection = await dbService.getCollection('featuredProducts')
        const featuredProduct = await collection.findOne({ _id: new ObjectId(featuredProductId) })
        return featuredProduct
    } catch (error) {
        logger.error(`while finding featuredProduct ${featuredProductId}`, err)
        throw err
    }
}
