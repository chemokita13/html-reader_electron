const { app, BrowserWindow} = require('electron')


let main;

app.on('ready', ()=>{
    main = new BrowserWindow({
        show: false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    main.loadFile(__dirname+ '/views/index.html')
    main.once('ready-to-show', ()=>{
        main.show()
    })
    main.on('closed', ()=>{
        app.quit()
    })
})