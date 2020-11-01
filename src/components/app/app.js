import React, {Component} from 'react';
import Editor from '../editor/editor';


class App extends Component {
    state = {
        object: {},
        keys: [],
        info: [],
        str: '',
        graphMode: true,
    }
    render() {
        return (
            <article className='app'>
                <h1 className='app__title'>ini-editor</h1>
                <section className='app__container'>
                    <Editor
                        object={this.state.object}
                        keys={this.state.keys}
                        info={this.state.info}
                        str={this.state.str}
                        graphMode={this.state.graphMode}
                    />
                    <div className='app__buttons'>
                        <div className='app__buttons_wrapper'>
                            <button
                                className='button button__mode'
                                type='button'
                                onClick={this.changeMode}
                            >{this.state.graphMode ? 'Text mode' : 'Graph mode'}</button>
                        </div>
                        <label className='app__buttons_wrapper' htmlFor='app__input'>
                            <input
                                id='app__input'
                                className='button button__mode'
                                type='file'
                                accept=".ini"
                                onChange={(e)=>this.handleFileLoad(e)}
                            ></input>
                            <div className='button button__mode button__mode_input'>Download ini-file</div>
                        </label>
                    </div>
                </section>
            </article>
        );
    }
    changeMode = () => {
        this.setState({
            graphMode: !this.state.graphMode
        })
    }
    handleFileLoad(e) {
        e.preventDefault();

        //clear text area before download new file
        this.setState({
            str: ''
        });

        let file = e.target.files[0];
        let arrKeys = [], arrInfo = [];

        let reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = () => {
            let str = reader.result;
            let obj = this.parseINIString(reader.result);
            console.log(obj);
            console.log(str);

            for (let key in obj) {
                arrKeys.push(key);
                arrInfo.push(obj[key]);
            }

            this.setState({
                object: obj,
                keys: arrKeys,
                info: arrInfo,
                str: str,
            })
        };
        // localStorage.setItem('file', res);
    }
    //parser ini to object
    parseINIString(data){
        let regex = {
            section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
            param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
            comment: /^\s*;.*$/
        };
        let value = {};
        let lines = data.split(/[\r\n]+/);
        let section = null;
        lines.forEach(function(line){
            if(regex.comment.test(line)){
                return;
            }else if(regex.param.test(line)){
                let match = line.match(regex.param);
                if(section){
                    value[section][match[1]] = match[2];
                }else{
                    value[match[1]] = match[2];
                }
            }else if(regex.section.test(line)){
                let match = line.match(regex.section);
                value[match[1]] = {};
                section = match[1];
            }else if(line.length == 0 && section){
                section = null;
            };
        });
        return value;
    }
};

export default App;