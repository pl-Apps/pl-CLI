help:
	@echo make [OPTIONS] ...
	@echo
	@echo Application
	@echo
	@echo "make build          Build application"
	@echo "make run            Run application"
	@echo "make build-run      Build and run application"
	@echo "make commit         Commit application"
	@echo "make addorigin      Add application origin for commit"
	@echo "make install        Install application"
	@echo
	@echo Other
	@echo
	@echo "make help           Show this massage"
	@echo "make installreq     Install all required component"
	@echo 
build:
	@g++ src/main.c++ -lreadline -o bin/pl-CLI
run:
	@./bin/pl-CLI
build-run:
	@g++ src/main.c++ -lreadline -o bin/pl-CLI
	@echo
	@./bin/pl-CLI
commit:
	@git init
	@git add .
	@git commit -m "New commit"
	@git push -u origin master --force
addorigin:
	@git init
	@git remote add origin https://github.com/pl-Apps/pl-CLI.git
install:
	@make build
	@sudo mv ./bin/pl-CLI /bin/pl-CLI
	@echo
	@echo Installation completed
installreq:
	@sudo apt update
	@sudo apt install gcc
	@sudo apt install make
	@sudo apt update
	@echo
	@echo Installation completed