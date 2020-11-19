import React, {Component} from 'react';


class Aside extends Component {
    state = {
        graphMode: true,
        darkTheme: false
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
                <div className='aside__buttons_block'>
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
                </div>
                <div className='aside__buttons_block'>
                    <button
                        className='button button__mode button__bottom'
                        onClick={this.changeTheme}
                    >{this.state.darkTheme ? 'Light' : 'Dark'}</button>
                </div>
            </aside>
        );
    }
    handleFileLoad = (e) => {
        this.props.handleFileLoad(e);
    }
    changeMode = () => {
        this.props.changeMode();
    }
    changeTheme = () => {
        this.setState({
            darkTheme: !this.state.darkTheme
        })
        document.body.classList.toggle('darkTheme');
    }
};

export default Aside;