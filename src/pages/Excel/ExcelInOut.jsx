import React, { Component } from 'react';
import { Table ,Card,Button,Input } from 'antd';
import {importsExcel,exportExcel} from './../../utils/excel';
import './../../assets/css/excel.less';
class ExcelOut extends Component {
    state = {
        lists:[{
            username: 'Jacqui',
            age: 32,
            sex: '男',
            phone: '15617990221',
            id: 0,
        },{
            age: 20,
            id: 1,
            phone: 15617990221,
            sex: "女",
            username: "Jack",
        }],
        excelIn_flag: false,
        loading: false,
        excelName: ``, // 当前选中的excel文件
    }
    componentWillMount() {
        this.initForm();
    }
    // 导入
    excelIn = (e) => {
        e.persist(); // 在react中  当 e.target 处于异步操作时， 会报错  主要是因为 setState 并不能保证同步操作，(避免在setState的更新函数中访问event变量)
        let excelName = e.currentTarget.files[0].name;
        importsExcel(e).then((data) => {
         this.setState({loading:true});          
          this.setState({
              lists: data,
              excelIn_flag: true,
              excelName,
          })    
          setInterval(() => {
            this.setState({loading:false});
          },1000)
        },(err) => {
            console.log('导入失败',err);
        })
    }
    // 导出
    downloadExcel = () => {
        let {lists} = this.state;
        // 表头、 数据、 文件名        
        exportExcel(this.columns,lists,"用户信息表.xlsx");
    }
    initForm = () => {
        this.columns = [
            {
                title: '编号',
                dataIndex: 'id',
                key: 'id',
                render: text => <a>{text}</a>,
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
            },
            {
                title: '联系方式',
                dataIndex: 'phone',
                key: 'phone',
            }
        ];
    }
    render() {
        let {lists,excelIn_flag,loading,excelName} = this.state;
        const cardTit = (
            <div>
                <Button type="primary" style={{marginRight: 20}} className="uploadFile">
                    <Input type="file" accept=".xls,.xlsx" onChange={(e) => this.excelIn(e) }  /> 
                    {excelIn_flag ? `${excelName}文件导入成功！` : '请选择要导入的Excel文件'}
                </Button>
                <Button type="primary" onClick={() => this.downloadExcel()}>导出Excel</Button>
            </div>
        )
        return (
            <Card type="inner" className="product-index" title={cardTit}>
                <Table 
                    columns={this.columns} 
                    dataSource={lists} 
                    rowKey="id"
                    loading={loading} 
                />
            </Card>
           
        );
    }
}

export default ExcelOut;