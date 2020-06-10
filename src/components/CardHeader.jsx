import React from 'react';
import { Icon } from 'antd';

export function cardTit(props) {
  let titCon = (
    <div>
      <Icon 
        type={props.iconType ? props.iconType : 'arrow-left'} 
        className="arrow" 
        onClick={() =>this.props.history.goBack()} 
      />
        {props.tit}
    </div>
  ) 
  return titCon;
}