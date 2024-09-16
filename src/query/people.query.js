const PEOPLE_QUERY = {
    SELECT_PEOPLE: 'SELECT * FROM people ORDER BY created_at DESC LIMIT 100',
    SELECT_PERSON: 'SELECT * FROM people WHERE id = ?',
    CREATE_PERSON: 'INSERT INTO people (given_name, family_name, date_of_birth, place_of_birth_id) VALUES (?, ?, ?, ?)',
    CREATE_PERSON_PROCEDURE: 'CALL create_people(?, ?, ?, ?)',
    UPDATE_PERSON: 'UPDATE people SET given_name = ?, family_name = ?, date_of_birth = ?, place_of_birth = ? WHERE id = ?',
    DELETE_PERSON: 'DELETE FROM people WHERE id = ?',
  };
  
  export default PEOPLE_QUERY;
  