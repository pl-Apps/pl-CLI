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
var username = "root"
var curdir = os.homedir();
const version = "1.0"

main()

function readfile(filename)
{
    const fs = require("fs")
    fs.readFile(filename, "utf8" , async(data) => {
        console.log(data)
        await io.ask()
    })
}

async function main()
{
    console.clear()
    while(true)
    {
        curdir = curdir.replace("/home/" * "/", "~")
        const line = await io.ask("┌──(".white + "pl-CLI".red + "@".white + username.yellow +")-[" + curdir + "]" + "\n└─" + "$".blue)
        if(line.split(" ")[0] == "help")
        {
            console.log("help                                   print this message")
            console.log("version                                print this pl-CLI version")
            console.log("clear                                  clear the interface")
            console.log("print <value>                          print value")
            console.log("exit <exit code>                       kill pl-CLI process")
            console.log("get-http <url>                         get a file (http) from a url")
            console.log("get-https <url> <output file>          get a file (https) from a url")
            console.log("ol <dir>                               get file and directory list")
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
                try {filesystem.unlinkSync(curdir + "/" + line.split("\"")[3]); } catch {}
            }
        }
        else if(line.split(" ")[0] == "get-https")
        {
            try
            {
                const file = filesystem.createWriteStream(curdir + "/" + line.split("\"")[3])
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
        else if(line.split(" ")[0] == "ol")
        {
            if(line.split("\"")[1] == undefined)
            {
                filesystem.readdirSync(curdir, async(dir) => {
                    console.log(dir)
                })
            }
            else
            {
                filesystem.readdirSync(line.split("\"")[1], async(dir) => {
                    console.log(dir)
                })
            }
        }
        else if(line.split(" ")[0] == "system")
        {
            exec(line.split("\"")[1])
        }
        else if(line.split(" ")[0] == "node")
        {
            try { eval(line.split("\"")[1]) } catch(ex) {console.log("Err: ".white + String(ex).red)}
        }
        else if(line.split(" ")[0] == "")
        {
            
        }
        else if(line.split(" ")[0] == "cd")
        {
            if(filesystem.existsSync(line.split("\"")[1]))
            {
                curdir = line.split("\"")[1]
                __dirname = curdir
                prefix = ("(pl-CLI@root)-[" + curdir + "]\n" + "$".blue)
            }
            else
            {
                console.log("Err:".white + " No such directory".red)
            }
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