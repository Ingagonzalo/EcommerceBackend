export default class memDao {
    constructor(collection) {
        this.collection = collection;
    }
    async create(documentToCreate) {
        try {
            const createdDocument = await this.collection.create(documentToCreate);
            return createdDocument;
        }
        catch (err) {
            console.log("Error creating document", err)

        }
    }
    async update(updateData, id) {
        try {
            const updatedDocument = await this.collection.updateOne({
                _id: id
            }, updateData);
            return updatedDocument;
        }
        catch (err) {
            console.log("Error updateing document", err)

        }
    }
    async getAll() {
        try {
            const allDocuments = await this.collection.find();
            return allDocuments;
        }
        catch (err) {
            console.log("Error getting all documents", err)

        }

    }
    async getById(id) {
        try {
            const document = await this.collection.findById(id);
            return document;
        }
        catch (err) {
            console.log("Error getting document by id", err)

        }

    }
    async delete(id) {
        try {
            const deletedDocument = await this.collection.deleteOne({ _id: id });
            return deletedDocument;
        }
        catch (err) {
            console.log("Error deleted document", err)

        }

    }

}

