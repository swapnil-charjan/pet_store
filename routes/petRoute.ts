/**
 * @swagger
 * tags:
 *   - name: Pets
 *     description: Pet management API
 *
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
 *
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
 *
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
 *
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
 *
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
 *
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
 *         image:
 *           type: string
 *           description: URL pointing to the image of the pet
 *         owner:
 *           type: string
 *           description: Name or ID of the pet owner
 *         color:
 *           type: string
 *           description: The primary color of the pet
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the pet
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the pet
 *       required:
 *         - name
 *         - age
 *         - type
 *         - breed
 *         - image
 *         - owner
 *         - color
 *       example:
 *         id: "60c72b2f9b1e8b001c8e4f3a"
 *         name: "Buddy"
 *         age: 3
 *         type: "Dog"
 *         breed: "Golden Retriever"
 *         image: "http://example.com/images/buddy.jpg"
 *         owner: "John Doe"
 *         color: "Golden"
 */

import { Router } from "express";
import petController from "../controllers/petController";
import  validate from "../middleware/validate";
import  petValidate  from "../validators/petValidator";


const petRouter = Router();

//Handle Routes
petRouter.get("/pet", petController.getAllPets);
petRouter.post("/pet", petValidate, validate, petController.addPet);
petRouter.get("/pet/:id", petController.getPetById);
petRouter.put("/pet/:id", petValidate, validate, petController.updatePetById);
petRouter.delete("/pet/:id", petController.deletePetById);

export default petRouter;