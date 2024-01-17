import { routes } from "../../../utility/Globals";


export async function fetchADFPipelineData(){
    try{
        const response = await fetch(routes.getADFPipelines,{
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            },
        });
        const data = await response.json();
        return await data;
    } catch(error){
        console.log('Error fetching pipelines data:', error);
        return error;
    }
}

export async function reRunAdFPipeline(pipelineName){
    try{
        const response = await fetch(`${routes.reRunAdfPipeline}?request=${pipelineName}`,{
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            },
            
        });
        const data = await response.json();
        return data;
    } catch(error){
        console.log('Error while rerunning:', error);
        return [];
    }
}