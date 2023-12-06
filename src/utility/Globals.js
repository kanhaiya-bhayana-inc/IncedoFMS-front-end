// ####  Dev-env ####

// const baseURLFileDetails = "https://localhost:7116";
const baseURLAdfPipeline = "https://localhost:7049";


// #### Prod-env ####

const baseURLFileDetails = "https://cloud-fms1.azurewebsites.net";
// const baseURLAdfPipeline = "https://cloud-adf.azurewebsites.net";





// ##################### NOT CHANGE THE BELOW UNTIL END-POINT URL GET CHANGE ###############################


const midURL = "/";

const getADFPipelines = baseURLAdfPipeline + midURL + "api/Pipeline";


const getDelimiter = baseURLFileDetails + midURL + "api/Data/GetDelimiters";
const getVendorDetails = baseURLFileDetails + midURL + "api/Data/GetVendorDetails";
const getFiletypeDetails = baseURLFileDetails + midURL + "api/Data/GetFiletypeDetails";
const getFiledateDetails = baseURLFileDetails + midURL + "api/Data/GetFiledateDetails";
const getAllFilesDetails = baseURLFileDetails + midURL + "api/Data/GetAllFilesDetails";
const getBlobConfigInfo = baseURLFileDetails + midURL + "api/Data/GetBlobConfigInfo";


const uploadFileToAzure = baseURLFileDetails + midURL + "api/file/UploadFile";
const downloadTemplateFile= baseURLFileDetails + midURL + "api/file/DownloadFile";

export const routes = {
    "getADFPipelines": getADFPipelines,
    "getDelimiter": getDelimiter,
    "getVendorDetails": getVendorDetails,
    "getFiletypeDetails": getFiletypeDetails,
    "getFiledateDetails": getFiledateDetails,
    "getAllFilesDetails": getAllFilesDetails,
    "getBlobConfigInfo": getBlobConfigInfo,
    "uploadFileToAzure": uploadFileToAzure,
    "downloadTemplateFile": downloadTemplateFile
}

