const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllPatients, getPatientById, addPatient, updatePatient, deletePatient, getCriticalPatients, updatePatientStatus } = require('../controllers/patientController');
const Patient = require('../models/Patient');

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - name
 *         - dob
 *         - gender
 *         - userId
 *       properties:
 *         name:
 *           type: string
 *           description: Patient's full name
 *         dob:
 *           type: string
 *           format: date
 *           description: Patient's date of birth
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *           description: Patient's gender
 *         address:
 *           type: string
 *           description: Patient's address
 *         contactNumber:
 *           type: string
 *           description: Patient's contact number
 *         userId:
 *           type: string
 *           description: ID of the healthcare provider
 *         status:
 *           type: string
 *           enum: [Critical, Stable]
 *           default: Stable
 *           description: Patient's current status
 */

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients for a specific user
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *   post:
 *     summary: Add a new patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: Patient created successfully
 */
router.get('/', getAllPatients);
router.post('/', addPatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update patient details
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

/**
 * @swagger
 * /api/patients/critical:
 *   get:
 *     summary: Get all critical patients
 *     tags: [Patients]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to filter critical patients
 *     responses:
 *       200:
 *         description: List of critical patients
 *       500:
 *         description: Server error
 */
router.get('/critical', getCriticalPatients);

/**
 * @swagger
 * /api/patients/update-status/{id}:
 *   put:
 *     summary: Update patient status
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Critical, Stable]
 *                 description: Patient's new status
 *     responses:
 *       200:
 *         description: Patient status updated successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 */
router.put('/update-status/:id', updatePatientStatus);

module.exports = router;
