export default {
    // dbURL: 'mongodb://127.0.0.1:27017',
    // dbURL: 'mongodb+srv://amir:amir123@cluster0.a5p0yzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    dbURL: `mongodb+srv://amir:${process.env.SECRETMONGO}@cluster0.a5p0yzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    dbName: 'comfy-store-db',
}
