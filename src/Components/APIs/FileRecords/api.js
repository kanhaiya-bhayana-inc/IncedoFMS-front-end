
export async function fetchAllFileRecords(){
    try{
        const response = await fetch('https://localhost:7116/api/Data/GetAllFilesDetails',{
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
export async function insertFileRecord(formData){
    try{
        const response = await fetch('https://cloud-fms.azurewebsites.net/api/file/UploadFile',{
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            },
            body: formData,
        });
        const data = await response.json();
        return data;
    } catch(error){
        console.log('Error while uploading:', error);
        return [];
    }
}

// const handleSubmit = (event) => {
//     event.preventDefault();
//     // const tempName = vendorData.get()
//     var vID = vendorData.find(item => item.name === vendorName);
//     formData.set('sourcepath', sourcepath);
//     formData.set('destinationpath', destinationpath);
//     formData.set('filename', fileName);
//     formData.set('vendorname', vID.id);
//     formData.set('fixedlength', FixedLength);
//     formData.set('isactive', IsActive);
//     let email = formData.get('emailid');
//     setLoading(true);

//     if (!validateEmail(email)) {
//         setLoading(false);
//         openNotificationWithIcon('error', 'try agian', 'Please enter a valid email.')
//     }
//     else {
//         // console.log("come here");
//         // console.log([...formData.entries()]);
//         fetch('https://localhost:7116/api/file/UploadFile', {
//             method: 'POST',
//             headers: {
//                 // "Content-Type": "multipart/form-data",
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
//             },
//             body: formData,

//         })
//             .then((response) => {
//                 if (response.ok) {
//                     // File uploaded successfully
//                     return response.json(); // Parse the response body as JSON
//                 } else {

//                     throw new Error('Error uploading file');
//                 }
//             })
//             .then((data) => {
//                 // setFormData(new FormData());
//                 // Access the response data
//                 if (data.error == false) {
//                     setLoading(false);
//                     // console.log('File uploaded successfully');
//                     openNotificationWithIcon('success', 'File uploaded successfully', data.status)
//                 }
//                 else {
//                     setLoading(false);
//                     openNotificationWithIcon('error', 'Error uploading file', data.status)
//                     // console.log('Error occured.');
//                 }
//             })
//             .catch((error) => {
//                 sourcepath = "";
//                 destinationpath = "";
//                 setFileName("");
//                 setVendorName("");
//                 setFixedLength(false);
//                 // setIsActive(false);
//                 // console.log([...formData.entries()]);
//                 // console.log("null ho gyi");
//                 if (error == "TypeError: Failed to fetch") {
//                     setLoading(false);
//                     openNotificationWithIcon('error', 'Server error', 'Server is not running up.')
//                 } else {
//                     setLoading(false);
//                     openNotificationWithIcon('error', 'Error uploading file', error.message.toString())
//                     console.error('Error uploading file jjj:', error.message.toString());
//                 }
//             });
//     };

// }