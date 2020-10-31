import React, {Component} from 'react';


class Editor extends Component {
    render() {
        const listKeys = this.props.graphMode && this.props.keys.map( (key) => { 
            return <li className='editor__item' key={key}><h2 className='editor__section'>{key}</h2></li>
        });

    const listKeysGraphMode = this.props.graphMode && <ul className='editor__wrapper'>{listKeys}</ul>

        // const listInfo = this.props.info.map( (key, index) => { 
        //     return <li className='editor__item' key={index}><h2 className='editor__section'>{key.props}</h2></li>
        // });

        const editorTextArea = <label className='editor__wrapper'>
                                    <textarea className='editor__textMode'>{this.props.key}</textarea>
                                    <button className='button button__mode' type='button'>Save</button>
                                </label>;

        const listKeysTextMode = !this.props.graphMode && editorTextArea;

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
};

export default Editor;