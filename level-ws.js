var Writable = require('readable-stream').Writable
var inherits = require('inherits')

var defaultOptions = { type: 'put' }

function WriteStream (db, options) {
  if (!(this instanceof WriteStream)) {
    return new WriteStream(db, options)
  }

  options = Object.assign({}, defaultOptions, options)

  Writable.call(this, {
    objectMode: true,
    highWaterMark: options.highWaterMark || 16
  })

  this._options = options
  this._db = db
  this._buffer = []
  this._flushing = false
  this._maxBufferLength = options.maxBufferLength || Infinity

  var self = this

  this.on('finish', function () {
    self.emit('close')
  })
}

inherits(WriteStream, Writable)

WriteStream.prototype._write = function (data, enc, next) {
  var self = this
  if (self.destroyed) return

  if (!self._flushing) {
    self._flushing = true
    process.nextTick(function () { self._flush() })
  }

  if (self._buffer.length >= self._maxBufferLength) {
    self.once('_flush', function (err) {
      if (err) return self.destroy(err)
      self._write(data, enc, next)
    })
  } else {
    self._buffer.push(Object.assign({}, { type: self._options.type }, data))
    next()
  }
}

WriteStream.prototype._flush = function () {
  var self = this
  var buffer = self._buffer

  if (self.destroyed) return

  self._buffer = []
  self._db.batch(buffer, cb)

  function cb (err) {
    self._flushing = false

    if (!self.emit('_flush', err) && err) {
      // There was no _flush listener.
      self.destroy(err)
    }
  }
}

WriteStream.prototype._final = function (cb) {
  var self = this

  if (this._flushing) {
    // Wait for scheduled or in-progress _flush()
    this.once('_flush', function (err) {
      if (err) return cb(err)

      // There could be additional buffered writes
      self._final(cb)
    })
  } else if (this._buffer && this._buffer.length) {
    this.once('_flush', cb)
    this._flush()
  } else {
    cb()
  }
}

WriteStream.prototype._destroy = function (err, cb) {
  var self = this

  this._buffer = null
  cb(err)

  // TODO when the next readable-stream (mirroring node v10) is out:
  // remove this. Since nodejs/node#19836, streams always emit close.
  process.nextTick(function () {
    self.emit('close')
  })
}

module.exports = WriteStream
