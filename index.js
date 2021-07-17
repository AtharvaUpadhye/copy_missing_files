const path = require("path")
const fs = require("fs")



const ignoreDirs = ["node_modules", ".git"];
const fileEndings = ["mp4", "mp3", "jpg", "jpeg", "JPG", "JPEG"];
const findAllFileTypes = true;

const filesList = dirName => {
  let fileListArr = [[], []];
  fs.readdirSync(dirName).forEach(fName => {
    const fullPath = path.resolve(dirName, fName);
    // console.log(fullPath);
    if (fs.lstatSync(fullPath).isDirectory()) {
      if (!ignoreDirs.includes(fName))
        filesList(fullPath)
    } else {
      if (
        findAllFileTypes
        // || fileEndings.forEach(fe => fName.endsWith(fe))
      ) {
        fileListArr[0].push(fName);
        fileListArr[1].push(fullPath)
      }
    }
  })
  return fileListArr;
}

const searchInSorted = function (destFileNames, srcFileName, i, o) {
  if (i > o) return -1;
  let t = Math.floor((i + o) / 2);
  if (destFileNames[t] === srcFileName) return t;
  if (destFileNames[t] > srcFileName) return searchInSorted(destFileNames, srcFileName, i, t - 1)
  return searchInSorted(destFileNames, srcFileName, t + 1, o)
};

sortDictByKey = (e, s) => {
  dup = e.slice();
  //  console.log(s)
  dup.sort();
  const r = [
    [],
    []
  ];
  return dup.forEach((i => {
    r[0].push(i), r[1].push(s[e.indexOf(i)])
  })), r
}

const fun1 = () => {
  const e = { searchInSorted },
    s = { filesList },
    o = { sortDictByKey },
    c = Date.now();


  let n = path.resolve(process.argv[2]);
  let srcDir = path.resolve(process.argv[2]);
  let p = process.argv[4]
    ? path.resolve(".")
    : path.resolve(process.argv[3]);

  let basePath = process.argv[4]
    ? path.resolve(".")
    : path.resolve(process.argv[3]);

  if ("win32" == process.platform) {
    srcDir = srcDir.replace(/\\/g, "/");
    basePath = basePath.replace(/\\/g, "/");
  }
  // console.log(srcDir);
  copiedFilesDir = path.resolve(basePath, "copied just now"),
    fs.existsSync(copiedFilesDir) || fs.mkdirSync(copiedFilesDir),
    destDirFiles = null == process.argv[4] ?
      s.filesList(basePath) :
      JSON.parse(
        fs.readFileSync(process.argv[4], "utf-8")
      );
  var a = o.sortDictByKey(destDirFiles[0], destDirFiles[1]);
  // console.log(a);
  // console.log(destDirFiles.filePaths);
  srcDirFiles = s.filesList(n);
  // console.log(destDirFiles[1]);
  // console.log(destDirFiles.filePaths);
  // console.log(a[0]),
  for (i = 0; i < srcDirFiles[0].length; i++) {
    index = e.searchInSorted(
      a[0], // sorted filenames
      srcDirFiles[0][i], // source filename
      0, // iterate from
      a[0].length - 1 // iterate to
    );
    if (-1 == index) {
      fs.lstatSync(srcDirFiles[1][i]).isDirectory() || (console.log("NOT found -> \t\t" + srcDirFiles[0][i]),
        fs.copyFileSync(
          srcDirFiles[1][i],
          path.resolve(p, "copied just now",
            srcDirFiles[0][i]),
          fs.constants.COPYFILE_FICLONE
        )
      )
    } else {
      console.log("found ! -> \t\t" + a[0][index]);
    }
  }
  console.log(`Total time taken: ${Date.now() - c}ms`)
}

fun1()