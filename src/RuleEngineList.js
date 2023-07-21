import { Datagrid, EditButton, List, ListBase, TextField, useRemoveFromStore, TopToolbar, Create, Button, CreateButton } from "react-admin";
const RuleEngineList = (props) => {
    const clearTextInputFields = localStorage.removeItem("SelectCategory");
    const ListToolbar = () => (
        <TopToolbar>
            <CreateButton 
            onClick={clearTextInputFields}
            />
        </TopToolbar>
    )
    return (
        <ListBase {...props}>
            <ListToolbar/>
            <Datagrid>
                <TextField source="id" />
                <TextField source="rulenamespace" />
                <EditButton />
            </Datagrid>
        </ListBase>
    );
};

export default RuleEngineList;