import React, {Component} from 'react';


class Editor extends Component {
    render() {
        // const text = this.props.objectText ? this.props.objectText : '';
        console.log(this.props.objectText);
        return (
            <article className='editor'>
                <h1 className='editor__title'>editor</h1>
                {/* <div className='editor__content'>{text}</div> */}
            </article>
        );
    }
};

export default Editor;