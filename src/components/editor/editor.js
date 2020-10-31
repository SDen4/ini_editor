import React, {Component} from 'react';


class Editor extends Component {
    state = {
        iniText: '',
        buttonSaveActive: false,
    }
    render() {
        const listInfo = this.props.info.map( (key, index) => { 
            return <li className='editor__item' key={index}><h2 className='editor__section'>{key.props}</h2></li>
        });
        const listKeys = this.props.graphMode && this.props.keys.map( (key) => { 
            return <li className='editor__item' key={key}><h2 className='editor__section'>{key}</h2></li>
        });

        const editorGraph = <ul className='editor__wrapper'>{listKeys}{listInfo}</ul>;

        const editorText = 
            <form className='editor__wrapper' onSubmit={this.saveTextMode}>
                <textarea
                    className='editor__textMode'
                    defaultValue={this.props.str}
                    onChange={this.handleChange}
                ></textarea>
                <button
                    // className='button button__mode button__save'
                    className={`${this.state.buttonSaveActive && 'button__mode'} ${'button button__save'}`}
                    type='submit'
                >Save</button>
            </form>;

        const listKeysGraphMode = this.props.graphMode && editorGraph;
        const listKeysTextMode = !this.props.graphMode && editorText;

        return (
            <article className='editor'>
                <h1 className='editor__title'>{this.props.graphMode ? 'Graph mode' : 'Text mode'}</h1>
                {listKeysGraphMode}
                {listKeysTextMode}
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
        }
    }
};

export default Editor;