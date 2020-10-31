import React, {Component} from 'react';


class Editor extends Component {
    render() {
        const listKeys = this.props.keys.map( (key) => { 
            return <li className='editor__item' key={key}><h2 className='editor__section'>{key}</h2></li>
        });

        const listKeysTextMode = <textarea className='editor__textMode'>{this.props.object}</textarea>

        const listInfo = this.props.info.map( (key, index) => { 
            return <li className='editor__item' key={index}><h2 className='editor__section'>{key.props}</h2></li>
          });

        return (
            <article className='editor'>
                <h1 className='editor__title'>{this.props.graphMode ? 'Graph mode' : 'Text mode'}</h1>
                <ul className='editor__list'>
                    {listKeys}
                    {/* <button className='test' onClick={this.counting}>Test</button> */}
                </ul>
                <ul className='editor__list'>
                    {listInfo}
                </ul>
            </article>
        );
    }
};

export default Editor;