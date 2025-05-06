.PHONY: all format lint lint-fix test format-check release

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

test:
	npm run test

release: lint test format-check
	@VERSION=$$(grep -E '"version": "[^"]+"' package.json | head -1 | sed -E 's/.*"version": "([^"]+)".*/\1/'); 
	TAG="v$$VERSION"; 
	COMMIT_VERSION=$$(git rev-parse --short HEAD); 
	if git rev-parse "$$TAG" >/dev/null 2>&1; then 
		echo "Error: Tag $$TAG already exists. Please update the version in package.json."; 
		exit 1; 
	fi; 
	echo "Creating release $$VERSION with tag $$TAG (commit $$COMMIT_VERSION)"; 
	git tag -a "$$TAG" -m "Release $$VERSION ($$COMMIT_VERSION)"; 
	git push origin "$$TAG"; 
	echo "Tag $$TAG created and pushed to remote origin"
