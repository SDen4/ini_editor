import React, {Component} from 'react';


class Editor extends Component {
    state = {
        iniText: ''
    }
    render() {
        const listInfo = this.props.info.map( (key, index) => { 
            return <li className='editor__item' key={index}><h2 className='editor__section'>{key.props}</h2></li>
        });
        const listKeys = this.props.graphMode && this.props.keys.map( (key) => { 
            return <li className='editor__item' key={key}><h2 className='editor__section'>{key}</h2></li>
        });

        const editorGraph = <ul className='editor__wrapper'>{listKeys}{listInfo}</ul>;

        const editorText = <label className='editor__wrapper'>
            <textarea
                className='editor__textMode'
                defaultValue={this.props.str}
                onChange={this.handleChange}
            ></textarea>
            <button className='button button__mode button__save' type='button'>Save</button>
        </label>;

        const listKeysGraphMode = this.props.graphMode && editorGraph;
        const listKeysTextMode = !this.props.graphMode && editorText;

        return (
            <article className='editor'>
                <h1 className='editor__title'>{this.props.graphMode ? 'Graph mode' : 'Text mode'}</h1>
                {listKeysGraphMode}
                {listKeysTextMode}
                {/* <ul className='editor__list'> */}
                    {/* {listKeys} */}
                    {/* <button className='test' onClick={this.counting}>Test</button> */}
                {/* </ul> */}
                {/* <ul className='editor__list'> */}
                    {/* {listInfo} */}
                {/* </ul> */}
            </article>
        );
    }
    handleChange = (e) => {
        this.setState({
            iniText: e.target.value
        })
    }
};

export default Editor;