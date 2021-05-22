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
var username = ""
var curdir = __dirname
var vieweddir = "~"
const version = "2.0"

if(process.argv.length > 2)
{
    if(process.argv[2] == "version")
    {
        console.log("pl-CLI v" + version)
    }
    else
    {
        console.log("Err:".white + " Invalid argument".red)
    }
    process.exit(1)
}

main()

async function main()
{
    try { await filesystem.mkdirSync("./installed-packages", function(err) {}); } catch {}
    try { await filesystem.mkdirSync(os.homedir() + "/config", function(err) {}); } catch {}
    console.clear()
    if(filesystem.existsSync(os.homedir() + "/config//pl-CLI-login.pz")) {
        filesystem.readFile(os.homedir() + "/config//pl-CLI-login.pz", "utf8" , async(err, data) => {
            if(data == "")
            {
                // Not logged (empty file)
                username = await io.ask("New username:".yellow)
                await filesystem.writeFileSync(os.homedir() + "/config//pl-CLI-login.pz", username, function(err) {})
            } else {
                // Logged file
                await filesystem.readFileSync(os.homedir() + "/config//pl-CLI-login.pz", "utf8" , async(err, data) => {
                    username = data
                })
            }
        })
    } else {
        // Not logged (file not exist)
        username = await io.ask("New username:".yellow)
        await filesystem.writeFileSync(os.homedir() + "/config//pl-CLI-login.pz", username, function(err) {})
    }

    // END LOADING LOGIN
    console.clear()
    while(true) {
        if(curdir == os.homedir()) {
            vieweddir = "~"
        } else {
            vieweddir = curdir
        }
        const line = await io.ask("┌──(".white + "pl-CLI".red + "@".white + username.yellow + ")-[" + vieweddir + "]" + "\n└─" + "$".blue)
        if (line.split(" ")[0] == "help") {
            console.log("help                                       print this message")
            console.log("version                                    print this pl-CLI version")
            console.log("clear                                      clear the interface")
            console.log("print <value>                              print value")
            console.log("exit <exit code>                           kill pl-CLI process")
            console.log("get-http <url> <output file>               get a file (http) from a url")
            console.log("get-https <url> <output file>              get a file (https) from a url")
            console.log("fl <dir>                                   get file list")
            console.log("plgit [ARGS]                               run plgit commands")
            console.log("system <command>                           run system command")
            console.log("node <command>                             run node.js command")
            console.log("pkg-install <package name>                 Install pl-CLI extra package")
            console.log("pkg-uninstall <package name>               Uninstall pl-CLI extra package")
            console.log("pkg-publish <filename.plclipkg>            Publish a pl-CLI package")
        } else if (line.split(" ")[0] == "version") {
            console.log("pl-CLI v" + version)
        } else if (line.split(" ")[0] == "clear") {
            console.clear()
        } else if (line.split(" ")[0] == "print") {
            console.log(line.split("\"")[1])
        } else if (line.split(" ")[0] == "exit") {
            process.exit(line.split("\"")[1])
        } else if (line.split(" ")[0] == "get-http") {
            try {
                const file = filesystem.createWriteStream(line.split("\"")[3])
                http.get(line.split("\"")[1], function (response) {
                    response.pipe(file)
                })
            } catch {
                console.log("Err:".white + " Impossible to get file".red)
                try {
                    filesystem.unlinkSync(curdir + "/" + line.split("\"")[3]);
                } catch {
                }
            }
        } else if (line.split(" ")[0] == "get-https") {
            try {
                const file = filesystem.createWriteStream(curdir + "/" + line.split("\"")[3])
                https.get(line.split("\"")[1], function (response) {
                    response.pipe(file)
                })
            } catch {
                console.log("Err:".white + " Impossible to get file".red)
                try {
                    filesystem.unlinkSync(line.split("\"")[3]);
                } catch {
                }
            }
        } else if (line.split(" ")[0] == "fl") {
            if (line.split("\"")[1] == undefined) {
                try { filesystem.readdir(curdir, (err, files) => {
                    console.log("\n")
                    files.forEach(file => {
                      console.log(file);
                    })
                }) } catch { console.log("Err: ".white + "Impossible to get the file list")}
            } else {
                filesystem.readdir(line.split("\"")[1], (err, files) => {
                    console.log("\n")
                    files.forEach(file => {
                      console.log(file);
                    });
                });
            }
        } else if (line.split(" ")[0] == "system") {
            exec(line.split("\"")[1])
        } else if (line.split(" ")[0] == "node") {
            try {
                eval(line.split("\"")[1])
            } catch (ex) {
                console.log("Err: ".white + String(ex).red)
            }
        } else if (line.split(" ")[0] == "") {

        } else if (line.split(" ")[0] == "cd") {
            if (filesystem.existsSync(line.split("\"")[1])) {
                curdir = line.split("\"")[1]
                __dirname = curdir
            } else if (filesystem.existsSync(curdir + "/" + line.split("\"")[1])) {
                curdir = curdir + "/" + line.split("\"")[1]
                __dirname = curdir
            } else {
                console.log("Err:".white + " No such directory".red)
            }
        } else if (line.split(" ")[0] == "pkg-install") {
            const file = filesystem.createWriteStream("installed-packages/" + line.split("/")[line.split("/").length] + ".plclipkg")
            https.get("https://registry-plcli.cf/packages/" + line.split("\"")[1], function(response) {
                response.pipe(file)
            })
        } else if (line.split(" ")[0] == "pkg-uninstall") {
            try { filesystem.unlink("installed-packages/" + line.split("\"")[1] + ".plclipkglear") } catch { console.log("Err:".white + " Impossible to remove the specified package".red)}
        } else if (line.split(" ")[0] == "pkg-publish") {
            
        } else if(line.split(" ")[0] == "logout") {
            filesystem.unlink(os.homedir() + "/config//pl-CLI-login.pz", function(err) {})
            console.clear()
            process.exit(0)
        } else {
            console.log(("\"" + line.split(" ")[0] + "\" is not definied.\n").red)
        }
    }
}
}
// application exception
catch(ex) {
    console.log("Err: Application error".red)
    console.log("\n\nFull error: " + String(ex))
}