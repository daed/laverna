<div align="center">
  <h1>Laverna | The open source note-taking app</h1>

  <h3>🔖  &nbsp;🔏  &nbsp;📄&nbsp;</h3>
  <p><strong>A clean, lightweight alternative to Evernote that keeps your notes encrypted.</strong><br>
    Demo: https://laverna.cc <i> &nbsp;– or –&nbsp; </i> http://laverna.github.io/static-laverna</p>

  [![Build Status](https://travis-ci.org/daed/laverna.svg?branch=dev)](https://travis-ci.org/daed/laverna)
  [![Coverage Status](https://coveralls.io/repos/github/daed/laverna/badge.svg?branch=dev)](https://coveralls.io/github/daed/laverna)
  [![Code Climate](https://codeclimate.com/github/daed/laverna/badges/gpa.svg)](https://codeclimate.com/github/daed/laverna)
  ![Version](https://img.shields.io/badge/Version-1.0.0.beta-orange.svg)

  <h3>
    <a href="https://gitter.im/Laverna/laverna">
      Gitter
    </a>
    <span> | </span>
    <a href="https://webchat.freenode.net/?channels=laverna">
      IRC
    </a>
    <span> | </span>
    <a href="https://github.com/daed/laverna/wiki">
      Wiki
    </a>
    <span> | </span>
    <a href="#developer-install--documentation">
      Contribute
    </a>
  </h3>

  <sub>
    Laverna uses the
    <a href="http://marionettejs.com/">Marionette JS framework</a>,
    <a href="http://gulpjs.com/">Gulp</a> and runs on Node.js. The test runner is <a href="https://github.com/substack/tape">tape</a>
  </sub>
</div>

## Features

* Markdown editor based on Pagedown
* Synchronization with cloud storage via Dropbox or RemoteStorage
* Multiple editing modes: normal, preview, and distraction free
* Offline access to your notes
* WYSIWYG control buttons
* Syntax highlighting, MathJax support
* Robust keyboard shortcuts

<hr>
<img src="https://s3.amazonaws.com/laverna-readme/Screen+Recording+2017-10-16+at+10.10+PM-min.gif">
<hr>

## Security
* [Client-side document encryption](#encryption)
* No registration required. Laverna manages signup/login via security tools built in to all modern browsers.
* By default, Laverna stores notes using the database in your browser (such as indexedDB or localStorage). This means that no data is synced to the cloud without your permission.

## Quick Start (recommended)

* Open [laverna.cc](https://laverna.cc/) and get started in less than 30 seconds.
* No extra steps are required!

## Install Standalone Desktop App (beta)

**NOTE: IF YOU ARE UPGRADING FROM AN OLD VERSION OF LAVERNA, BACKUP EVERYTHING FIRST.  THIS CODE HAS BEEN TESTED BUT MANY THINGS HAVE CHANGED.  DATA LOSS IS POTENTIAL.**

Install a version of laverna from here:

https://github.com/daed/laverna/releases/

### Post installation

None.  Removed the signal server component for the time being.

#### Arch Linux (or derived distributions)

* Install the package [hosted here](https://aur.archlinux.org/packages/laverna/). Once installed, run: `$ pacaur -S laverna`

> *Running into issues with Arch Linux installation? Report [here](https://github.com/funilrys/PKGBUILD/issues/new) or contact [@funilrys](https://github.com/funilrys) on Gitter [here](https://gitter.im/funilrys_/PKGBUILD)*.

### Previous Releases

* All historical releases[ are available here](https://github.com/Laverna/laverna/releases).

## Developer Install & Documentation

Setting up the Laverna development environment only takes a few minutes. To run locally, you need to have the following installed:
* [Node.js version 8.11.4 or 10.9.0](https://nodejs.org/). Laverna works with other previous Node versions, but requires changes to `package.json` and is not recommended.
* [Git](https://git-scm.com/book/en/v2) (note: Windows users need to set the PATH variable for git after installation).
* [Yarn](https://yarnpkg.com/en/) You can use npm but it's not recommended due to inconsistencies observed in the modules installed.


### Part One: Install Laverna

If you're planning to contribute to the project's development, hit the fork button at the top of the page and move on to **step 2**.
<br/>

**1. Clone the Laverna repository:**

```bash
$ git clone git@github.com:daed/laverna.git
```
<br/>

**2. Navigate to project directory and checkout `dev` branch:**

```bash
$ cd laverna

# unless you're patching bugs in the latest release, switch to dev branch:
$ git fetch && git checkout dev
```
<br/>

**3. Install Gulp:**

(yarn instructions coming soon)
```bash
$ npm install gulp
$ npm install -g gulp
```
<br/>

**4. Install dependencies and build:**

```bash
$ yarn
```
- or -
```bash
$ npm run setup
```

<br/>

**5. Start Laverna:**

```bash
$ gulp
```

**6. Point a web broswer to http://localhost:9000**

## Coding Style Guidelines

We ask that you use either **plain JavaScript or the [Marionette.js](http://marionette.js/) framework** (for more details on the preferred coding style see [.editorconfig](https://github.com/Laverna/laverna/blob/master/.editorconfig)). All experimental changes are pushed to the `dev` branch. Feature changes need to be done on either `dev` or a branch that uses `dev` as its parent.

Localizations [are available here.](https://github.com/Laverna/laverna/blob/dev/CONTRIBUTE.md)

## Encryption

**However, in our effort to permanently enhance the application's security**, Laverna is implementing OpenPGP encryption via [OpenPGP.js](https://github.com/openpgpjs/openpgpjs).

## Support Laverna

* Hit the star button on [GitHub](https://github.com/daed/laverna)
* Like us on [alternativeto.net](http://alternativeto.net/software/laverna/)
* Contribute!


## License

Published under [MPL-2.0 License](https://www.mozilla.org/en-US/MPL/2.0/).
Laverna uses a lot of other libraries and each of these [libraries use different licenses](https://github.com/Laverna/laverna/blob/master/bower.json).

[1]: http://bitwiseshiftleft.github.io/sjcl/
[2]: https://github.com/Laverna/laverna/blob/master/bower.json
[3]: http://blockchain.info/address/1Q68HfLjNvWbLFr3KGK6nfXg7vc3hpDr11
[4]: https://www.gittip.com/Laverna/
[5]: http://alternativeto.net/software/laverna/
[6]: https://github.com/Laverna/laverna
[7]: https://github.com/Laverna/laverna/blob/master/CONTRIBUTE.md
[8]: http://nodejs.org
[9]: https://github.com/Laverna/static-laverna/archive/gh-pages.zip
[10]: https://laverna.cc/index.html
[11]: https://www.mozilla.org/en-US/MPL/2.0/
[12]: https://www.bountysource.com/teams/laverna
[13]: https://github.com/Laverna/laverna/releases
[14]: https://git-scm.com/book/en/v2
[15]: https://github.com/Laverna/laverna/wiki
