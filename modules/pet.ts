import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        type: { type: String, required: true },
        breed: { type: String, required: true },
        image: { type: String, required: true },
        owner: { type: String, required: true },
        color: { type: String, required: true },
    },
    { timestamps: true }
);

export const Pet = mongoose.model('Pet_data', PetSchema);