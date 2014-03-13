# Geoportal

[![Build
Status](https://secure.travis-ci.org/scholarslab/geoportal.png)](http://travis-ci.org/scholarslab/geoportal)
[![Code
Climate](https://codeclimate.com/github/scholarslab/geoportal.png)](https://codeclimate.com/github/scholarslab/geoportal)

## Getting Started

This project uses [Sinatra][sinatra] as the backend as well as
[grunt][grunt] to build the front-end application.

To install the dependencies, you will need to run both `bundle install`
and `npm install` in the project directory:

```bash
cd path/to/project
bundle install
npm install
```

If you have [rvm][rvm] installed, the `.rvmrc` script will take care of
this for you.

After you have installed the dependencies, simply fire up the
development environment with `foreman`

```
foreman start
```

### Contributing

* [Fork the project][fork].
* Make your feature addition or bug fix.
* Add tests for it, and make sure all the tests pass. This is important so we don't unknowingly break your changes in a future release. If you're fixing a bug, it helps us to verify that your bug does in fact exist. 
* Commit your changes to your own fork.
* Send us a [pull request][pull], with a clear explanation of the changes. Bonus points for topic branches.


[rvm]: https://rvm.io/
[sinatra]: http://www.sinatrarb.com/
[grunt]: http://gruntjs.com/
[fork]: http://help.github.com/fork-a-repo/
[pull]: http://help.github.com/send-pull-requests/
[license]: LICENSE "LICENSE"
