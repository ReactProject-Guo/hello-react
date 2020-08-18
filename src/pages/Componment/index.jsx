import React, { Component } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import SecurityValidation from './SecurityValidation';
import Slider from './Slider';
import UserIntl from './UserIntl';
import Magnifier from './Magnifier';

class Index extends Component {
  render() { 
    return (
      <Switch>
        <Route path="/com/security" component={SecurityValidation} />
        <Route path="/com/slider" component={Slider} />  
        <Route path="/com/user-intl" component={UserIntl} />
        <Route path="/com/magnifier" component={Magnifier} />          
        <Redirect to="/com/security" />       
      </Switch>
    );
  }
}
 
export default Index;