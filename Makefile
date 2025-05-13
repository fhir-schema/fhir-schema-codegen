.PHONY: all format lint lint-fix test format-check release

SDK_TEST_PATH = example

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

PYTHON=python3
PYTHON_SDK_EXAMPLE=./example/python

test-python-sdk: build
	docker compose -f example/docker-compose.yaml up --wait
	make test-python-sdk-without-service
	docker compose -f example/docker-compose.yaml down

test-python-sdk-without-service:
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
		python -m pytest test_sdk.py -v

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
