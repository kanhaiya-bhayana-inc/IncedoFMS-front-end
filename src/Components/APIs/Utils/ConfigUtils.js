import { routes } from "../../../utility/Globals";

export async function getBlobConfiguration(){
    try{
        const response = await fetch(routes.getBlobConfigInfo,{
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            },
        });
        const data = await response.json();
        return data;
    } catch(error){
        console.log('Error fetching blob configuration data: ', error);
        return [];
    }
}