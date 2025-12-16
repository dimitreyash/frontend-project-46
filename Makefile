install:
	npm ci

run:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

deps-update:
	npx ncu -u

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npm publish --dry-run
