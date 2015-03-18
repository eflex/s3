# s3

```js
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

/*  success:
  .statusCode == 200

  If successful, will return body, containing Location, Bucket, Key, ETag and size of the object
                
    {
        Location: 'http://Example-Bucket.s3.amazonaws.com/destination.txt',
        Bucket: 'Example-Bucket',
        Key: 'destination.txt',
        ETag: '"3858f62230ac3c915f300c664312c11f-9"',
        size: 7242880
    }


  note:
  for more information check
  https://github.com/LearnBoost/knox
 */
```
