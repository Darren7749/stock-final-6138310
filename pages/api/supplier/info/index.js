import { connect, model, models, Schema } from "mongoose"
const connectionString = 'mongodb+srv://hoangvo:m61BHSRScunpPQpy@hoangvo.72khwmn.mongodb.net/supplier'

// export default async function handler(req, res) {
//     await connect(connectionString);
//     console.log("req.method: ", req.method)

//     if (req.method === 'GET') {
//         const docs = await Info.find()
//         res.status(200).json(docs)
//     } else if (req.method === 'POST') {
//         console.log(typeof(req.body))
//         // res.status(200).json(req.body)
//         const doc = await Info.create(req.body)
//         res.status(201).json(doc)
//     } else {
//         res.setHeader('Allow', ['GET', 'POST'])
//         res.status(405).end(`Method ${req.method} Not Allowed`)
//     }
// }

export default async function handler(req, res) {
  await connect(connectionString);
  console.log("req.method: ", req.method);

  if (req.method === 'GET') {
    const docs = await Info.find();
    res.status(200).json(docs);
  } else if (req.method === 'POST') {
    console.log(typeof(req.body));
    const doc = await Info.create(req.body);
    res.status(201).json(doc);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    const doc = await Info.findByIdAndDelete(id);
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).end(`Document with id ${id} not found`);
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
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