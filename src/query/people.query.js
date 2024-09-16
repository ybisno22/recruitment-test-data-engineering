const PEOPLE_QUERY = {
    SELECT_PLACES: 'SELECT * FROM people ORDER BY created_at DESC LIMIT 100',
    SELECT_PLACE: 'SELECT * FROM people WHERE id = ?',
    CREATE_PLACE: 'INSERT INTO people (given_name, family_name, date_of_birth, places_of_birth_id) VALUES (?, ?, ?, ?)',
    UPDATE_PLACE: 'UPDATE people SET given_name = ?, family_name = ?, date_of_birth = ?, place_of_birth = ? WHERE id = ?',
    DELETE_PLACE: 'DELETE FROM people WHERE id = ?',
  };
  
  export default PEOPLE_QUERY;
  