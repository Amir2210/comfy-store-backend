import { ObjectId } from 'mongodb'

import { utilService } from '../../services/util.service.js'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

export const featuredProductsService = {
    query,
}

async function query() {
    try {
        const collection = await dbService.getCollection('featuredProducts')
        var featuredProducts = await collection.find().toArray()
        return featuredProducts
    } catch (err) {
        logger.error('cannot find featuredProducts', err)
        throw err
    }
}
