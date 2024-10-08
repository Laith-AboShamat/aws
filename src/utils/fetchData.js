const fetchData = async () => {
    try {
      const response = await fetch('https://b6yxpbgn7k.execute-api.eu-north-1.amazonaws.com/GetNurseData');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
  

      const mappedData = data.map(user => ({
        id: user.id,
        givenName: user.GivenName || user.givenName,
        familyName: user.FamilyName || user.familyName,
        phone: user.Phone || user.phone,
        email: user.Email || user.email,
        status: user.Status || user.status,
        createdBy: user.CreatedBy || user.createdBy,
        dateCreated: user.DateCreated || user.dateCreated,
        lastModifiedBy: user.LastModifiedBy || user.lastModifiedBy,
        dateLastModified: user.DateLastModified || user.dateLastModified,
      }));
      
      
      return mappedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  export default fetchData;
  