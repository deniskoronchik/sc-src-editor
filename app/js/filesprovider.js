const FileSystem = require('fs');
const Path = require('path');

function compare_items(a, b) {
  if (a.is_dir && !b.is_dir) {
    return -1;
  }

  if (!a.is_dir && b.is_dir) {
    return 1;
  }

  if (a.name < b.name) {
    return -1;
  }

  if (a.name > b.name) {
    return 1;
  }

  return 0;
}

function FSFileProvider(list_path, allowedExtensions) {

  if (!allowedExtensions ||
      Object.prototype.toString.call(allowedExtensions) !== '[object Array]' ||
      allowedExtensions.length === 0)
  {
    allowedExtensions = ['*'];
  }

  function listFilesRecursive(path, root_obj, root_path) {

    var stat_info = FileSystem.statSync(path);
    var name = null;
    if (!root_path) {
      name = path;
    } else {
      name = Path.basename(path);
    }

    var item_obj = {
      name: name,
      fullpath: path
    }

    if (stat_info.isDirectory()) {  // directory
      item_obj["is_dir"] = true;
      item_obj["files"] = [];

      // read directory
      var files = FileSystem.readdirSync(path);
      for (var i = 0; i < files.length; ++i) {
        var file_path = Path.normalize(Path.join(path, files[i]));
        listFilesRecursive(file_path, item_obj, path);
      }

    } else if (stat_info.isFile()) { // file
      /// TODO: support allowedExtensions
      item_obj["is_dir"] = false;
    }

    if (!root_obj) {
      root_obj = item_obj;
    } else {
      root_obj.files.push(item_obj);
    }

    // sort childs (directories first)
    if (item_obj.files) {
      item_obj.files.sort(compare_items);
    }

    return root_obj;
  }

  return {
    list: function() {
      return listFilesRecursive(list_path, null);
    }
  };
}

/* Each function return hierarchy of file objects.
 * {
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
 */

module.exports = {
    list: function(path, allowedExtensions) {
      /// TODO: add ssupport of other protocols
      var fp = new FSFileProvider(path);
      return fp.list();
    }
}
