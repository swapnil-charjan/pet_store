import { Request, Response } from "express";
import { Pet } from "../modules/pet";

const addPet = async (req: Request, res: Response) => {
    const { name, age, type, breed, color, image, owner } = req.body;
    try {
        const pet = await Pet.create({
            name,
            age,
            type,
            breed,
            color,
            image,
            owner
        });
        res.status(201).json({ message: "Pet added successfully!", pet });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    }
}

const getAllPets = async (req: Request, res: Response) => {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 10, 1);
    const skip = (page - 1) * limit;
    const { name, age, type, breed, owner, color } = req.query; // Extract possible filters from query
    const filters: any = {}; // Build dynamic filter object

    if (name) filters.name = { $regex: name, $options: "i" }; // partial match, case-insensitive
    if (age) filters.age = Number(age);
    if (type) filters.type = type;
    if (breed) filters.breed = breed;
    if (owner) filters.owner = owner;
    if (color) filters.color = color;


    try {
        const total = await Pet.countDocuments(filters);
        const pets = await Pet.find(filters).skip(skip).limit(limit);

        if (pets.length === 0) {
            // Build a readable filter string
            const filterDescriptions = Object.entries(filters).map(([key, val]) => {
                if (
                    typeof val === "object" &&
                    val !== null &&
                    '$regex' in val &&
                    typeof (val as any).$regex === "string"
                ) {
                    return `${key} contains "${(val as any).$regex}"`;
                }
                return `${key} equals "${val}"`;
            });
            const filterMessage = filterDescriptions.length
                ? `No pets found.`
                : "Pets not availables.";

            return res.status(404).json({
                message: filterMessage,
            });
        }

        res.status(200).json({
            message: "Pets fetched successfully!",
            pets,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching pets" });
    }
};

const getPetById = async (req: Request, res: Response) => {
    try {
        const petId = req.params.id;
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        res.status(200).json({ message: "Pet fetched successfully!", pet: pet });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching pet" });
    }
}

const updatePetById = async (req: Request, res: Response) => {
    const petId = req.params.id;
    const updateData = req.body;
    console.log(updateData)
    try {
        const updatedPet = await Pet.findByIdAndUpdate(petId, updateData, { new: true });
        if (!updatedPet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        res.status(200).json({ message: "Pet updated successfully!", pet: updatedPet });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching pet" });
    }
}

const deletePetById = async (req: Request, res: Response) => {
    const petId = req.params.id;
    try {
        const deletedPet = await Pet.findByIdAndDelete(petId);
        if (!deletedPet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        res.status(200).json({ message: "Pet deleted successfully", pet: deletedPet });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching pet" });
    }
}

export default {
    addPet,
    getAllPets,
    getPetById,
    updatePetById,
    deletePetById
}