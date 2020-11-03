import React, {Component} from 'react';
import Editor from '../editor/editor';
import {parseINIString} from '../../scripts/parserIniString';


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
            let obj = parseINIString(reader.result);

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
    }
};

export default App;