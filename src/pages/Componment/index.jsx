import React, { Component } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import SecurityValidation from './SecurityValidation';
import Slider from './Slider';
import UploadImg from './UploadImg';
import Magnifier from './Magnifier';

class Index extends Component {
  render() { 
    return (
      <Switch>
        <Route path="/com/security" component={SecurityValidation} />
        <Route path="/com/slider" component={Slider} />  
        <Route path="/com/upload-img" component={UploadImg} />
        <Route path="/com/magnifier" component={Magnifier} />          
        <Redirect to="/com/security" />       
      </Switch>
    );
  }
}
 
export default Index;