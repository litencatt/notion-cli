prerelease_for_tagpr:
	yarn prepack
	@$(MAKE) replace-docs

replace-docs:
	# replace oclif generated readme url to src
	sed -i 's/\[dist\//\[src\//g' docs/*.md
	sed -i 's/\/dist\//\/src\//g' docs/*.md
