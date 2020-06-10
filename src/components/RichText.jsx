import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropType from 'prop-types';
import {UPLOAD_IMG} from './../utils/constants';

class RichText extends Component {
  static propTypes = {
    detail: PropType.string
  }
  constructor(props) {
    super(props);
    /**
     * https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
     */

    let editorState = EditorState.createEmpty(); // 创建一个空的编辑对象
    const { detail } = this.props;
    if (detail) {
      const contentBlock = htmlToDraft(detail); // 主要用于判断html格式是否正确
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(htmlToDraft(detail).contentBlocks);
        editorState = EditorState.createWithContent(contentState);
      }
    }

    this.state = {
      editorState
    }
  }
  // state = {
  //   editorState: EditorState.createEmpty(), // 创建一个空的编辑对象
  // }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  getEditorText = () => {
    /**
     * 返回输入数据对应的HTML格式的文本
     */
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
  }
  /**
   * 图片上传
   */
  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', UPLOAD_IMG);
        // xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const url = response.data.url;
          // resolve(url);
          resolve({data: {link: url}});
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
        // let formData = new FormData();
        // formData.append('image',file);
        // fetch(UPLOAD_IMG,{
        //   methods: 'POST',
        //   body: formData
        // }).then((res)=>{

        // })
      }
    );
  }
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <div>
          <Editor
            editorState={editorState}
            editorStyle={{ border: '1px solid #D9D9D9', minHeight: 400, padding: 5 }}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
            }}
          />
          {/*
            <textarea
              disabled
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
          */}
        </div>
      </div>
    );
  }
}

export default RichText;