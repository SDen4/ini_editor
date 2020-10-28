import React, {Component} from 'react';
import Editor from '../editor/editor';


class App extends Component {
    render() {
        return (
            <article className='app'>
                <h1 className='app__title'>ini-editor</h1>
                <section className='app__container'>
                    <Editor />
                    <div className='app__buttons'>
                        <div className='app__buttons_wrapper'>
                            <button className='button button__mode' type='button'>Text mode</button>
                            <button className='button button__mode' type='button'>Graph mode</button>
                        </div>
                        <div className='app__buttons_wrapper'>
                            <button className='button button__mode' type='button'>Download file</button>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
};

export default App;