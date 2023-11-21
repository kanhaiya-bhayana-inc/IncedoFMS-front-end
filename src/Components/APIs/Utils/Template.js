export async function downloadTemplateFile(request) {
    try {
      const response = await fetch(`https://cloud-fms.azurewebsites.net/api/file/DownloadFile?check=${request}`,{
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
        },
    
      }); // Replace with your API endpoint
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      console.log('reached');
      console.log('res->', response);
      console.log('url-> ',url);
      if (response.status != 200) return null;
  
      return url;
    } catch (error) {
      console.error('Error downloading file:', error);
      return null;
    }
  }