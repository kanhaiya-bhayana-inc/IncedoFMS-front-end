import React, { useState, useEffect } from 'react';
import styles from './Form.module.css'
import { Button, notification, Space } from 'antd';
import { isEmail } from 'validator';
import loadingImage from '../../images/loading.gif';
// import downloadTemplateFile from '../../files/template_file.csv'
import downloadFixedLengthTemplateFile from '../../files/fixed_length_template_file.csv'

import { pathConfiguration, infoDescriptions } from '../../utility/StaticDetails';
import ProgressPage from './ProgressPage';
import Select from "react-select";
import {
    fetchDelimiterOptions,
    fetchFiledateOptions,
    fetchFiletypeOptions,
    fetchVendorOptions
} from '../APIs/DropdownOptions/api';

import { getBlobConfiguration } from '../APIs/Utils/ConfigUtils';
import { downloadTemplateFile } from '../APIs/Utils/Template';

import {
    fetchAllFileRecords,
    insertFileRecord
} from '../APIs/FileRecords/api';

import { mapData, vendorDataFilter } from '../../mapper/dataMapper';
import { validateEmail } from './formValidation';
import EditInfoIcon from '../InfoIconTooltip/EditInfoIcon';






export default function Form() {
    const formInitialState = {
        fileMasterId: '',
        fileName: '',
        fileDate: '',
        vendorName: '',
        sourcePath: '',
        destinationPath: '',
        fileTypeID: '',
        dbNotebook: '',
        insertionMode: '',
        delimiter: '',
        fixedLength: false,
        templateFile: null,
        isActive: true,
        sampleFile: null,
        emailID: '',
    };

    const [formInputData, setFormInputData] = useState(formInitialState);

    // const [vendorName, setVendorName] = useState("");
    const [FixedLength, setFixedLength] = useState(false);

    const [formData, setFormData] = useState(new FormData());
    let sourcepath = pathConfiguration.sourcepathprefix + `${formInputData.vendorName}/${formInputData.fileName}` + pathConfiguration.sourcepathsufix;
    let destinationpath = pathConfiguration.destinationpathprefix + `${formInputData.vendorName}/${formInputData.fileName}`;


    // Local Arrays for storing the data of form dropdowns and files...
    const [delimiterData, setDelimiterData] = useState([]);
    const [vendorData, setVendorData] = useState([]);
    const [filedateData, setfiledateData] = useState([]);
    const [filetypeData, setfiletypeData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [records, setRecords] = useState([]);


    const [api, contextHolder] = notification.useNotification();
    const [BlobAccountName, setBlobAccountname] = useState(null);
    const [ServerName, setServerName] = useState(null);
    const [ShowAccount, setShwoAccount] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isDisplayed, setIsDisplayed] = useState(false);

    const toggleDisplay = () => {
        setIsDisplayed(!isDisplayed);
    };

    // Setting all the properties of the file...
    const handleChangeTest = (event) => {
        const { name, value } = event.target;
        setFormInputData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        // edge case if vendor name changes then you need to again select the file for the new vendor...
        if (name == "vendorName") {
            setSelected(null);
            // if (editMode){
            //     setFormInputData(formInitialState);
            // }
        }
    };

    const handleDownlaodClick = async ()=>{
        const fileUrl = await downloadTemplateFile(formInputData.fixedLength);
        if (fileUrl){
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = 'template.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        else{
            openNotificationWithIcon('error', 'Unable to download the template file', 'Try later, or contant admin for further information...');
        }
    }


    // Setting the file values...
    const handleFileChangeTest = (event) => {
        const file = event.target.files[0];
        const { name } = event.target;
        setFormInputData((prevFormData) => ({
            ...prevFormData,
            [name]: file,
        }));
    };

    //   Setting the checkbox values...
    const handleCheckboxChangeTest = (event) => {
        const { name, checked } = event.target;
        setFormInputData((prevFormInputData) => ({
            ...prevFormInputData,
            [name]: checked,
        }));
    };

    //   Sumbitting the form and making the fetch Post call...
    const handleSubmitTest = (e) => {
        e.preventDefault();
        formInputData.sourcePath = sourcepath;
        formInputData.destinationPath = destinationpath;
        var vID = vendorData.find(item => item.name === formInputData.vendorName);
        const formDataTest = new FormData();

        // Iterate through the formInputData object and append all fields to formData
        for (const [key, value] of Object.entries(formInputData)) {
            formDataTest.append(key, value);
            // console.log(key, " -" , value);
        }
        // edge case for mapping vendorName to clientId for making the fetch call...
        if (isNaN(formDataTest.get('vendorName'))) {
            formDataTest.set('vendorName', vID.id);
        }
        // for (const [key, value] of formDataTest) {
        //     console.log(key, value);
        //   }

        // if (selected)

        let email = formDataTest.get('emailID');
        setLoading(true);

        if (editMode && (selected == null)) {
            openNotificationWithIcon('error', 'information can not be updated', 'It seems that you have not selected any file, Please select a file to update information...');
        }

        if (!validateEmail(email)) {
            setLoading(false);
            openNotificationWithIcon('error', 'try agian', 'Please enter a valid email.')
        }
        else {
            console.log('jjjj');
            const res = insertFileRecord(formDataTest);
            res.then((data) => {
                if (data.error == false) {
                    setLoading(false);

                    openNotificationWithIcon('success', `File ${editMode ? 'updated': 'uploaded'} successfully`, `Your file has been  ${editMode ? 'updated': 'uploaded'} successfully`);
                    setFormInputData(formInitialState);
                    setEditMode(false);
                    setSelected(null);
                    // setFormInputData(data.data);
                    // console.log(data.data);
                }
                else {
                    setLoading(false);
                    openNotificationWithIcon('error', `Error ${editMode ? 'updated': 'uploaded'} file`, data.status)
                }
            }).catch((error) => {
                console.log('error: ', error);
            })
        };

    }


    // Select the file from the search bar...
    const handleChangeSelectFile = (selectedOption) => {
        setSelected(selectedOption);

    };
    const showAccountName = (input) => {
        if (input === "show") {

            // setShwoAccount(true);
        }

    }





    // --- Style for Slect list display---
    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelected ? "" : "",
            backgroundColor: state.isSelected ? "" : "",
            textAlign: "left"
        }),
        control: (defaultStyles) => ({
            ...defaultStyles,
            width: "408px",
            textAlign: "left"
        }),
        singleValue: (defaultStyles) => ({ ...defaultStyles, color: "" }),
    };

    // --- Display the success and error notification --- 
    const openNotificationWithIcon = (type, msg, des) => {
        api[type]({
            message: msg,
            description: des
        });
    };




    // for file selection and set the properties of that file...
    useEffect(() => {
        if (selected) {
            console.log('Not');
            let id = selected.value;
            let row = records.find((item) => item.fileMasterId === id);
            if (row.fixedLength === "false") {
                row.fixedLength = false;
            }
            if (row.isActive === "false") {
                row.isActive = false;
            }
            if (row.fixedLength === "true") {
                row.fixedLength = true;
            }
            if (row.isActive === "true") {
                row.isActive = true;
            }
            // reverse mapping of clientID --> Vendor Name
            var vID = vendorData.find(item => item.id == row.clientID);
            row.vendorName = vID.name;
            console.log('vid: ', vID);
            console.log('Selected row: ', row);
            setFormInputData(row);
            console.log('my data:', formInputData);


        }
    }, [selected])

    // for fetching all the dropdown data and file records...
    useEffect(() => {
        fetchDelimiterOptions()
            .then((data) => setDelimiterData(data))
            .catch((error) => console.error('error setting dropdown options:', error));

        fetchFiledateOptions()
            .then((data) => setfiledateData(data))
            .catch((error) => console.error('error setting dropdown options:', error));

        fetchVendorOptions()
            .then((data) => setVendorData(data))
            .catch((error) => console.error('error setting dropdown options:', error));

        fetchFiletypeOptions()
            .then((data) => setfiletypeData(data))
            .catch((error) => console.error('error setting dropdown options:', error));

        fetchAllFileRecords()
            .then((data) => setRecords(data))
            .catch((error) => console.error('error setting dropdown options:', error));

        getBlobConfiguration()
            .then((data) => { setBlobAccountname(data.accountName); setServerName(data.serverName) })
            .catch((error) => console.error('error setting BlobAcountName: ', error));




    }, [editMode])

    // changing the list of file-select on the basis of vendor name...
    var vendorFiles = [];
    if (formInputData.vendorName) {
        // mapping of Vendor Name --> ClientID...
        var vID = vendorData.find(item => item.name === formInputData.vendorName);
        vendorFiles = vendorDataFilter(records, vID.id);
    }




    const fileNamesAndIds = mapData(records);

    const VendorFileNamesAndIds = mapData(vendorFiles);


    return (
        <div>
            <span className={'p-4 ' + styles.blobAccountSpan}><label className={styles.labelDark2}>Backend details:</label> <button data-bs-toggle="tooltip" data-bs-placement="bottom" title="Azure Blob AccountName..." className={styles.blobAccountStyle} onClick={toggleDisplay}>
                {isDisplayed ? <>
                    <i class="bi bi-eye"></i>
                </> : <><i class="bi bi-eye-slash"></i></>}
            </button>
                {isDisplayed && <ul type='none'><li><label className={styles.labelDark2}>Blob:</label> {BlobAccountName}</li><li><label className={styles.labelDark2}>Db:</label> {ServerName}</li></ul>}
               
            </span>

            <div className={styles.editContainer}>
                <div>
                    <button className={"btn" + " " + styles.buttonBgColor} onClick={() => { setEditMode(true); setFormInputData(formInitialState); }} data-bs-toggle="tooltip" data-bs-placement="bottom" title={infoDescriptions.editinfodescription}>Edit &nbsp;<i className="bi bi-pencil"></i></button>&nbsp; <EditInfoIcon description={infoDescriptions.editinfodescription} />
                    <br />{editMode ? <button className={"btn" + " " + styles.cancelBtn} onClick={() => { setEditMode(false); setFormInputData(formInitialState); }} data-bs-toggle="tooltip" data-bs-placement="bottom">Cancel</button> : ""}
                </div>
                <div>
                </div>

                {/* <EditInfoIcon description={infoDescriptions.editinfodescription} /> */}
            </div>
            <div className='container'>
                {contextHolder}
                {
                    loading ? <ProgressPage /> : <>
                        <form>

                            <div className='row p-2' style={{ position: 'relative' }}>
                                <div className='col-4 p-4'>
                                    <div className={"form-group" + " " + styles.colDisplay}>
                                        <label htmlFor="exampleInputFileName" className={"p-2" + " " + styles.labelDark}>Filename</label>
                                        {!editMode ?
                                            <>
                                                <input type="text" required onChange={handleChangeTest} value={formInputData.fileName} name='fileName' className="form-control" id="exampleInputFileName" placeholder="Enter file name..." />
                                            </>
                                            :
                                            <>
                                                <div className="m-auto">
                                                    <Select options={formInputData.vendorName ? VendorFileNamesAndIds : fileNamesAndIds} value={selected} components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }} onChange={handleChangeSelectFile} autoFocus={true} styles={customStyles} />
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>

                                <div className='col-4 p-4'>
                                    <div className={"form-group" + " " + styles.colDisplay}>

                                        <label className={"p-2" + " " + styles.labelDark}>FileDate</label>
                                        <br />
                                        <select required onChange={handleChangeTest} value={formInputData.fileDate} name="fileDate" className={"custom-select form-control btn" + " " + styles.dropdownInput} >
                                            <option defaultValue>Select</option>

                                            {filedateData.map((data, i) => {
                                                return (
                                                    <option key={i} value={data.id}>{data.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className='col-4 p-4' >
                                    <div className={"form-group" + " " + styles.colDisplay}>

                                        <label className={"p-2" + " " + styles.labelDark}>Vendor Name</label>
                                        <br />
                                        <select required onChange={handleChangeTest} value={formInputData.vendorName} name="vendorName" className={"custom-select form-control btn" + " " + styles.dropdownInput} >
                                            <option defaultValue value="">Select</option>

                                            {vendorData.map((data, i) => {
                                                return (
                                                    <option key={i} value={data.name}>{data.name}</option>
                                                )
                                            })}
                                        </select>


                                    </div>
                                </div>
                                <div className={'col-4 p-4'}>
                                    <div className={"form-group" + " " + styles.colDisplay} >
                                        <label className={"p-2" + " " + styles.labelDark}>Source Path</label>
                                        <input type="text" readOnly value={sourcepath} className={styles.disableInput + " " + "form-control"} id="exampleInputSourcePath" placeholder="Enter source path..." />

                                    </div>

                                </div>
                                <div className={'col-4 p-4'}>
                                    <div className={"form-group" + " " + styles.colDisplay}>
                                        <label className={"p-2" + " " + styles.labelDark}>Destination Path</label>
                                        <input type="text" readOnly value={destinationpath} className={styles.disableInput + " " + "form-control"} id="exampleInputDestinationPath" placeholder="Enter destination path..." />
                                    </div>
                                </div>
                                <div className='col-4 p-4'>
                                    <div className={"form-group" + " " + styles.colDisplay}>
                                        <label className={"p-2" + " " + styles.labelDark}>Allowed File</label>
                                        <br />
                                        <select required value={formInputData.fileTypeID} onChange={handleChangeTest} name="fileTypeID" className={"custom-select form-control btn" + " " + styles.dropdownInput} >
                                            <option defaultValue>Select</option>

                                            {filetypeData.map((data, i) => {
                                                return (
                                                    <option key={i} value={data.id}>{data.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className='row p-2'>
                                <div className='col-4 p-4'>
                                    <div className={"form-group" + " " + styles.colDisplay}>
                                        <label htmlFor="exampleInputDbnotebook" className={"p-2" + " " + styles.labelDark}>DBNotebook</label>
                                        <input type="text" value={formInputData.dbNotebook} onChange={handleChangeTest} name='dbNotebook' className="form-control" id="exampleInputDbnotebook" placeholder="Enter dbnotebook name..." />
                                    </div>
                                </div>



                                <div className='col-4 p-4'>
                                    <div className={"form-group" + " " + styles.colDisplay}>
                                        <label className={"p-2" + " " + styles.labelDark}>Insertion Mode</label>
                                        {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                                        <br />
                                        <select onChange={handleChangeTest} value={formInputData.insertionMode} name="insertionMode" className={"custom-select form-control btn" + " " + styles.dropdownInput} >
                                            <option defaultValue>Select</option>
                                            <option value="Append">Append</option>
                                            <option value="Overwrite">Overwrite</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-4 p-4'  >
                                    <div className={"form-group" + " " + styles.colDisplay}>
                                        <label className={"p-2" + " " + styles.labelDark}>Delimiter</label>
                                        <br />
                                        <select onChange={handleChangeTest} value={formInputData.delimiter} name="delimiter" className={"custom-select form-control btn" + " " + styles.dropdownInput} >
                                            <option defaultValue>Select</option>

                                            {delimiterData.map((data, i) => {
                                                return (
                                                    <option key={i} value={data.id}>{data.name} {data.description}</option>
                                                );
                                            })
                                            }
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <hr />
                            <div className='row p-2'>
                                <div className={'col-4 p-4'}>
                                    <div className={"form-group" + " " + styles.colDisplay}>
                                        <label className={"p-2 form-check-label" + " " + styles.labelDark} htmlFor="flexCheckDefault">
                                            FixedLength
                                        </label>

                                        <input onChange={handleCheckboxChangeTest} checked={formInputData.fixedLength} name="fixedLength" className={styles.checkBox + " " + styles.checkboxiconFixedlength} type="checkbox" />
                                    </div>
                                </div>
                                <div className={'col-4 p-4'}>
                                    <div className={"form-group" + " " + styles.colDisplay}>
                                        <label className={"p-2" + " " + styles.labelDark}>Download template file</label><br /><a className={styles.downloadFileIcon + " " + styles.checkboxiconDownload} onClick={handleDownlaodClick} target='_blank' rel='noreferrer'><i className="bi bi-cloud-arrow-down-fill"></i></a>
                                    </div>

                                </div>
                                <div className={'col-4 p-4'}>
                                    <div className={"form-group" + " " + styles.colDisplay}>

                                        <label htmlFor="exampleInputTemplateFile" className={"p-2" + " " + styles.labelDark}>Template File</label>
                                        <input onChange={handleFileChangeTest} type="file" name='templateFile' className={"form-control" + " " + styles.selectFileInput} id="exampleInputTemplateDownload" />
                                    </div>
                                </div>


                            </div>
                            <hr />
                            <div className='row p-2'>

                                <div className={'col-4 p-4'}>
                                    <div className={"form-group" + " " + styles.colDisplay}>
                                        <label className={"p-2 form-check-label" + " " + styles.labelDark} htmlFor="flexCheckDefault">
                                            Is Active
                                        </label>
                                        <input onChange={handleCheckboxChangeTest} disabled={!editMode} checked={formInputData.isActive} name="isActive" className={styles.checkBox + " " + styles.checkboxiconIsactive} type="checkbox" />
                                    </div>

                                </div>
                                <div className={'col-4 p-4'}>
                                    <div className={"form-group" + " " + styles.colDisplay}>
                                        <label htmlFor="exampleInputTemplateUpload" className={"p-2" + " " + styles.labelDark}>Sample File</label>
                                        <input onChange={handleFileChangeTest} name='sampleFile' type="file" className={"form-control" + " " + styles.selectFileInput} id="exampleInputTemplateUpload" />
                                    </div>
                                </div>


                                <div className='col-4 p-4'>
                                    <div className={"form-group" + " " + styles.colDisplay}>
                                        <label htmlFor="exampleInputEmail" className={"p-2" + " " + styles.labelDark}>Email</label>
                                        <input onChange={handleChangeTest} value={formInputData.emailID} type="email" name='emailID' className="form-control" id="exampleInputEmail" placeholder="Enter email..." />
                                    </div>

                                </div>
                            </div>
                            <hr />
                            <div className='row p-2'>
                                <div className='col-4 p-2'>

                                </div>
                                <div className='col-4 p-2'>
                                    <button className={"btn" + " " + styles.buttonBgColor} onClick={handleSubmitTest}> {!editMode ? (loading ? "Submitting..." : "Submit") : "Update"}</button>
                                    &nbsp;&nbsp;
                                    {/* {editMode ?"": <button  onClick={setFormInputData(formInitialState)} className={"btn" + " " + styles.buttonBgColor} >Reset</button>} */}
                                    {!editMode ? <button className={"btn" + " " + styles.buttonBgColor} onClick={() => { setFormInputData(formInitialState); }} data-bs-toggle="tooltip" data-bs-placement="bottom">Reset</button> : ""}
                                </div>
                                <div className='col-4 p-2'>

                                </div>
                            </div>
                            {/* <button onClick={handleDownlaodClick}>Downlaod CSV</button> */}
                        </form>
                    </>
                }

            </div>
        </div>
    )
}