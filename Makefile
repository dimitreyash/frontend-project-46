install:
	npm ci

publish:
	npm publish --dry-run


run:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json
