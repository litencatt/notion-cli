# replace oclif generated readme url to src
replace-docs:
	sed -i 's/\[dist\//\[src\//g' docs/*.md
	sed -i 's/\/dist\//\/src\//g' docs/*.md
