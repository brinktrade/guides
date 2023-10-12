# Brink Guides and Tutorials

Welcome to our guides repo. Here you'll find the guides' markdown source files as well as the full ready-to-run scripts for all of our guides and tutorials on our docs site: [https://docs.brink.trade](https://docs.brink.trade).

## Repo Structure

This repo is structured as follows:

```
guides_repo/
├─ content/
│  ├─ 0_creating-your-first-intent/
│  │  ├─ README.md
│  │  ├─ script.js
│  ├─ 1_another-guide-example/
│  │  ├─ README.md
│  │  ├─ script.js
├─ .gitignore
├─ .env
├─ package.json
```

### Misc Root Files

- `.gitignore` - ignored files and directories, (important: `.env` is ignored)
- `.env` - environment variables needed to run the guide scripts
- `package.json` - node dependencies required for scripts to run

These files are explained more in "Running Guide Scripts" section.

### `/content` Directory

All individual guides are stored in the `/content` directory.

Each guide's source code is contained in it's own sub-folder titled by the guide's slug prefixed by a number (e.g. `/0_creating-your-first-intent`). Every guide directory has a single markdown file (`README.md`) and an optional script file (`script.js`). The `README.md` file contains the guide's content as published on the the [docs site](https://docs.brink.trade/docs). The `script.js` file contains the final code that guide walks the reader through building.

> Each script file is intended to be a standalone script that can be run in the command line. We encourage you to tinker with it, edit it, and run it to gain an understanding of the topics covered in the script's associated guide.

## Running Guide Scripts

Coming soon... :)