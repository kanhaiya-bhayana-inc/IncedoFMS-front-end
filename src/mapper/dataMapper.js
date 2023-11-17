
// mapping the data from file records to the select list file data...
export function mapData(obj){
    return obj.map((file) => ({
        value: file.fileMasterId,
        label: file.fileName,
    }));
}

// filtering the data by the selected vendor...
export function vendorDataFilter(obj,id){
    return obj.filter((data)=> data.clientID === id.toString());
}


