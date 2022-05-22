
 const inp = document.querySelector('#md')
const render = document.querySelector('#renderer')
const html = document.querySelector('html')

const rendMd = (text) => {
render.innerHTML = text
}

inp.addEventListener('keyup', (e)=>{
    const value = e.target.value
    rendMd(e.target.value)
})

let editor

const path = require('path');
const amdLoader = require('../../node_modules/monaco-editor/min/vs/loader.js');
const amdRequire = amdLoader.require;
const amdDefine = amdLoader.require.define;

function uriFromPath(_path) {
    var pathName = path.resolve(_path).replace(/\\/g, '/');
    if (pathName.length > 0 && pathName.charAt(0) !== '/') {
        pathName = '/' + pathName;
    }
    return encodeURI('file://' + pathName);
}

amdRequire.config({
    baseUrl: uriFromPath(path.join(__dirname, '../../node_modules/monaco-editor/min'))
});

// workaround monaco-css not understanding the environment
self.module = undefined;

amdRequire(['vs/editor/editor.main'], async function () {
    editor = await monaco.editor.create(document.getElementById('md'), {
        value: '<!-- Write your html here! -->',
        language: 'html',
        theme: 'vs-dark',
    });
    editor.onDidChangeModelContent(function (event) {
        const value = editor.getValue()
        rendMd(value)
    });
});

