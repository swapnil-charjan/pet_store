import { Router } from "express";
import { validateDto } from "../middleware/validate"; 
import { PetDto } from '../validators/petDto';
import {
  getAllPets,
  addPet,
  getPetById,
  updatePetById,
  deletePetById,
  getOwnerPetsById
} from "../controllers/Pets/petController";
import { authenticateJWT } from "../middleware/userMiddleware";

const petRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Pet management API
 */

/**
 * @swagger
 * /pet:
 *   get:
 *     summary: Get all pets
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of items per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter pets by name (partial match)
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter pets by exact age
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter pets by type (e.g., Dog, Cat)
 *       - in: query
 *         name: breed
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter pets by breed
 *       - in: query
 *         name: owner
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter pets by owner name or ID
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter pets by primary color
 *     responses:
 *       200:
 *         description: List of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
petRouter.get("/pet", authenticateJWT, getAllPets);

/**
 * @swagger
 * /pet:
 *   post:
 *     summary: Add a new pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Pet created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pet:
 *                   $ref: '#/components/schemas/Pet'
 */
petRouter.post("/pet", authenticateJWT, validateDto(PetDto), addPet);

/**
 * @swagger
 * /pet/{id}:
 *   get:
 *     summary: Get a pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The pet ID
 *     responses:
 *       200:
 *         description: Pet found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet not found
 */
petRouter.get("/pet/:id", authenticateJWT, getPetById);

/**
 * @swagger
 * /pet/owner/{id}:
 *   get:
 *     summary: Get owner details by ID
 *     description: Fetch an owner by their ID along with their pets.
 *     tags:
 *       - Pets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Owner ID
 *     responses:
 *       200:
 *         description: Owner details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "clxyz12345"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 pets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "pet123"
 *                       name:
 *                         type: string
 *                         example: "Buddy"
 *                       type:
 *                         type: string
 *                         example: "Dog"
 *                       age:
 *                         type: integer
 *                         example: 3
 *                       breed:
 *                         type: string
 *                         example: "Golden Retriever"
 *                       color:
 *                         type: string
 *                         example: "Golden"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/dog.jpg"
 *       404:
 *         description: Owner not found
 *       500:
 *         description: Server error
 */
petRouter.get("/pet/owner/:id", authenticateJWT, getOwnerPetsById);

/**
 * @swagger
 * /pet/{id}:
 *   put:
 *     summary: Update a pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The pet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Pet updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pet:
 *                   $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet not found
 */
petRouter.put("/pet/:id", authenticateJWT, validateDto(PetDto), updatePetById);

/**
 * @swagger
 * /pet/{id}:
 *   delete:
 *     summary: Delete a pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The pet ID
 *     responses:
 *       200:
 *         description: Pet deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pet:
 *                   $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet not found
 */
petRouter.delete("/pet/:id", authenticateJWT, deletePetById);

export default petRouter;


/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the pet
 *         name:
 *           type: string
 *           description: The name of the pet
 *         age:
 *           type: integer
 *           description: The age of the pet in years
 *         type:
 *           type: string
 *           description: The type of the pet (e.g., Dog, Cat, Bird)
 *         breed:
 *           type: string
 *           description: The breed of the pet (e.g., Labrador, Persian)
 *         color:
 *           type: string
 *           description: The primary color of the pet
 *         owner:
 *           type: string
 *           description: Name of the pet owner
 *         ownerId:
 *           type: string
 *           description: ID of the pet owner
 *         image:
 *           type: string
 *           description: URL pointing to the image of the pet
 *       required:
 *         - name
 *         - age
 *         - type
 *         - breed
 *         - color
 *         - owner
 *         - ownerId
 *         - image
 *       example:
 *         name: "Buddy"
 *         age: 3
 *         type: "Dog"
 *         breed: "Golden Retriever"
 *         color: "Golden"
 *         owner: "John Doe"
 *         ownerId: "cmejt8mmp000053oo6pe1llss"
 *         image: "http://example.com/images/buddy.jpg"
 */
