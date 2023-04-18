import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './SpecialtyManage.scss'
import { FormattedMessage, defineMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { handleCreateSpecialty } from '../../../services/userService'
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class SpecialtyManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descriptionHTML: '',
            descriptionMarkdown: '',
            name: '',
            imageBase64: '',
            isUpdate: false
        }
    }

    async componentDidMount() {

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleOnchangeInput = (event, id) => {
        let stateCopy = this.state;
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeImage = async (event) => {
        let files = event.target.files; // FileList object
        let imgBase64 = '';
        let f = files[0];
        if (f) {
            imgBase64 = await CommonUtils.toBase64(f);
            this.setState({
                imageBase64: imgBase64
            })
        }
    }

    handleSaveData = async () => {
        let { name, imageBase64, descriptionHTML, descriptionMarkdown } = this.state
        let res = await handleCreateSpecialty({
            name: name,
            image: imageBase64,
            descriptionHTML: descriptionHTML,
            descriptionMarkdown: descriptionMarkdown
        })

        if (res && res.errCode === 0) {
            toast.success('Create specialty success')
        } else {
            toast.success('Create specialty failed')

        }
    }


    render() {
        return (
            <div className='doctor-manage-container'>
                <div className='title my-3'>
                    <FormattedMessage id='manage-specialty.title' />
                </div>
                <div className='row mx-3 my-3'>
                    <div className='col-6 form-group'>
                        <label>
                            <FormattedMessage id='manage-specialty.name-specialty' />
                        </label>
                        <input type='text' className='form-control'
                            onChange={(event) => { this.handleOnchangeInput(event, 'name') }}
                            value={this.state.name} />
                    </div>
                    <div className='col-6 form-group'>
                        <label>
                            <FormattedMessage id='manage-specialty.image' />


                        </label>
                        <input type='file' className='form-control'
                            onChange={(event) => { this.handleOnchangeImage(event) }}
                        />
                    </div>
                </div>
                <div className='editor mx-3'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown} />
                </div>

                <div>
                    <button className={this.state.isUpdate ? 'btn btn-warning mx-3 my-3 px-3' : 'btn btn-primary mx-3 my-3 px-3'}
                        onClick={() => { this.handleSaveData() }}
                    >{this.state.isUpdate ? <FormattedMessage id='manage-specialty.save' /> : <FormattedMessage id='manage-specialty.create' />}</button>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
