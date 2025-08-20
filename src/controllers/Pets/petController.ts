import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export const getAllPets = async (req: Request, res: Response) => {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 10, 1);
    const skip = (page - 1) * limit;
    const { name, age, type, ownerId } = req.query;
    const filters: any = {}; // Build filters

    if (name) {
        filters.name = {
            contains: String(name),
            mode: 'insensitive',
        };
    }

    if (age) filters.age = Number(age);
    if (type) filters.type = String(type);
    if (ownerId) filters.ownerId = Number(ownerId);

    try {
        const total = await prisma.pet_details.count({
            where: filters,
        });

        const pets = await prisma.pet_details.findMany({
            where: filters,
            skip,
            take: limit,
            include: { owner: true }, // Optional: include user info
        });

        if (pets.length === 0) {
            return res.status(404).json({
                message: "No pets found.",
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
                hasPrevPage: page > 1,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching pets" });
    }
};

export const addPet = async (req: Request, res: Response) => {
    const { name, age, type, breed, color, imageUrl, ownerId } = req.body;

    try {
        const pet = await prisma.pet_details.create({
            data: {
                name,
                age,
                type,
                breed,
                color,
                imageUrl,
                owner: {
                    connect: { id: ownerId }, // required relation
                },
            },
        });

        res.status(201).json({ message: 'Pet added successfully!', pet });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add pet', error: err });
    }
};

export const getPetById = async (req: Request, res: Response) => {
    const petId = req.params.id;

    try {
        const pet = await prisma.pet_details.findUnique({
            where: { id: petId },
            include: { owner: true }, // Optional
        });

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        res.status(200).json({ message: "Pet fetched successfully!", pet });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching pet" });
    }
};

export const updatePetById = async (req: Request, res: Response) => {
    const petId = req.params.id;
    const updateData = req.body;
    try {
        const updatedPet = await prisma.pet_details.update({
            where: { id: petId },
            data: {
                ...updateData,
                updatedAt: new Date(), // Prisma handles this with @updatedAt, but explicit update won't hurt
            },
        });

        res.status(200).json({
            message: "Pet updated successfully!",
            pet: updatedPet,
        });
    } catch (err: any) {
        if (err.code === 'P2025') {
            return res.status(404).json({ message: "Pet not found" });
        }
        console.error(err);
        res.status(500).json({ message: "Error updating pet" });
    }
};

export const deletePetById = async (req: Request, res: Response) => {
    const petId = req.params.id;
    try {
        const deletedPet = await prisma.pet_details.delete({
            where: { id: petId },
        });

        res.status(200).json({
            message: "Pet deleted successfully",
            pet: deletedPet,
        });
    } catch (err: any) {
        if (err.code === 'P2025') {
            return res.status(404).json({ message: "Pet not found" });
        }
        console.error(err);
        res.status(500).json({ message: "Error deleting pet" });
    }
};




