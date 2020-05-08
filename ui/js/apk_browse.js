const {dialog} = require('electron').remote;



$('#upload_button')[0].addEventListener('click', function (event) {
    dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections']
    }, function (files) {
        if (files !== undefined) {
            var file = files[0];
            var extension =  file.substr(file.lastIndexOf('.') + 1);
            if(extension != 'apk'){

              alert('please upload an APK!!!')
            }

        }
    });
});
