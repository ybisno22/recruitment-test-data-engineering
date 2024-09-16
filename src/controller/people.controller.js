import { connection } from "../config/mysql.config.js";
import Response from "../util/response.js";
import HttpStatus from "../util/httpStatus.js";
import PEOPLE_QUERY from "../query/people.query.js";

export const getPeople = async (req, res) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request`);

    try {
        const pool = await connection();
        const [results] = await pool.query(PEOPLE_QUERY.SELECT_PEOPLE);

        return res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, results.length ? "People found." : "No people found.", results));

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Error fetching people."));
    }
};

export const getPersonById = async (req, res) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request`);

    try {
        const pool = await connection();
        const [results] = await pool.query(PEOPLE_QUERY.SELECT_PERSON, [req.params.id]);

        if (results.length === 0) {
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Person with id ${req.params.id} was not found.`));
        }

        return res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Person retrieved successfully.", results[0]));

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Error fetching a person."));
    }
}

export const createPerson = async (req, res) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request`);

    try {
        const pool = await connection(); 
        const { given_name, family_name, date_of_birth, place_of_birth_id } = req.body;

        const [results] = await pool.query(PEOPLE_QUERY.CREATE_PERSON_PROCEDURE, [given_name, family_name, date_of_birth, place_of_birth_id]);

        const person = results[0][0]; 

        return res.status(HttpStatus.CREATED.code)
            .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "Person created successfully.", { person }));

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Error creating a person."));
    }
};

export const updatePerson = async (req, res) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request`);

    try {
        const pool = await connection();
        const { given_name, family_name, date_of_birth, place_of_birth_id } = req.body;
        const { id } = req.params; 

        const [result] = await pool.query(PEOPLE_QUERY.UPDATE_PERSON, [given_name, family_name, date_of_birth, place_of_birth_id, id]);

        if (result.affectedRows === 0) {
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Person with id ${id} was not found.`));
        }

        const [updatedPerson] = await pool.query(PEOPLE_QUERY.SELECT_PERSON, [id]);

        return res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Person updated successfully.", updatedPerson[0]));

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Error updating person."));
    }
};

export const deletePerson = async (req, res) => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method} ${req.originalUrl} Request`);

    try {
        const pool = await connection();
        const { id } = req.params;

        const [result] = await pool.query(PEOPLE_QUERY.DELETE_PERSON, [id]);

        if (result.affectedRows === 0) {
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Person with id ${id} was not found.`));
        }

        return res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Person deleted successfully."));

    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
            .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, "Error deleting person."));
    }
};