# Changelog

## [Unreleased]

### Changed
* Refactor test options to always set `createIfMissing` and `errorIfExists` (@ralphtheninja)
* Move `setUp()` function into `test()` (@ralphtheninja)
* Move `openTestDatabase()` calls into `test()` and pass `ctx` to tests (@ralphtheninja)
* Test error after `db.close()` and after `cleanup()` (@ralphtheninja)
* Use `after` in `cleanup()` (@ralphtheninja)
* Use only `readable-stream` from user land (@ralphtheninja)
* Use `^` for devDependencies (@ralphtheninja)
* Switch to plain MIT license (@ralphtheninja)
* Replace `util.inherits` with `inherits` module (@ralphtheninja)
* Replace `this._destroyed` with `this.destroyed` from `Writable` (@ralphtheninja)
* Export single function that creates the stream (@ralphtheninja)
* Flip parameters in `WriteStream` constructor (@ralphtheninja)
* Verify results once using `level-concat-iterator` intead of multiple `db.get()` operations (@ralphtheninja)
* Update README style (@ralphtheninja)

### Added
* Add node 6, 8, 9 and 10 to Travis (@ralphtheninja)
* Add `standard` for linting (@ralphtheninja)
* Test race condition (@vweevers)
* Add `nyc` and `coveralls` (@vweevers)
* Add `CHANGELOG.md` (@ralphtheninja)

### Removed
* Remove node 0.10, 2, 3, 4 and 5 from Travis (@ralphtheninja)
* Remove `contributors` from `package.json` (@ralphtheninja)
* Remove copyright headers from code (@ralphtheninja)
* Remove `this.{writable,readable}` state (@ralphtheninja)
* Remove `this._db.isOpen()` checks (@ralphtheninja)
* Remove patching db from the API (@ralphtheninja)
* Remove encoding options (@ralphtheninja, @vweevers)

### Fixed
* Fix erroneous test on missing type (@ralphtheninja)
* Fix race condition by flushing before finish (@vweevers)
* Fix `_destroy` to emit `'close'` after error (@vweevers)

## [0.1.0] - 2017-04-07

### Changed
* Upgrade `readable-stream` from `~2.0.6` to `^2.2.8` (@mcollina)
* Upgrade `xtend` from `~2.2.1` to `^4.0.0` (@mcollina)

## [0.0.1] - 2016-03-14

### Changed
* Upgrade `readable-stream` from `~1.0.15` to `~2.0.6` (@rvagg, @greenkeeper)
* Use `__dirname` instead of temporary directory (@rvagg)
* Update logo and copyright (@ralphtheninja)

### Added
* Add Travis (@rvagg)

## 0.0.0 - 2013-10-12

:seedling: Initial release.

[Unreleased]: https://github.com/level/level-ws/compare/0.1.0...HEAD
[0.1.0]: https://github.com/level/level-ws/compare/v0.0.1...0.1.0
[0.0.1]: https://github.com/level/level-ws/compare/0.0.0...v0.0.1
