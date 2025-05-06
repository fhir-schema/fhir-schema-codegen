.PHONY: all format lint lint-fix test

all: format lint-fix test

format:
	npm run format:fix

lint:
	npm run lint

lint-fix:
	npm run lint:fix

test:
	npm run test
