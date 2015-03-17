/**
  Example:
  var S3=require('s3');

	var config={
		key:'your_key',
		secret:'your_secret',
		bucket:'your_bucket'
	}

  var s3 = new S3(config);

  var result = yield s3.upload(src, dest);
  var result = yield s3.upload_stream(readable_stream, dest);

  // return file in the browser
  var file = yield s3.download(file_name);
  this.type = path.extname(file_name);
  this.body = file;

  var result = yield s3.delete(location)

  // success:
  .statusCode == 200

  // If successful, will return body, containing Location, Bucket, Key, ETag and size of the object
                
    {
        Location: 'http://Example-Bucket.s3.amazonaws.com/destination.txt',
        Bucket: 'Example-Bucket',
        Key: 'destination.txt',
        ETag: '"3858f62230ac3c915f300c664312c11f-9"',
        size: 7242880
    }


  *note:
    for more information check
      https://github.com/LearnBoost/knox

*/

var fs = require('fs');
var stream = require('stream');
var knox = require('knox');
var knox_mpu = require('knox-mpu');
var mime = require('mime');
var rawBody = require('raw-body');


var S3 = module.exports = function(config){
  if(!(this instanceof S3)) return new S3(config);

  this.s3_client = knox.createClient({
    key: config.key,
    secret: config.secret,
    bucket: config.bucket
  })
}

S3.prototype.upload = function(src, dest){
  if(!(src instanceof stream.Readable)) src = fs.createReadStream(src);

  var client = this.s3_client;
  return function(cb){
        new knox_mpu({client: client, objectName: dest, stream: src},cb);
  }
}

S3.prototype.upload_stream = function(readable_stream, dest){
  var client = this.s3_client;
  return function(cb){
      new knox_mpu({client: client, objectName: dest, stream: readable_stream},cb);
  }
}

/**
  return a readable stream
*/
S3.prototype.download = function(file_name){
  var client = this.s3_client;
  return function(cb){
    client.getFile(file_name, cb);
  }
}

S3.prototype.delete = function(file_name){
  var client = this.s3_client;
  return function(cb){
    if(file_name instanceof Array){
      client.deleteMultiple(file_name, cb);
    }else{
      client.deleteFile(file_name, cb);
    }

  }
}
