import React, { Component } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import ExcelInOut from './ExcelInOut';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Switch>
        <Route path="/excel/inOrOut" component={ExcelInOut} />  
        <Redirect to="/excel/inOrOut" />       
      </Switch>
    );
  }
}
 
export default Index;