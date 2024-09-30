const fetchData = async () => {
    try {
      const response = await fetch('https://b6yxpbgn7k.execute-api.eu-north-1.amazonaws.com/GetNurseData');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
  
      // Map the data to the expected format
      const mappedData = data.map(user => ({
        id: user.id,
        givenName: user.GivenName,
        familyName: user.FamilyName,
        phone: user.Phone,
        email: user.Email,
        status: user.Status,
        createdBy: user.CreatedBy,
        dateCreated: user.DateCreated,
        lastModifiedBy: user.LastModifiedBy,
        dateLastModified: user.DateLastModified,
      }));
      
      return mappedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Return an empty array on error
    }
  };
  
  export default fetchData;
  