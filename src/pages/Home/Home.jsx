import React, { Component } from 'react';
class Home extends Component {

  render() { 
    
    return (
      <div className="main-container">
        首页
        {React.$intl.get('hello')}
      </div>
    );
  }
}
 
export default Home;