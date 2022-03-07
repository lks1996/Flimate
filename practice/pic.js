const testFolder = './src';
const fs = require('fs');



fs.readdir(testFolder, function(err, fileList){
  console.log(fileList);
})
