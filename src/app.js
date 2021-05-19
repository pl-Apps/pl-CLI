try
{
console.log("Loading pl-CLI...")
const io = require("console-read-write")
const os = require("os");
const exec = require("child_process").exec
const http = require("http")
const https = require("https")
const colors = require("colors")
const filesystem = require("fs");
var curdir = __dirname;
const prefix = ("(pl-CLI@root)-[" + curdir + "]\n" + "$".blue)

const version = "1.0"

main()

async function main()
{
    if(filesystem.existsSync("/tmp"))
    {
        if(filesystem.existsSync("/tmp/pl-CLI-login.pz"))
        {

        }
    }
    else if(filesystem.existsSync(process.env.temp) != undefined)
    {
        if(filesystem.existsSync(process.env.temp + "pl-CLI-login.pz"))
        {

        }
    }
    else
    {
        console.log("Used filesystem is not supported")
    }
    //console.clear()
    while(true)
    {
        const line = await io.ask(prefix)
        if(line.split(" ")[0] == "help")
        {
            console.log("help                                   print this message")
            console.log("version                                print this pl-CLI version")
            console.log("clear                                  clear the interface")
            console.log("print <value>                          print value")
            console.log("exit <exit code>                       kill pl-CLI process")
            console.log("get-http <url>                         get a file (http) from a url")
            console.log("get-https <url> <output file>          get a file (https) from a url")
            console.log("plgit [ARGS]                           run plgit commands")
            console.log("system <command>                       run system command")
            console.log("node <command>                         run node.js command")
        }
        else if(line.split(" ")[0] == "version")
        {
            console.log("pl-CLI v" + version)
        }
        else if(line.split(" ")[0] == "clear")
        {
            console.clear()
        }
        else if(line.split(" ")[0] == "print")
        {
            console.log(line.split("\"")[1])
        }
        else if(line.split(" ")[0] == "exit")
        {
            process.exit(line.split("\"")[1])
        }
        else if(line.split(" ")[0] == "get-http")
        {
            try
            {
                const file = filesystem.createWriteStream(line.split("\"")[3])
                http.get(line.split("\"")[1], function(response) { 
                    response.pipe(file)
                })
            }
            catch
            {
                console.log("Err:".white + " Impossible to get file".red)
                try {filesystem.unlinkSync(line.split("\"")[3]); } catch {}
            }
        }
        else if(line.split(" ")[0] == "get-https")
        {
            try
            {
                const file = filesystem.createWriteStream(line.split("\"")[3])
                https.get(line.split("\"")[1], function(response) { 
                    response.pipe(file)
                })
            }
            catch
            {
                console.log("Err:".white + " Impossible to get file".red)
                try {filesystem.unlinkSync(line.split("\"")[3]); } catch {}
            }
        }
        else if(line.split(" ")[0] == "system")
        {
            exec(line.split("\"")[1])
        }
        else if(line.split(" ")[0] == "node")
        {
            eval(line.split("\"")[1])
        }
        else
        {
            console.log(("\"" + line.split(" ")[0] + "\" is not definied.\n").red)
        }
    }
}
}
// application exception
catch
{
    console.log("Err: Application error".red)
}