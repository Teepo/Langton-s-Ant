SHELL=/bin/bash
VERSION = 1
APP_DIR = $(realpath $(CURDIR))
FOLDER_COMPILE = $(APP_DIR)/public/

# Final
MAIN_JS = $(FOLDER_COMPILE)/bundle.js

JSs = app/cell.jsx \
	  app/row.jsx \
	  app/grid.jsx \
	  app/console.jsx \
      app/app.jsx

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