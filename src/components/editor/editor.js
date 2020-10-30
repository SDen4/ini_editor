import React, {Component} from 'react';


class Editor extends Component {
    state = {
        keys: [],
        info: [],
    }
    render() {
        let list = this.state.keys.map(key => <li className='editor__item' key={key}><h2 className='editor__section'>{key}</h2></li>);
        return (
            <article className='editor'>
                <h1 className='editor__title'>{this.props.graphMode ? 'Graph mode' : 'Text mode'}</h1>
                <ul className='editor__list'>
                    {list}
                    <button className='test' onClick={this.counting}>Test</button>
                </ul>
            </article>
        );
    }
    counting = () => {
        let object = this.props.object;
        console.log(object);
        let arrKeys = [];
        let arrInfo = [];
        for (let key in object) {
            console.log(key)
            arrKeys.push(key);
            arrInfo.push(object[key]);
            this.setState({
                keys: arrKeys,
                info: arrInfo,
            })
        }
    }
};

export default Editor;