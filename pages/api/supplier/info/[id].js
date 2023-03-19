import { connect, model, models, Schema } from "mongoose"
const connectionString = 'mongodb+srv://hoangvo:m61BHSRScunpPQpy@hoangvo.72khwmn.mongodb.net/supplier'

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method)
    console.log("req.query.id", req.query.id)

    const id = req.query.id
    if (req.method === 'GET') {
        // Get only one document
        const doc = await Info.findOne({ _id: id })
        res.status(200).json(doc)
    } else if (req.method === 'DELETE') {
        const deletedDoc = await Info.deleteOne({ _id: id })
        res.status(200).json(deletedDoc)
    } else if (req.method === 'PUT') {
        console.log('id',req.query.id)
        console.log(req.body)
        const updatedDoc = await Info.updateOne({_id: id}, req.body)
        res.status(200).json(updatedDoc)
    } else {
        res.setHeader('Allow', ['GET', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}



const infoSchema = new Schema({
    supplier_ID: String,
    supplier_name: String,
    address: String,
    phone_number: String,
});

console.log("Mongoose Models", models)
const Info = models?.info || model('info', infoSchema);