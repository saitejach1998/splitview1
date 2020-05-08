const { remote } = require('electron');

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

function getCommandOutput() { return document.getElementById("command-output"); };
function appendOutput(msg) { getCommandOutput().value += (msg + '\n'); };

allowed_text = new Set(['Decompiling...', 'Running scans...', 'Finish scans...', 'Writing report...'])

currWindow = remote.getCurrentWindow();

function backgroundProcess(apk) {
    const process = require('child_process');   // The power of Node.JS

    var cmd = "workon tool-env && python D:\\tool\\cli\\tool.py --apk " + apk;
    // var cmd = "dir"
    console.log('cmd:', cmd);

    var child = process.spawn(cmd, { 'shell': true });

    child.on('error', function (err) {
        appendOutput('stderr: <' + err + '>');
    });

    child.stdout.on('data', function (data) {
        let _data = decoder.write(data).trim()
        // console.log(_data);

        if (allowed_text.has(_data)) {
            appendOutput(_data);
        }
    });

    // child.stderr.on('data', function (data) {
    //     appendOutput('stderr: <' + data + '>');
    // });

    child.on('close', function (code) {
        if (code == 0) {
            appendOutput('Finished Report...');
            appendOutput('child process complete.');


            let apk_name = apk.substr(apk.lastIndexOf('\\') + 1)
            let apk_without_ext = apk_name.split('.')[0]
            let _url = 'file://D:\\tool\\cli\\build\\tool\\' + apk_without_ext + '\\report.html'
            currWindow.loadURL(_url)
        }
        else {
            appendOutput('child process exited with code ' + code);

            // D:\tool\cli\build\tool\Challenge1\report.html

        }
        getCommandOutput().style.background = "DarkGray";
    });
};

$('#uploadFile').on('click', function () {

    try {
        let apk = $('#apk')[0].files[0].path


        if (apk.substr(apk.lastIndexOf('.') + 1) == 'apk') {
            console.log(apk)
            backgroundProcess(apk)
        }
        else {
            alert('please upload an APK')
        }
    }
    catch (err) {

    }
})

