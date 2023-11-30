export async function fetchADFPipelineData(){
    try{
        const response = await fetch('https://cloud-adf.azurewebsites.net/api/Pipeline',{
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            },
        });
        const data = await response.json();
        return await data;
    } catch(error){
        // console.log('Error fetching pipelines data:', error);
        return error;
    }
}