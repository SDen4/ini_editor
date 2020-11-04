import React, {Component} from 'react';


class Aside extends Component {
    state = {
        graphMode: true,
    }
    componentDidUpdate(prevProps) {
        if (this.props.graphMode === prevProps.graphMode) return;
        this.setState({
            graphMode: this.props.graphMode
        })
    }
    render() {
        return (
            <aside className='aside__buttons'>
                <button
                    className='button button__mode'
                    type='button'
                    onClick={this.changeMode}
                >{this.state.graphMode ? 'Text mode' : 'Graph mode'}</button>
                <label className='aside__buttons_wrapper' htmlFor='app__input'>
                    <input
                        id='app__input'
                        className='button button__mode'
                        type='file'
                        accept=".ini"
                        onChange={(e)=>this.handleFileLoad(e)}
                    ></input>
                    <div className='button button__mode button__mode_input'>Download ini&#8209;file</div>
                </label>
            </aside>
        );
    }
    handleFileLoad = (e) => {
        this.props.handleFileLoad(e);
    }
    changeMode = () => {
        this.props.changeMode();
    }
};

export default Aside;