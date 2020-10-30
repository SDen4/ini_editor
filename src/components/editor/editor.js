import React, {Component} from 'react';


class Editor extends Component {
    state = {
        keys: [],
        object: this.props.object
    }
    // componentDidMount() {
    //     this.counting();
    // }
    render() {
        // let list = this.state.keys.map(key => <h2 className='editor__section' key={key}>{key}</h2>);
        return (
            <article className='editor'>
                <h1 className='editor__title'>{this.props.graphMode ? 'Graph mode' : 'Text mode'}</h1>
                <div className='editor__content'>
                    {/* {list} */}
                    {/* <button className='test' onClick={this.counting}>Test</button> */}
                </div>
            </article>
        );
    }
    counting = () => {
        // let object = this.props.object;
        // console.log(object);
        let arr = [];
        for (let key in this.state.object) {
            console.log(key)
            arr.push(key);
            this.setState({
                keys: arr
            })
        }
    }
};

export default Editor;