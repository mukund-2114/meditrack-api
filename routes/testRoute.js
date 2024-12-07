const express = require('express');
const router = express.Router();
const { getTestsByPatientId, addTest, getAllCriticalPatients, editTest, getTestById, deleteTest } = require('../controllers/testController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Test:
 *       type: object
 *       required:
 *         - patientId
 *         - dataType
 *         - reading
 *         - testDate
 *       properties:
 *         patientId:
 *           type: string
 *           description: ID of the patient
 *         dataType:
 *           type: string
 *           enum: [Blood Pressure, Respiratory Rate, Blood Oxygen Level, Heartbeat Rate]
 *           description: Type of test data
 *         reading:
 *           type: number
 *           description: Test reading value
 *         testDate:
 *           type: string
 *           format: date-time
 *           description: Date and time of the test
 */

/**
 * @swagger
 * /api/tests/{patientId}/tests:
 *   get:
 *     summary: Get all tests for a specific patient
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tests
 *   post:
 *     summary: Add a new test for a patient
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dataType
 *               - reading
 *               - testDate
 *             properties:
 *               dataType:
 *                 type: string
 *                 enum: [Blood Pressure, Respiratory Rate, Blood Oxygen Level, Heartbeat Rate]
 *               reading:
 *                 type: number
 *               testDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Test added successfully
 */
router.get('/:patientId/tests', getTestsByPatientId);
router.post('/:patientId/tests', addTest);

/**
 * @swagger
 * /api/tests/critical:
 *   get:
 *     summary: Get all critical tests
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: List of critical tests
 */
router.get('/critical', getAllCriticalPatients);

/**
 * @swagger
 * /api/tests/{testId}:
 *   get:
 *     summary: Get test by ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Test details
 *   put:
 *     summary: Edit test
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Test'
 *     responses:
 *       200:
 *         description: Test updated successfully
 *   delete:
 *     summary: Delete test
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Test deleted successfully
 */
router.get('/:testId', getTestById);
router.put('/:testId', editTest);
router.delete('/:testId', deleteTest);

module.exports = router;
