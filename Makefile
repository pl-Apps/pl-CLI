help:
	@echo make [OPTIONS] ...
	@echo
	@echo Application
	@echo
	@echo "make build          Build application"
	@echo "make run            Run application"
	@echo "make build-run      Build and run application"
	@echo "make commit         Commit application"
	@echo "make newrelease     Create a new application release"
	@echo "make addorigin      Add application origin for commit"
	@echo "make install        Install application"
	@echo
	@echo Other
	@echo
	@echo "make help           Show this massage"
	@echo "make installreq     Install all required component"
	@echo 
build:
	@pkg .
	@mv pl-CLI-* ./bin/
build-desktop:
	@electron-forge build ./desktop-app/
run:
	@./bin/pl-CLI
build-run:
	@make build
	@./bin/pl-CLI-linux
commit:
	@git init
	@git add .
	@git commit -m "New commit"
	@git push -u origin master --force
addorigin:
	@git init
	@git remote add origin https://github.com/pl-Apps/pl-CLI.git
br:
	@make build-run
install:
	@make build
	@sudo cp ./bin/pl-CLI-linux /bin/pl-CLI
	@echo
	@echo Installation completed
installreq:
	@sudo apt update
	@sudo apt install nodejs
	@sudo npm install colors
	@sudo npm install console-read-write
	@sudo apt update
	@echo
	@echo Installation completed
newrelese:
	@make build
	@gh release create v1.0 ./bin/*
	@rm ./bin/*
