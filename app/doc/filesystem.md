# File providers
This is a set of class and functions to provide operations with any filesystem (localy or on server).

## Functions
* `listFiles(path, allowedExtensions)` - function provides tree of files in specified `path`. It returns object, that contains hierarchy. For example:
```js
{
    is_dir: true,
    name: "kb",
    fullpath: "d:/github/kb"
    files: [
      {
        is_dir: true,
        name: "src",
        fullpath: "d:/github/kb/src"
        files: [{}, ...]
      },
      {
        is_dir: false,
        name: "test.scs",
        fullpath: "d:/github/kb/src/test.scs"
      }
    ]
}
```
where:
 * `is_dir` - flag that equal to `true` for directories and `false` for a files
 * `name` - name of file (directory) that would be displayed. Shouldn't contains path, just simple name of file with extension: `file.ext`
 * `fullpath` - absolute path to a file on filesystem
 * `files` - this field exists just for a directories and contains array of child files/directories objects
