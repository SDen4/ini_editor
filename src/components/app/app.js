import React, {Component} from 'react';
import Editor from '../editor/editor';


class App extends Component {
    state = {
        object: {}
    }
    render() {
        return (
            <article className='app'>
                <h1 className='app__title'>ini-editor</h1>
                <section className='app__container'>
                    <Editor objectText={this.state.object} />
                    <div className='app__buttons'>
                        <div className='app__buttons_wrapper'>
                            <button className='button button__mode' type='button'>Text mode</button>
                            <button className='button button__mode' type='button'>Graph mode</button>
                        </div>
                        <label className='app__buttons_wrapper' htmlFor='app__input'>
                            <input
                                id='app__input'
                                className='button button__mode'
                                type='file'
                                onChange={(e)=>this.handleFileLoad(e)}
                            ></input>
                            <div className='button button__mode button__mode_input'>Download file</div>
                        </label>
                    </div>
                </section>
            </article>
        );
    }
    handleFileLoad(e) {
        e.preventDefault();

        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = () => {
            let obj = this.parseINIString(reader.result);
            console.log(obj);
            this.setState({
              object: obj
            })
        };

        // let res = this.parseINIString(this.state.file);
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