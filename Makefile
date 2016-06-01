# fswatch -o ./ | xargs -n1 -I{} make

SHELL=/bin/bash
VERSION = 1
APP_DIR = $(realpath $(CURDIR))
FOLDER_COMPILE = $(APP_DIR)/public/js

# Final
MAIN_JS = $(FOLDER_COMPILE)/bundle.js

JSs = app/ant.js \
	  app/cell.js \
	  app/row.js \
	  app/grid.js \
	  app/console.js \
      app/app.js

# MAIN LOOP, dev is default
all: dev

##### PARAMS
dev: dist $(MAIN_JS)

##### RULES
dist:
	@mkdir -p $(FOLDER_COMPILE)

$(MAIN_JS): $(JSs)
	echo "" > $(MAIN_JS)
	cat $(JSs) >> $(MAIN_JS)
	echo "" >> $(MAIN_JS)