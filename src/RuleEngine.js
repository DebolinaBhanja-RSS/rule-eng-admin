import React, { useState } from 'react';
import { SelectInput, CreateBase, TextInput, SimpleForm, required, Create, SelectArrayInput, Form, SaveButton, Toolbar, useStore, ReferenceInput } from 'react-admin';
import { Grid, Tabs, Tab } from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import { Box } from '@mui/system';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import "../src/App.css";

const RuleNamespaceList = [
    { id: '1', rulenamespace: 'ROUTING' },
    { id: '2', rulenamespace: 'FLOWSTART' },
];


const RuleCategoryList = [
    { id: '1', categoryname: 'input' },
    { id: '2', categoryname: 'output' },
];

const operationsChoices = [
    { id: '1', operations: 'equals' },
    { id: '2', operations: 'contains' },
];

const ruleValueChoices = [
    { id: '1', ruleValue: 'componentType' },
    { id: '2', ruleValue: 'stateCode' },
    { id: '3', ruleValue: 'messageType' },
];

const ruleValueChoices2 = [
    { id: '1', ruleValue2: 'setActionAdapter' },
    { id: '2', ruleValue2: 'setInitialState' },
    { id: '3', ruleValue2: 'setInitialComponent' },
    { id: '4', ruleValue2: 'setIsoTxnStatusCode' },
    { id: '5', ruleValue2: 'setSystemDescription' },
    { id: '6', ruleValue2: 'setTxnType' },
    { id: '7', ruleValue2: 'setTxnDirection' },
    { id: '8', ruleValue2: 'setCurrentState' },
    { id: '9', ruleValue2: 'setNextState' },
    { id: '10', ruleValue2: 'setNextComponentType' },
    { id: '12', ruleValue2: 'setNextCompDispatchBaseURL' },
    { id: '13', ruleValue2: 'setNextCompDispatchURLSuffix' },
    { id: '14', ruleValue2: 'setReasonCode' },
    { id: '15', ruleValue2: 'setReasonDesc' },
    { id: '16', ruleValue2: 'setNextCompResponseType' },
    { id: '17', ruleValue2: 'setNextCompNewFlowFlag' },
];

const componentChoices = [
    { id: '1', components: 'overlayAPI' },
    { id: '2', components: 'overlayPU' },
    { id: '3', components: 'InsureCloud' },
    { id: '4', components: 'Bank1' },
    { id: '5', components: 'Bank' },
    { id: '6', components: 'NA' }
];
const stateChoices = [
    { id: '1', statecode: 'DISPATCHED' },
    { id: '2', statecode: 'DISPATCHED_CANCEL' },
    { id: '3', statecode: 'DISPATCHED_NO_CANCEL' },
    { id: '4', statecode: 'INITIATED_FROM_BNK' },
    { id: '5', statecode: 'INITIATED_FROM_IC' },
    { id: '6', statecode: 'INVALIDATED' },
    { id: '7', statecode: 'PAY_STATUS_ENQUIRY' },
    { id: '9', statecode: 'RECEIVED_FROM_BANK' },
    { id: '10', statecode: 'TO_DISPATCH' },
    { id: '11', statecode: 'VALIDATE' },
    { id: '12', statecode: 'VALIDATED' },
    { id: '13', statecode: '?' },
    { id: '14', statecode: 'NA' }
];
const messageChoices = [
    { id: '1', message: 'camt.026' },
    { id: '2', message: 'camt.029' },
    { id: '3', message: 'camt.056' },
    { id: '4', message: 'pacs.002' },
    { id: '5', message: 'pain.001' },
];

const ActionChoices = [
    { id: '1', action: 'com.rssoftware.overlay.insure.cloud.action.CreditInitaitaionAction' },
    { id: '2', action: 'com.rssoftware.overlay.insure.cloud.action.PaymentStatusAction' },
    { id: '3', action: 'com.rssoftware.rtp.overlay.modules.kernel.transactionprocessor.action.PaymentStatusSaveAction' },
    { id: '4', action: 'com.rssoftware.overlay.insure.cloud.action.PaymentStatusValidatedAction' },
    { id: '5', action: 'com.rssoftware.overlay.insure.cloud.action.DispatchAction' },
    { id: '6', action: 'com.rssoftware.overlay.insure.cloud.action.MockAction1' },
    { id: '7', action: 'com.rssoftware.rtp.overlay.modules.kernel.transactionprocessor.action.CreditInitSaveAction' },
    { id: '8', action: 'com.rssoftware.overlay.insure.cloud.action.PayStatusEnquiryAction' },
    { id: '9', action: 'com.rssoftware.rtp.overlay.modules.kernel.transactionprocessor.action.PaymentStatusQueryAction' },
    { id: '10', action: 'com.rssoftware.overlay.insure.cloud.action.CancellationAction' },
    { id: '11', action: 'com.rssoftware.rtp.overlay.modules.kernel.transactionprocessor.action.CancellationSaveAction' },
    { id: '12', action: 'com.rssoftware.overlay.insure.cloud.action.CancelValidationAction' },
    { id: '13', action: 'com.rssoftware.rtp.overlay.modules.kernel.transactionprocessor.action.CancellationValidateAction' },
    { id: '14', action: 'com.rssoftware.overlay.insure.cloud.action.ValidationAction' },
    { id: '15', action: 'com.rssoftware.overlay.insure.cloud.action.MockAction2' },
    { id: '16', action: 'com.rssoftware.overlay.insure.cloud.action.CancelResponseAction' },
    { id: '17', action: 'com.rssoftware.rtp.overlay.modules.kernel.transactionprocessor.action.CancelResponseSaveAction' },
    { id: '18', action: 'com.rssoftware.overlay.insure.cloud.action.CancelResponseValidateAction' },
    { id: '19', action: 'com.rssoftware.rtp.overlay.modules.kernel.transactionprocessor.action.CancelResponseUpdateAction' },
    { id: '20', action: 'com.rssoftware.overlay.insure.cloud.action.CancelCloseAction' },
    { id: '21', action: 'com.rssoftware.rtp.overlay.modules.kernel.transactionprocessor.action.CreditInitSaveActionoutput.setIsoTxnStatusCode' },
    { id: '22', action: 'com.rssoftware.overlay.insure.cloud.action.MockActionoutput.setIsoTxnStatusCode' }
];

const isoStateChoices = [
    { id: '1', stateChoices: 'RCVD' },
    { id: '2', stateChoices: 'ACTC' },
    { id: '3', stateChoices: 'RJCT' },
    { id: '4', stateChoices: 'FROM_ELEMENT' },
    { id: '5', stateChoices: 'SENT' },
    { id: '6', stateChoices: '?' },
    { id: '7', stateChoices: 'NA' }
];

const systemDescription = [
    { id: '1', systemDescription: 'NA' },
    { id: '2', systemDescription: 'Other' }
];

const txnType = [
    { id: '1', txnType: 'PAY' },
    { id: '2', txnType: 'PAYMENT_STATUS' },
    { id: '3', txnType: 'PAYMENT_CANCEL' },
    { id: '4', txnType: 'PAYMENT_CANCEL_RESP' },
    { id: '5', txnType: 'NA' }
];

const txnDirection = [
    { id: '1', txnDirection: 'I' },
    { id: '2', txnDirection: 'O' },
    { id: '3', txnDirection: 'NA' },
];

const baseURL = [
    { id: '1', baseURL: 'http://localhost:8082/api/platform/overlay/pu' },
    { id: '2', baseURL: 'http://localhost:8080/overlay-api/outgoing/msg/1' },
    { id: '3', baseURL: 'NA' },
    { id: '4', baseURL: 'Self' }
];

const uRLSuffix = [
    { id: '1', uRLSuffix: '/urn:apiver:1.0/initiatetransfer?apiUnitID=1' },
    { id: '2', uRLSuffix: '/urn:apiver:1.0/savepaymentstatus?apiUnitID=1' },
    { id: '3', uRLSuffix: '/urn:apiver:1.0/statusquery?apiUnitID=1' },
    { id: '4', uRLSuffix: '/urn:apiver:1.0/initiatecancel?apiUnitID=1' },
    { id: '5', uRLSuffix: '/urn:apiver:1.0/savecancelresponse?apiUnitID=1' },
    { id: '6', uRLSuffix: 'NA' }
];

const reasonCode = [
    { id: '1', reasonCode: '0000' },
    { id: '2', reasonCode: '>' },
    { id: '3', reasonCode: '?' }
];

const reasonDesc = [
    { id: '1', reasonDesc: '>' },
    { id: '2', reasonDesc: '?' },
    { id: '3', reasonDesc: 'Other' }
];

const compResponseType = [
    { id: '1', compResponseType: 'com.rssoftware.rtp.overlay.domain.schema.tch.PaymentStatusData' },
    { id: '2', compResponseType: 'com.rssoftware.rtp.overlay.domain.schema.tch.IntermediateStatus' },
    { id: '3', compResponseType: 'com.rssoftware.rtp.overlay.domain.schema.tch.PaymentCancelResponseData' },
    { id: '4', compResponseType: 'com.rssoftware.rtp.overlay.domain.schema.tch.PayloadPaymentCancelResp' },
    { id: '5', compResponseType: 'NA' }
];

const compNewFlowFlag = [
    { id: '1', compNewFlowFlag: 'true' },
    { id: '2', compNewFlowFlag: 'false' }
];

const RuleEngine = () => {

    //Tab
    const [activeTab, setActiveTab] = useState(0);

    //Namespace
    const [selectedNamespace, setSelectedNamespace] = useState('');

    const handleNamespaceChange = (event) => {
        setSelectedNamespace(event.target.value);
    };

    const [outputCategory, setOutputCategory] = useState('');

    const handleOutputCategory = (event) => {
        setOutputCategory(event.target.value);
    };

    const [inputCategory, setInputCategory] = useState([{ Category: '', Operation: '' }]);
    const handleInputCategory = (fieldName, value) => {
        const updatedinputValues = [...inputCategory];
        updatedinputValues[fieldName] = value;
        setInputCategory(updatedinputValues);
    };
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    /////////////////////////////   new  box Add /////////////////////////////
    // const [numFields, setNumFields] = useState(1);
    // const [selectedValues, setSelectedValues] = useState({});
    const [selectedCategory, setSelectedCategory] = useState([{ Type: '', Operation: '', Value: '' }]);
    const [selectedCategory1, setSelectedCategory1] = useState([{ Category: '', Rule: '', ActionAdapter: '', InitialState: '', InitialComponent: '', IsoTxnStatusCode: '', SystemDescription: '', SystemDescriptionOther: '', TxnType: '', TxnDirection: '', CurrentState: '', NextState: '', NextComponentType: '', NextCompDispatchBaseURL: '', NextCompDispatchURLSuffix: '', ReasonCode: '', ReasonDesc: '', ReasonDescOther: '', NextCompResponseType: '', NextCompNewFlowFlag: '' }]);

    const handleButtonClick = () => {
        const newInputValues = [...selectedCategory, { Type: '', Operation: '', Value: '' }];
        setSelectedCategory(newInputValues);
    };

    const handleButtonClick1 = () => {
        const newOutputValues = [...selectedCategory1, { Category: '', Rule: '', ActionAdapter: '', InitialState: '', InitialComponent: '', IsoTxnStatusCode: '', SystemDescription: '', SystemDescriptionOther: '', TxnType: '', TxnDirection: '', CurrentState: '', NextState: '', NextComponentType: '', NextCompDispatchBaseURL: '', NextCompDispatchURLSuffix: '', ReasonCode: '', ReasonDesc: '', ReasonDescOther: '', NextCompResponseType: '', NextCompNewFlowFlag: '' }];
        setSelectedCategory1(newOutputValues);
    };

    const handleSelectCategory = (index, fieldName, value) => {
        const updatedSelectedValues = [...selectedCategory];
        updatedSelectedValues[index][fieldName] = value;
        setSelectedCategory(updatedSelectedValues);
    };

    const handleSelectCategory1 = (index, fieldName, value) => {
        const updatedSelectedValues = [...selectedCategory1];
        updatedSelectedValues[index][fieldName] = value;
        setSelectedCategory(updatedSelectedValues);
    };
    // const handleOperationChange = (index, fieldName, value) => {
    //     const updatedOperationValues = [...inputValues];
    //     updatedOperationValues[index][fieldName] = value;
    //     setSelectedOperation(updatedOperationValues);
    //   };

    // const handleInputChange = (index, fieldName, value) => {
    //     const updatedInputValues = [...inputValues];
    //     updatedInputValues[index][fieldName] = value;
    //     setInputValues(updatedInputValues);
    //   };

    console.log(selectedCategory);

    const handleSaveLocal = localStorage.setItem("SelectedCategory", JSON.stringify(selectedCategory));

    const retrieve = localStorage.getItem("SelectedCategory");
    console.log(retrieve);

    const [textInputValue, SetTextInputValue] = useStore('key_textinput_Value', '');
    const handleConfirm = (formValues) => {
        SetTextInputValue(formValues);
    };

    return (
        <CreateBase>
            <Form>
                <Box>
                    <h4 className="main_divider">Routing Segment</h4>
                    <fieldset className='Routing'>
                        <legend>Routing Selection</legend>
                        <Grid item lg={12}>
                            <ReferenceInput reference='id' source='inputsegment'>
                                <SelectInput
                                    fullWidth
                                    label="Namespace"
                                    source="rulenamespace"
                                    optionText="ruleNamespace"
                                    optionValue="id"
                                    variant="outlined"
                                    style={{ width: '90%', margin: '3%' }}
                                    validate={required()}
                                    onChange={handleNamespaceChange}
                                />
                            </ReferenceInput>
                        </Grid>
                    </fieldset>

                    <Box>
                        <Tabs value={activeTab} onChange={handleTabChange}>
                            <Tab icon={<DashboardIcon />}
                                label="Input Segment" />
                            <Tab icon={<DashboardIcon />}
                                label="Output Segment" />
                        </Tabs>

                        {activeTab === 0 && (
                            <div>
                                <Grid item lg={6}>
                                    <SelectInput
                                        fullWidth
                                        label='Category'
                                        source="category"
                                        choices={RuleCategoryList}
                                        optionText="categoryname"
                                        optionValue="categoryname"
                                        variant="outlined"
                                        style={{ width: '90%', margin: '3%' }}
                                        validate={required()}
                                        onChange={(e) => handleInputCategory('Category', e.target.value)}
                                    />
                                </Grid>
                                <Button onClick={handleButtonClick}
                                    style={{ backgroundColor: '#1dabef', color: 'white', borderRadius: '3px', padding: '5px', marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}> Next Input Set </Button>
                                {selectedCategory.map((input, index) => (
                                    <div key={index}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <fieldset className='Input'>
                                                <legend>Input Set {index + 1}</legend>
                                                <Grid container spacing={2}>
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory[index] === 'inputType' && ( */}
                                                    <Grid item lg={6}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="Input Type"
                                                            source={`ruleValue${index}`}
                                                            choices={ruleValueChoices}
                                                            optionText="ruleValue"
                                                            optionValue="ruleValue"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory(index, 'Type', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    {selectedNamespace === 'ROUTING' && (
                                                        <Grid item lg={6}>
                                                            <SelectInput
                                                                fullWidth
                                                                label="Operation"
                                                                source={`operation${index}`}
                                                                choices={operationsChoices}
                                                                optionText="operations"
                                                                optionValue="operations"
                                                                variant="outlined"
                                                                style={{ width: '90%', margin: '3%' }}
                                                                validate={required()}
                                                                onChange={(e) => handleSelectCategory(index, 'Operation', e.target.value)}
                                                            />
                                                        </Grid>
                                                    )}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="Components"
                                                            source={`components${index}`}
                                                            choices={componentChoices}
                                                            optionText="components"
                                                            optionValue="components"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            // validate={required()}
                                                            onChange={(e) => handleSelectCategory(index, 'Value', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="StateCode"
                                                            source={`stateCode${index}`}
                                                            choices={stateChoices}
                                                            optionText="statecode"
                                                            optionValue="statecode"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            // validate={required()}
                                                            onChange={(e) => handleSelectCategory(index, 'Value', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="Message"
                                                            source={`message${index}`}
                                                            choices={messageChoices}
                                                            optionText="message"
                                                            optionValue="message"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            // validate={required()}
                                                            onChange={(e) => handleSelectCategory(index, 'Value', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                </Grid>
                                            </fieldset>
                                        </Box>
                                    </div>
                                ))}
                            </div >
                        )}

                        {activeTab === 1 && (
                            <div>
                                <Grid item lg={6}>
                                    <SelectInput
                                        fullWidth
                                        label='Category'
                                        source="categoryop"
                                        choices={RuleCategoryList}
                                        optionText="categoryname"
                                        optionValue="categoryname"
                                        variant="outlined"
                                        style={{ width: '90%', margin: '3%' }}
                                        validate={required()}
                                        onChange={handleOutputCategory}
                                    />
                                </Grid>
                                <Button onClick={handleButtonClick1}
                                    style={{ backgroundColor: '#1dabef', color: 'white', borderRadius: '3px', padding: '5px', marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}> Next Output Set </Button>
                                {selectedCategory1.map((input, index) => (
                                    <div key={index}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <fieldset className='Input'>
                                                <legend>Output Set {index + 1}</legend>
                                                <Grid container spacing={2}>
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory[index] === 'inputType' && ( */}
                                                    <Grid item lg={6}>
                                                        <SelectArrayInput
                                                            fullWidth
                                                            label="Output Type"
                                                            source={`rulevalue${index}`}
                                                            choices={ruleValueChoices2}
                                                            optionText="ruleValue2"
                                                            optionValue="ruleValue2"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'Rule', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="setActionAdapter"
                                                            source={`action${index}`}
                                                            choices={ActionChoices}
                                                            optionText="action"
                                                            optionValue="action"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'ActionAdapter', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="setInitialState"
                                                            source={`statecode${index}`}
                                                            choices={stateChoices}
                                                            optionText="statecode"
                                                            optionValue="statecode"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'InitialState', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="setInitialComponent"
                                                            source={`componentini${index}`}
                                                            choices={componentChoices}
                                                            optionText="components"
                                                            optionValue="components"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'InitialComponent', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="IsoTxnStatusCode"
                                                            source={`actioniso${index}`}
                                                            choices={isoStateChoices}
                                                            optionText="stateChoices"
                                                            optionValue="stateChoices"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'IsoTxnStatusCode', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="setSystemDescription"
                                                            source={`actionsys${index}`}
                                                            choices={systemDescription}
                                                            optionText="systemDescription"
                                                            optionValue="systemDescription"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'SystemDescription', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <TextInput
                                                            fullWidth
                                                            label="Set New Description"
                                                            source={`actionnewsys${index}`}
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'SystemDescriptionOther', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="setTxnType"
                                                            source={`actiontxn${index}`}
                                                            choices={txnType}
                                                            optionText="txnType"
                                                            optionValue="txnType"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'TxnType', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="TxnDirection"
                                                            source={`actiontxndir${index}`}
                                                            choices={txnDirection}
                                                            optionText="txnDirection"
                                                            optionValue="txnDirection"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'TxnDirection', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="CurrentState"
                                                            source={`actioncur${index}`}
                                                            choices={stateChoices}
                                                            optionText="statecode"
                                                            optionValue="statecode"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'CurrentState', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="SetNextState"
                                                            source={`actionnxt${index}`}
                                                            choices={stateChoices}
                                                            optionText="statecode"
                                                            optionValue="statecode"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'NextState', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="SetNextComponentType"
                                                            source={`actionnxtComp${index}`}
                                                            choices={componentChoices}
                                                            optionText="components"
                                                            optionValue="components"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'NextComponentType', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="setNextCompDispatchBaseURL"
                                                            source={`actionnxtcompddis${index}`}
                                                            choices={baseURL}
                                                            optionText="baseURL"
                                                            optionValue="baseURL"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'NextCompDispatchBaseURL', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="setNextCompDispatchURLSuffix"
                                                            source={`actionnxtcompddisurl${index}`}
                                                            choices={uRLSuffix}
                                                            optionText="uRLSuffix"
                                                            optionValue="uRLSuffix"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'NextCompDispatchURLSuffix', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="setReasonCode"
                                                            source={`actionreas${index}`}
                                                            choices={reasonCode}
                                                            optionText="reasonCode"
                                                            optionValue="reasonCode"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'ReasonCode', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="setReasonDesc"
                                                            source={`actionreas${index}`}
                                                            choices={reasonDesc}
                                                            optionText="reasonDesc"
                                                            optionValue="reasonDesc"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'ReasonDesc', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <TextInput
                                                            fullWidth
                                                            label="Set New ReasonDesc"
                                                            source={`actionnewreas${index}`}
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'ReasonDescOther', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="setNextCompResponseType"
                                                            source={`actionresp${index}`}
                                                            choices={compResponseType}
                                                            optionText="compResponseType"
                                                            optionValue="compResponseType"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'NextCompResponseType', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                    {/* {selectedNamespace === 'ROUTING' && selectedCategory3 === 'inputType' && selectedValue3 === 'messageType' && ( */}
                                                    <Grid item lg={3}>
                                                        <SelectInput
                                                            fullWidth
                                                            label="NextCompNewFlowFlag"
                                                            source={`actionflow${index}`}
                                                            choices={compNewFlowFlag}
                                                            optionText="compNewFlowFlag"
                                                            optionValue="compNewFlowFlag"
                                                            variant="outlined"
                                                            style={{ width: '90%', margin: '3%' }}
                                                            validate={required()}
                                                            onChange={(e) => handleSelectCategory1(index, 'NextCompNewFlowFlag', e.target.value)}
                                                        />
                                                    </Grid>
                                                    {/* )} */}
                                                </Grid>
                                            </fieldset>
                                        </Box>
                                    </div>
                                ))}
                            </div >
                        )}
                    </Box>
                    <Toolbar>
                        <SaveButton onClick={handleSaveLocal}
                            variant="contained"
                        >Submit</SaveButton>
                    </Toolbar>
                </Box>
            </Form>
        </CreateBase >

    )
};

export default RuleEngine;
