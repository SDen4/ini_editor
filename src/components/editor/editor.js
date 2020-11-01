import React, {Component} from 'react';


class Editor extends Component {
    state = {
        iniText: '',
        buttonSaveActive: false,
        arrayData: [],
        stringData: '',
        addNewSectionFlag: false,
        newSectionName: '',
    }

    componentDidUpdate(prevProps) {
        if (this.props.arrayData === prevProps.arrayData) return;
        this.setState({
            arrayData: this.props.arrayData,
            stringData: this.props.stringData
        })
    }

    render() {
        //graph mode
        const listInfo = this.state.arrayData.map( (key, index) => {
            let arrayTotal = []
            if(typeof key === 'string') {
                arrayTotal.push(
                    <div className='editor__graphMode_subtitle_wrapper'>
                        <h2 key={key} className='editor__graphMode_subtitle'>{key}</h2>
                        <div className='editor__graphMode_subtitle_buttons'>
                            <button
                                className='button button__mode button__add'
                                type='button'
                            >+</button>
                            <span className='editor__graphMode_buttons_text'>Add new key</span>
                        </div>
                    </div>)
            } else if (typeof key === 'object') {
                for (let item in key) {
                    arrayTotal.push(
                        <label className='editor__graphMode_label' key={item}>
                            <span>{item}</span>
                            <input
                                className='editor__grahpMode_input'
                                type={isFinite(key[item]) ? 'number' : 'text'} //check input for numbers
                                defaultValue={key[item]}
                                name={item + index} //plus index for unic name
                                onChange={this.handleChangeGraph}
                            ></input>
                        </label>
                    );
                }
            } else {
                throw new Error('unknown type of data');
            }
            return arrayTotal;
        });

        //add new section in graph mode
        const addNewSection = this.state.addNewSectionFlag && 
            <div className='editor__graph_addNewSection'>
                <h2 className='editor__graph_addNewSection_text'>Enter the name of new section</h2>
                <label className='editor__graph_addNewSection_label'>
                    <input
                        className='editor__grahpMode_input editor__grahpMode_input_addNewSection'
                        type='text'
                        onChange={this.addNewSectionText}
                    ></input>
                    <button
                        className={`${this.state.newSectionName && 'button__mode'} ${'button button__add'}`}
                        type='button'
                        onClick={this.addNewSection}
                    >+</button>
                </label>
            </div>

        const editorGraph = this.props.arrayData.length !=0 &&
            <form className='editor__wrapper'>
                {addNewSection}
                <div className='editor__wrapper_container'>
                    {listInfo}
                    <div className='editor__graphMode_buttons'>
                        <button
                            className='button button__mode button__add'
                            type='button'
                            onClick={this.addNewSectionModal}
                        >+</button>
                        <span className='editor__graphMode_buttons_text'>Add new section</span>
                    </div>
                </div>
            </form>;

        //test mode
        const editorText = 
            <form className='editor__wrapper' onSubmit={this.saveTextMode}>
                <textarea
                    className='editor__textMode'
                    defaultValue={this.state.stringData}
                    onChange={this.handleChangeText}
                ></textarea>
                <button
                    className={`${this.state.buttonSaveActive && 'button__mode'} ${'button button__save'}`}
                    type='submit'
                >Save</button>
            </form>;

        //conditions of choode one of two modes
        const choosenMode = this.props.graphMode ? editorGraph : editorText;

        const notice = this.props.arrayData.length == 0 && 
            <div className='editor__notice'>Please, download ini-file.</div>

        return (
            <article className='editor'>
                <h1 className='editor__title'>{this.props.graphMode ? 'Graph mode' : 'Text mode'}</h1>
                {notice}
                {choosenMode}
            </article>
        );
    }

    //open modal of add new section
    addNewSectionModal = () => {
        this.setState({
            addNewSectionFlag: true,
        })
    }

    //new section name
    addNewSectionText = (e) => {
        this.setState({
            newSectionName: e.target.value
        })
    }

    //add new section
    addNewSection = () => {
        //protect saving empty section name
        if(!this.state.newSectionName) return;
        this.setState({
            addNewSectionFlag: false,
            arrayData: [...this.state.arrayData, this.state.newSectionName],
            newSectionName: '',
        })
    }

    //change inputs data in graph mode
    handleChangeGraph = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    //change data in text mode
    handleChangeText = (e) => {
        this.setState({
            iniText: e.target.value,
            buttonSaveActive: true
        })
    }

    //save text mode file
    saveTextMode = (e) => {
        e.preventDefault();
        let data = this.state.iniText;
        this.saveData(data)
    }

    //save a new ini-file
    saveData = (data) => {
        //protect saving witout changes & empty files
        if(!this.state.buttonSaveActive) return;

        let file = new Blob([data], {type: 'ini'});

        //IE10
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, 'new_ini_file.ini');
        //others
        else {
            let a = document.createElement('a'),
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