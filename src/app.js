try
{
console.log("Loading pl-CLI...")
const io = require("console-read-write")
const http = require("http")
const https = require("https")
const colors = require("colors")
const filesystem = require("fs")

const version = "1.0"

main()

async function main()
{
    console.clear()
    while(true)
    {
        const line = await io.ask("$".blue)
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
                console.log("Err:".white + "Impossible to get file".red)
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
                console.log("Err:".white + "Impossible to get file".red)
                try {filesystem.unlinkSync(line.split("\"")[3]); } catch {}
            }
        }
        else
        {
            console.log(("\"" + line.split(" ")[0] + "\" is not definied.").red)
        }
    }
}
}
// application exception
catch
{
    console.log("Err: Application error".red)
}