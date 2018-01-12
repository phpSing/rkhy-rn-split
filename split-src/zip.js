const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const _ = require('lodash')

// const zlib = require('zlib');
// const gzip = zlib.createGzip();

const splitRoot = '../iosBundleSplit/bundle-output/split'
const zipRoot = '../iosSplitZip/'

//解析需要遍历的文件夹，我这以E盘根目录为例  
var filePath = path.resolve(splitRoot);
//调用文件遍历方法  
fileDisplay(filePath)  
/** 
 * 文件遍历方法 
 * @param filePath 需要遍历的文件路径 
 */  
function fileDisplay(filePath){  
    //根据文件路径读取文件，返回文件列表  
    fs.readdir(filePath, function(err,files){  
        if(err){  
            console.warn(err)  
        }else{  
            //遍历读取到的文件列表  
            files.forEach(function(filename){  
                //获取当前文件的绝对路径  
                var filedir = path.join(filePath,filename);  
                //根据文件路径获取文件信息，返回一个fs.Stats对象  
                fs.stat(filedir,function(eror,stats){  
                    if(eror){  
                        console.warn('获取文件stats失败');  
                    }else{  
                        var isFile = stats.isFile();//是文件  
                        var isDir = stats.isDirectory();//是文件夹  
                        if(isFile){ 
                            // console.log(filedir.split('/'));  
                        }  
                        if(isDir){
                          const dirArray = filedir.split('/')
                          const thisDir = _.last(dirArray)
                          const parentDir = _.nth(dirArray, [-2])
                          if (parentDir == 'split') {                             // 是自定义业务组件 // 单独打包
                            // 上级是split 这个级别作为zip名
                            // const zipDir = `${zipRoot}${thisDir}/`
                            console.log('thisDir is zippable...', filedir, ' zip into ', zipRoot)
                            const cmd = `bestzip ${zipRoot}${thisDir}.zip ${filedir}`
                            if (!shell.which('bestzip')) {
                              shell.echo('Sorry, this script requires bestzip');
                              shell.exit(1);
                            }
                            shell.exec(cmd)              
                          }
                          fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
                        }  
                    }  
                })  
            });  
        }  
    });  
}  

