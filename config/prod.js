export default {
    // dbURL: 'mongodb+srv://amir:PiElWkxVUTl9UdQK@cluster0.a5p0yzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    dbURL: `mongodb+srv://amir:${process.env.SECRETMONGO}@cluster0.a5p0yzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    dbName: 'comfy-store-db',
}
