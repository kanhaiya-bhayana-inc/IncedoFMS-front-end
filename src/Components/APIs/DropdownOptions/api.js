// import { openNotificationWithIcon } from "../../Notifications/NotificationAlerts";
// import {notification} from'antd';

export async function fetchDelimiterOptions(){
    try{
        const response = await fetch('https://cloud-fms.azurewebsites.net/api/Data/GetDelimiters',{
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
        const response = await fetch('https://cloud-fms.azurewebsites.net/api/Data/GetVendorDetails',{
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
        const response = await fetch('https://cloud-fms.azurewebsites.net/api/Data/GetFiletypeDetails',{
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
export async function fetchFiledateOptions(){
    try{
        const response = await fetch('https://cloud-fms.azurewebsites.net/api/Data/GetFiledateDetails',{
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