.PHONY: all format lint lint-fix test format-check release

AIDBOX_LICENSE ?=

all: format lint-fix test build

build:
	npm run build

format:
	npm run format:fix

format-check:
	npm run format

lint:
	npm run lint

lint-fix:
	npm run lint:fix

lint-fix-unsafe:
	npm run lint:fix:unsafe

test:
	npm run test

###########################################################
# SDK Test Env

prepare-aidbox-runme:
	@if [ ! -f "example/docker-compose.yaml" ]; then \
		echo "Download docker-compose.yaml to run Aidbox and set BOX_ROOT_CLIENT_SECRET to <SECRET>" ; \
		if [ -n "$(AIDBOX_LICENSE_ID)" ]; then \
			curl -s https://aidbox.app/runme/l/$(AIDBOX_LICENSE_ID) | sed 's/BOX_ROOT_CLIENT_SECRET: .*/BOX_ROOT_CLIENT_SECRET: <SECRET>/' > example/docker-compose.yaml; \
		else \
			curl -s https://aidbox.app/runme/fscg | sed 's/BOX_ROOT_CLIENT_SECRET: .*/BOX_ROOT_CLIENT_SECRET: <SECRET>/' > example/docker-compose.yaml; \
			echo "WARN: Open http://localhost:8080 and add Aidbox license"; \
		fi \
	fi

###########################################################
# Python SDK

PYTHON=python3
PYTHON_SDK_EXAMPLE=./example/python

format-python:
	ruff format \
	    example/python/test_sdk.py \
		example/python/main.py \
	    src/generators/python/static/client.py

test-python-sdk: prepare-aidbox-runme
	docker compose -f example/docker-compose.yaml up --wait
	make test-python-sdk-without-service
	docker compose -f example/docker-compose.yaml down

test-python-sdk-without-service: build
	npx fscg generate -g python -p hl7.fhir.r4.core@4.0.1 \
					--package-root aidbox -o $(PYTHON_SDK_EXAMPLE)

	@if [ ! -d "$(PYTHON_SDK_EXAMPLE)/venv" ]; then \
		cd $(PYTHON_SDK_EXAMPLE) && \
		$(PYTHON) -m venv venv && \
		. venv/bin/activate && \
		pip install -r requirements.txt; \
	fi

	cd $(PYTHON_SDK_EXAMPLE) && \
		. venv/bin/activate && \
		python -m mypy . --exclude venv && \
		python -m pytest test_sdk.py -v

###########################################################
# TypeScript SDK

TYPESCRIPT_SDK_EXAMPLE=./example/typescript

test-typescript-sdk: prepare-aidbox-runme
	docker compose -f example/docker-compose.yaml up --wait
	make test-typescript-sdk-without-service
	docker compose -f example/docker-compose.yaml down

test-typescript-sdk-without-service: build
	npx fscg generate -g typescript -p hl7.fhir.r4.core@4.0.1 -o $(TYPESCRIPT_SDK_EXAMPLE)/fhirsdk

	@if [ ! -d "$(TYPESCRIPT_SDK_EXAMPLE)/node_modules" ]; then \
		cd $(TYPESCRIPT_SDK_EXAMPLE) && \
		npm install; \
	fi

	cd $(TYPESCRIPT_SDK_EXAMPLE) && \
        npm run test && \
	    npm run type-check

###########################################################
# Release

release: lint test format-check
	@VERSION=$$(grep -E '"version": "[^"]+"' package.json | head -1 | sed -E 's/.*"version": "([^"]+)".*/\1/'); \
	TAG="v$$VERSION"; \
	COMMIT_VERSION=$$(git rev-parse --short HEAD); \
	if git rev-parse "$$TAG" >/dev/null 2>&1; then \
		echo "Error: Tag $$TAG already exists. Please update the version in package.json."; \
		exit 1; \
	fi; \
	echo "Creating release $$VERSION with tag $$TAG (commit $$COMMIT_VERSION)"; \
	git tag -a "$$TAG" -m "Release $$VERSION ($$COMMIT_VERSION)"; \
	git push origin "$$TAG"; \
	echo "Tag $$TAG created and pushed to remote origin"
