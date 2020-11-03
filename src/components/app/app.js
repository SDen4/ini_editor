import React, {Component} from 'react';
import Editor from '../editor/editor';


class App extends Component {
    state = {
        arrayData: [],
        stringData: '',
        graphMode: true,
    }
    render() {
        return (
            <article className='app'>
                <h1 className='app__title'>ini-editor</h1>
                <section className='app__container'>
                    <Editor
                        stringData={this.state.stringData}
                        arrayData={this.state.arrayData}
                        graphMode={this.state.graphMode}
                    />
                    <aside className='app__buttons'>
                        <button
                            className='button button__mode'
                            type='button'
                            onClick={this.changeMode}
                        >{this.state.graphMode ? 'Text mode' : 'Graph mode'}</button>
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
                    </aside>
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
            stringData: ''
        });

        let file = e.target.files[0];

        let reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = () => {
            let stringData = reader.result;
            let obj = this.parseINIString(reader.result);

            console.log(stringData);
            console.log(obj);
            let arrayData = [];

            for (let key in obj) {
                arrayData.push(key);
                arrayData.push(obj[key]);
            }

            console.log(arrayData);

            let resultArr = [];

            for(let i = 0; i < arrayData.length; i++) {
                if(typeof arrayData[i] === 'string') {
                    resultArr.push(arrayData[i]);
                } else if (typeof arrayData[i] === 'object') {
                    for (let key in arrayData[i]) {
                        let jsonStr = `{"${key}": "${arrayData[i][key]}"}`;
                        console.log(jsonStr);
                        resultArr.push(JSON.parse(jsonStr));
                    }
                } else {
                    throw new Error('unknown data format!')
                }
            }

            console.log(resultArr);

            this.setState({
                stringData: stringData,
                arrayData: resultArr,
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