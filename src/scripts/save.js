//function saving ini-file

export function save(data) {
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
};