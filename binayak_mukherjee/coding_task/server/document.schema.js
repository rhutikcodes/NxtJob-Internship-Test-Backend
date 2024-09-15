import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({

    documentId: {
        type:String,
        required: true
    },
    data: {
        type: Object,
    }
});


const DocumentModel = mongoose.model("Document", documentSchema);

export default DocumentModel;