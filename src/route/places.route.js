import express from 'express';
import { getPlaces, createPlace, getPlaceById, updatePlace, deletePlace } from '../controllers/places.controller.js';

const placesRoutes = express.Router();

placesRoutes.route('/')
    .get(getPlaces)      
    .post(createPlace);

placesRoutes.route('/:id')
    .get(getPlaceById)
    .put(updatePlace)
    .delete(deletePlace);

export default placesRoutes;