express-meme
============
A meme creation API using node.js express & docker.

Run via docker:
1. `docker pull cloughrm/express-meme`
2. `docker run -p 3000:3000 cloughrm/express-meme`


Dev Installation macOS Monterey (12.1)
======================================
1. Install [homebrew](https://brew.sh/)
2. Install [node-canvas](https://www.npmjs.com/package/canvas) `brew install pkg-config cairo pango libpng jpeg giflib librsvg`
3. Install node packages: `npm i`
4. Run in development: `npm run dev`


Dev Installation Ubuntu (20.04)
===============================
1. Install tzdata: `DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata`
2. Install nodejs repo: `curl -sL https://deb.nodesource.com/setup_14.x | bash -`
3. Install the dependancies: `apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev nodejs bash`
4. Install dependancies: `npm i`
5. Run in development: `npm run dev`


Supported Memes & Usage
=======================
Usage: https://localhost:3000/[MEME_NAME]/[TOP_TEXT]/[BOTTOM_TEXT]

Examples:
* [https://meme.pkt.li/philosoraptor/i can haz/memes?](https://meme.pkt.li/philosoraptor/i%20can%20haz/memes%3F)
* [https://meme.pkt.li/scumbag_steve/don't worry bro, i'll pay you/next week](https://meme.pkt.li/scumbag_steve/don't%20worry%20bro,%20i'll%20pay%20you/next%20week)

**Supported Memes:**
* yo_dawg
* success_kid
* socially_awkward_penguin
* socially_awesome_awkward_penguin
* scumbag_steve
* scumbag_brain
* ridiculosly_photogenic_guy
* philosoraptor
* overly_attached_girlfriend
* most_interesting_man
* matrix_morpheus
* lazy_college_senior
* insanity_wolf
* hipster_barista
* grumpy_cat
* good_guy_greg
* foul_bachelor_frog
* forever_alone
* first_world_problems
* confession_bear
* challenge_accepted
* business_cat
* boromir
* bad-joke-eel
* bad_luck_brian
* annoyed_picard
* script_kitty
