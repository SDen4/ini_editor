import React, {Component} from 'react';
import Editor from '../editor/editor';
import Aside from '../aside/aside';
import {parseINIString} from '../../scripts/parserIniString';


class App extends Component {
    state = {
        arrayData: [],
        stringData: '',
        graphMode: true,
        darkTheme: false,
    }
    render() {
        return (
            <article className={`${this.state.darkTheme && 'app_dark'} ${'app'}`}>
                <div className='app__wrapper'>
                    <h1 className={`${this.state.darkTheme && 'app__title_dark'} ${'app__title'}`}>ini-editor</h1>
                    <div className='app__main'>
                        <section className='app__container'>
                            <Editor
                                stringData={this.state.stringData}
                                arrayData={this.state.arrayData}
                                graphMode={this.state.graphMode}
                                darkTheme={this.state.darkTheme}
                            />
                        </section>
                        <Aside
                            handleFileLoad={(e) => this.handleFileLoad(e)}
                            graphMode={this.state.graphMode}
                            darkTheme={this.state.darkTheme}
                            changeMode={this.changeMode}
                            changeTheme={this.changeTheme}
                        />
                    </div>
                </div>
            </article>
        );
    }
    changeTheme = () => {
        this.setState({
            darkTheme: !this.state.darkTheme
        })
    }
    changeMode = () => {
        this.setState({
            graphMode: !this.state.graphMode
        })
    }
    handleFileLoad = (e) => {
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
            let arrayData = [], resultArr = [];

            for (let key in obj) {
                arrayData.push(key);
                arrayData.push(obj[key]);
            };

            for(let i = 0; i < arrayData.length; i++) {
                if(typeof arrayData[i] === 'string') {
                    resultArr.push(arrayData[i]);
                } else if (typeof arrayData[i] === 'object') {
                    for (let key in arrayData[i]) {
                        let correctSTR = `"${arrayData[i][key]}"`
                        for(let i = 0; i < correctSTR.length; i++) {
                            if(correctSTR[i] === '"' && correctSTR[i+1] === '"') {
                                correctSTR = correctSTR.slice(1, correctSTR.length-1);
                            }
                        };
                        let resultStr = `{"${key}": ${correctSTR}}`;
                        let resultObj = {};
                        resultObj = new Function( 'return (' + resultStr + ')' )();
                        resultArr.push(resultObj);
                    }
                } else {
                    throw new Error('unknown data format!')
                }
            };

            this.setState({
                stringData: stringData,
                arrayData: resultArr,
            })
        };
    }
};

export default App;