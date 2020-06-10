import React from 'react';
import PropType from 'prop-types';
import { Upload, Icon, Modal,message } from 'antd';
import {reqDeleteImg} from './../api';
import {BASE_IMG_URL,UPLOAD_IMG} from './../utils/constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class UploadImg extends React.Component {
  static propTypes = {
    imgs: PropType.array
  }
  constructor(props) {
    super(props);
    
    /**
     * 下面的这些操作是为了给fileList设置默认值
     */
    let fileList = [];
    const {imgs} = this.props;
    if(imgs && imgs.length > 0) {
      fileList = imgs.map((img,index) => (
        {
          uid: -index, // 防止和数据库中的id冲突
          name: img,
          status:'done',
          url: `${BASE_IMG_URL}${img}`
        }
      ))
    }
    this.state = {
      previewVisible: false, // 标识是否显示大图预览
      previewImage: '', // 大图的地址 url
      fileList
    }
  }
  // state = {
  //   previewVisible: false, // 标识是否显示大图预览
  //   previewImage: '', // 大图的地址 url
  //   fileList: [
  //     /**{
  //       uid: '-1',
  //       name: 'image.png',
  //       status: 'done', // 状态有：uploading：正在上传中， done：上传已完成， error removed：已删除
  //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     }*/
  //   ],
  // };

  /**
   * 关闭 modal
   */
  handleCancel = () => this.setState({ previewVisible: false });

  /**
   * 显示指定大图
   */
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview, // preview 缓存图片的base64,既是没有上传图片成功，图片也能显示
      previewVisible: true,
    });
  };

  /**
   * file:指当前上传的图片对象
   * fileList: 指所有已经上传成功的图片对象的数组
   */
  handleChange = async ({ file,fileList }) => {
    if(file.status === 'done') { // 图片上传成功 file返回的name和url不正确
      const res = file.response;
      if(res.status === 0) {
        message.success('上传图片成功');
        const {name,url} = res;
        
        /**
         * 注意file 和 fileList[fileList.length-1] 对应的数据相同，但是二者都是引用数据类型，改变file，但是
         * fileList[fileList.length-1]中的数据却无法改变
         */
        file = fileList[fileList.length-1];
        file.name = name;
        file.url = url;
        
      } else {
        message.error('上传图片失败');
      }
    } else if(file.status === 'removed') { // 图片已被删除
      const res = await reqDeleteImg(file.name ? file.name : file.response.data.name);
      console.log('删除图片',file);
      if(res.status === 0) {
        message.success('图片删除成功')
      }
    }
    this.setState({ fileList })
  };
  /**
   * 获取所有已上传文件图片名的数组
   */
  getImgs = ()=> {
    console.log('子组件')
    return this.state.fileList.map(file => file.name);
  }
  render() {
    const { previewVisible, previewImage,fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={UPLOAD_IMG} /* https://www.mocky.io/v2/5cc8019d300000980a055e76 上传图片的接口地址 */
          accept="image/*" /**只接受图片格式 */
          listType="picture-card"
          name="image" /**请求参数名 */
          fileList={fileList} /*所有已上传图片文件对象的数组 */
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
