import React, { Component } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import ExcelIn from './ExcelIn';
import ExcelOut from './ExcelOut';
import ExcelMulit from './ExcelMulit'
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Switch>
        <Route path="/excel/in" component={ExcelIn} />
        <Route path="/excel/out" component={ExcelOut} />  
        <Route path="/excel/mulitout" component={ExcelMulit} /> 
        <Redirect to="/excel/in" />       
      </Switch>
    );
  }
}
 
export default Index;