import React from 'react';
import { Admin, Resource } from 'react-admin';
import { dataProvider } from './DataProvider';
import RuleEngineList from './RuleEngineList';
import RuleEngine from './RuleEngine';

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="rulenamespace"
        create={RuleEngine}
        list={RuleEngineList}
      />
    </Admin>
  );
};

export default App;
