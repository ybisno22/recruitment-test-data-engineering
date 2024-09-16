const PLACES_QUERY = {
    SELECT_PLACES: 'SELECT * FROM places ORDER BY created_at DESC LIMIT 100',
    SELECT_PLACE: 'SELECT * FROM places WHERE id = ?',
    CREATE_PLACE: 'INSERT INTO places (city, county, country) VALUES (?, ?, ?)',
    UPDATE_PLACE: 'UPDATE places SET city = ?, county = ?, country = ? WHERE id = ?',
    DELETE_PLACE: 'DELETE FROM places WHERE id = ?',
  };
  
  export default PLACES_QUERY;
  