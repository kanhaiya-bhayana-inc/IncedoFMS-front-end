// import { openNotificationWithIcon } from "../../Notifications/NotificationAlerts";
// import {notification} from'antd';

import { routes } from "../../../utility/Globals";


export async function fetchDelimiterOptions(){
    try{
        const response = await fetch(routes.getDelimiter,{
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            },
        });
        const data = await response.json();
        return data;
    } catch(error){
        console.log('Error fetching delimiter dropdown options:', error);
        return [];
    }
}
export async function fetchVendorOptions(){
    try{
        const response = await fetch(routes.getVendorDetails,{
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            },
        });
        const data = await response.json();
        return data;
    } catch(error){
        console.log('Error fetching vendor dropdown options:', error);
        return [];
    }
}
export async function fetchFiletypeOptions(){
    try{
        const response = await fetch(routes.getFiletypeDetails,{
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            },
        });
        const data = await response.json();
        return data;
    } catch(error){
        console.log('Error fetching fileType dropdown options:', error);
        return [];
    }
}
export async function fetchFiledateOptions(){
    try{
        const response = await fetch(routes.getFiledateDetails,{
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            },
        });
        const data = await response.json();
        return data;
    } catch(error){
        console.log('Error fetching fileDate dropdown options:', error);
        return [];
    }
}