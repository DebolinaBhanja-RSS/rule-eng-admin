import React from 'react';
import { Admin, Resource } from 'react-admin';
import RuleEngineList from './RuleEngineList';
import RuleEngine from './RuleEngine';
import { mainDataProvider } from './DataProvider/MainDataProvider';

const App = () => {
  return (
    <Admin dataProvider={mainDataProvider}>
      <Resource name="rule" create={RuleEngine} list={RuleEngineList} />
    </Admin>
  );
};

export default App;
