import React, { Component } from 'react';
import { Card, Button,Spin } from 'antd';
import ReactEcharts from 'echarts-for-react';

class Bar extends Component {
  state = {
    sales: [1000, 520, 200, 334, 390, 330, 220],
    store: [100, 50, 10, 34, 30, 39, 22],
    loading: false
  }
  chartOption = (sales,store) => {
    let option = {
      title:{
        show: true,
        text:'销售曲线图'
      },
      color: ['#2DAC91','#f00','#E8F7F6','#E6F2FD','#F1EAFF'], //填充色
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        show: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          axisTick: {
            alignWithLabel: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          boundaryGap: ['0%', '20%']
        }
      ],
      series: [
        {
          name: '销量',
          type: 'bar',
          barWidth: '35%',
          data: sales
        },
        {
          name: '库存',
          type: 'bar',
          barWidth: '35%',
          data: store
        }
      ]
    }
    return option;
  }
  update = ()=> {
    this.setState({loading: true})
    this.setState(state => ({
      sales: state.sales.map(i => i + 1),
      store: state.store.reduce((pre,i) => {
        pre.push(i - 1);
        return pre;
      },[])
    }),() => {
      setInterval(() => {
        this.setState({loading:false})        
      },500)
    })
  }
  render() {
    const {sales,store,loading} = this.state;    
    const cardTit = (
      <div>
        <Button type="primary" style={{ marginRight: 10 }} onClick={() => {this.update()}}>更新</Button>
      </div>
    )
    return (
      <Spin spinning = {loading} tip="更新中...." >
        <Card type="inner" className="product-index" title={cardTit}>
          <ReactEcharts option={this.chartOption(sales,store)} style={{height:'490px'}}  />
        </Card>
      </Spin>
    );
  }
}

export default Bar;