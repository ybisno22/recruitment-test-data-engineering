import express from 'express';
import { getPeople, createPerson, getPersonById, updatePerson, deletePerson } from '../controller/people.controller.js';

const peopleRoutes = express.Router();

peopleRoutes.route('/')
    .get(getPeople)
    .post(createPerson);

peopleRoutes.route('/:id')
    .get(getPersonById)
    .put(updatePerson)
    .delete(deletePerson);

export default peopleRoutes;