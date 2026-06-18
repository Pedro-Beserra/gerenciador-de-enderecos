import express from 'express';
import { create, list, getById, update,  remove } from "./addressController.js"

const router = express.Router();

router.post('/addresses', create);
router.get('/addresses', list);
router.get('/addresses/:id', getById);
router.put('/addresses/:id', update);
router.delete('/addresses/:id', remove);

export default router;