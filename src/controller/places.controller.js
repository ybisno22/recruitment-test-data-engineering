import { connection } from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/httpStatus.js";
import PLACES_QUERY from "../query/places.query.js";


export const getPlaces = async (req, res) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request`);

    try {
        const pool = await connection();
        const [results] = await pool.query(PLACES_QUERY.SELECT_PLACES);

        return res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, results.length ? "Places found." : "No places found.", results));

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Error fetching places."));
    }
};

export const getPlaceById = async (req, res) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request`);

    try {
        const pool = await connection();
        const [results] = await pool.query(PLACES_QUERY.SELECT_PLACE, [req.params.id]);

        if (results.length === 0) {
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Place with id ${req.params.id} was not found.`));
        }

        return res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Place retrieved successfully.", results[0]));

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Error fetching a place."));
    }
}

export const createPlace = async (req, res) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request`);

    try {
        const pool = await connection();
        const { city, county, country } = req.body;

        const [results] = await pool.query(PLACES_QUERY.CREATE_PLACE_PROCEDURE, [city, county, country]);

        const place = results[0][0];

        return res.status(HttpStatus.CREATED.code)
            .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "Place created successfully.", { place }));

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Error creating a place."));
    }
}

export const updatePlace = async (req, res) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request`);

    try {
        const pool = await connection();
        const { city, county, country } = req.body;
        const { id } = req.params;

        const [results] = await pool.query(PLACES_QUERY.UPDATE_PLACE, [city, county, country, id]);

        if (results.affectedRows === 0) {
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Place with id ${id} was not found.`));
        }

        const [updatedPlace] = await pool.query(PLACES_QUERY.SELECT_PLACE, [id]);

        return res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Place updated successfully.", updatedPlace[0]));

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Error updating a place."));
    }
}

export const deletePlace = async (req, res) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request`);

    try {
        const pool = await connection();
        const { id } = req.params;

        const [results] = await pool.query(PLACES_QUERY.DELETE_PLACE, [id]);

        if (results.affectedRows === 0) {
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Place with id ${id} was not found.`));
        }

        return res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Place deleted successfully."));

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Error deleting a place."));
    }
}

