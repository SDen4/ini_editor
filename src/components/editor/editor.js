import React, {Component} from 'react';


class Editor extends Component {
    state = {
        iniText: '',
        buttonSaveActive: false,
    }
    render() {
        //graph mode
        const listInfo = this.props.arrayData.map( (key, index) => {
            let finalArr = []
            if(typeof key === 'string') {
                finalArr.push(<h2 key={key} className='editor__graphMode_subtitle'>{key}</h2>)
            } else if (typeof key === 'object') {
                for (let item in key) {
                    finalArr.push(
                        <label className='editor__graphMode_label' key={item}>
                            <span>{item}</span>
                            <input type='text' defaultValue={key[item]}></input>
                        </label>
                    );
                }
            } else {
                throw new Error('unknown type of data');
            }
            return finalArr;
        });
        const editorGraph = <form className='editor__wrapper'>{listInfo}</form>;

        //test mode
        const editorText = 
            <form className='editor__wrapper' onSubmit={this.saveTextMode}>
                <textarea
                    className='editor__textMode'
                    defaultValue={this.props.stringData}
                    onChange={this.handleChange}
                ></textarea>
                <button
                    // className='button button__mode button__save'
                    className={`${this.state.buttonSaveActive && 'button__mode'} ${'button button__save'}`}
                    type='submit'
                >Save</button>
            </form>;

        //conditions of choode one of two modes
        const choosenMode = this.props.graphMode ? editorGraph : editorText;

        return (
            <article className='editor'>
                <h1 className='editor__title'>{this.props.graphMode ? 'Graph mode' : 'Text mode'}</h1>
                {choosenMode}
            </article>
        );
    }
    handleChange = (e) => {
        this.setState({
            iniText: e.target.value,
            buttonSaveActive: true
        })
    }
    saveTextMode = (e) => {
        e.preventDefault();

        //protect saving witout changes & empty files
        if(!this.state.buttonSaveActive) return;

        let data = this.state.iniText;
        let file = new Blob([data], {type: 'ini'});

        //IE10
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, 'new_ini_file.ini');
        //others
        else {
            let a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = 'new_ini_file.ini';
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        };
        this.setState({
            buttonSaveActive: false
        });
    }
};

export default Editor;