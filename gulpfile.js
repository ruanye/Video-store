/**
 * Created by yanghc on 2016/01/01.
 */
var gulp = require('gulp');
var sass = require('gulp-sass'); // 编译 SASS
var sourcemaps = require('gulp-sourcemaps');
var prefixer = require('gulp-autoprefixer'); //自动添加浏览器前缀
var minifyCss = require('gulp-minify-css'); //压缩css文件,并给引用url添加版本号避免缓存
var uglify = require('gulp-uglify'); //压缩js文件 使用gulp-uglify压缩javascript文件，减小文件大小。
var runSequence = require('gulp-run-sequence');
var copy = require('gulp-copy');
var cssBase64 = require('gulp-css-base64'); //将CSS中引入的图片转换为Base64编码格式
var browsersync = require('browser-sync').create();
var mock = require('mockjs');
var babel = require("gulp-babel"); //转换代码为ES6最新语法形式
var csslint = require('gulp-csslint'); //检查css有无报错或警告
var jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'); //检查js有无报错或警告
//引入PostCss
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem'); //px转换成rem
//加版本号
var md5 = require("gulp-md5-plus");
var clean = require('gulp-clean');



var DEVELOPMENT = true;
var argvs = process.argv.slice(3);
var projectName = argvs[0].slice(2);
var port = argvs[1] && argvs[1].slice(2) || 8080;
var basePath = './' + projectName;
var srcPath = basePath + '/src';
var buildPath = basePath + '/build';
var dataTpl = require(srcPath + '/data');
var config = require(srcPath + '/config');

var createResData = function(data, status, msg) {
    return {
        msg: msg || '',
        status: status || 200,
        data: data || null
    }
}

/**************************** server ****************************/
gulp.task('server', ['sass', 'jslint', 'babel'], function() {
    browsersync.init({
        server: {
            baseDir: srcPath,
            middleware: [

                function(req, res, next) {
                    var reg = /(?:^.+\/)*([^\.]+)\.json$/,
                        data, tpl;
                    if (DEVELOPMENT && reg.test(req.originalUrl)) {
                        data = createResData(mock.mock(dataTpl[RegExp.$1.replace('/', '')]));
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(data));
                    } else {
                        next();
                    }
                }
            ]
        },
        port: port
        //files:'./**/*.*'
    });

    gulp.watch(srcPath + '/sass/*.scss', ['sass']);
    //gulp.watch(srcPath+'/css/**/*.css', ['csslint']);
    //gulp.watch(srcPath+'/css/**/*.css', ['px2rem']);
    gulp.watch(srcPath + '/es6/**/*.js', ['babel']);
    gulp.watch(srcPath + '/js/**/*.js', ['jslint']);
    gulp.watch(srcPath + "/*.html").on('change', browsersync.reload);
});

gulp.task('sass', function() {
    gulp.src(srcPath + '/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(prefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        })) /* 自动配置兼容性的前缀 */
        .pipe(sass().on('error', sass.logError))
        // .pipe(cssBase64({
        //     maxWeightResource: 10
        // })) //将图片转换为base64格式
    .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(srcPath + '/css'))
        .pipe(browsersync.stream({
            match: '**/*.css'
        }))
});
gulp.task('watch', function() {
    gulp.watch(srcPath + '/sass/*.scss', ['sass']);
});

//转换代码为ES6最新语法形式
gulp.task('babel', function() {
    gulp.src(srcPath + '/es6/**/*.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-runtime']
        }))
        .pipe(gulp.dest(srcPath + '/js'))
        .pipe(browsersync.stream({
            match: '**/*.js'
        }));
});

gulp.task('watch', function() {
    gulp.watch(srcPath + '/js/**/*.js', ['babel']);
});

//将px转换成rem

// gulp.task('px2rem', function() {
//     var processors = [
//         px2rem({
//             remUnit: 64    //此处在开发的时候需要 根据设计图的实际尺寸修改 例: 640px 的设计图宽 值为:64 , 750px 的设计图宽 值为:75
//         })
//     ];
//     return gulp.src(srcPath+'/css/**/*.css')
//         .pipe(postcss(processors))
//         .pipe(gulp.dest(srcPath+'/css'));
// });
// gulp.task('watch', function(){
//     gulp.watch(srcPath+'/css/**/*.css', ['px2rem']);
// });



// 检查js
gulp.task('jslint', function() {
    gulp.src(srcPath + '/js/**/*.js')
        .pipe(jshint({
            "undef": false,
            "unused": false
        }))
    //.pipe(jshint.reporter('default'))  //错误默认提示
    .pipe(jshint.reporter(stylish)); //高亮提示
    //.pipe(jshint.reporter('fail'));
});
gulp.task('watch', function() {
    gulp.watch(srcPath + '/js/**/*.js', ['jslint']);
});


/************************** build ****************************/
/**clean**/
gulp.task('clean', function() {
    gulp.src(buildPath)
        .pipe(clean());
})

/** otf2ttf **/
gulp.task('otf2ttf', [], function() {
    return gulp.src(buildPath + '/css/fonts/*.otf')
        .pipe(otf2ttf())
        .pipe(gulp.dest(function(file) {
            return "build/css/fonts/" + file.data.fontName
        }));
});

/**copy**/
var vendorJS = config.vendorJS.map(function(js) {
        return srcPath + '/' + js
    }),
    vendorCSS = config.vendorCSS.map(function(css) {
        return srcPath + '/' + css
    }),
    copyFiles = vendorJS.concat(vendorCSS).concat([srcPath + '/**/*.html',srcPath + '/css/**/*.css', srcPath + '/js/**/*.js']);
gulp.task('copy', ['sass'], function() {
    return gulp.src(copyFiles)
        .pipe(copy(buildPath, {
            prefix: 2
        }));
});

/** compress **/
gulp.task('compress', ['compress:css', 'compress:js']);
//压缩图片
// gulp.task('compress:images', function () {
//     return gulp.src(buildPath+'/images/**/*.{png,jpg,gif,ico}',{base:buildPath})
//         .pipe(imagemin({
//             optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
//             progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
//             interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
//             multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
//         }))
//         .pipe(gulp.dest(buildPath));
// });
//压缩CSS
gulp.task('compress:css', function() {
    return gulp.src(buildPath + '/css/**/*.css', {
            base: buildPath
        })
        .pipe(clean())
        .pipe(minifyCss())
        .pipe(md5(5, buildPath + '/*.html'))
        .pipe(gulp.dest(buildPath));
});
//图片加md5
gulp.task('img', function() {
    var imgSrc = srcPath + '/images/**',
        quoteSrc = buildPath + '/css/**/*.css', 
        quooteSrc = buildPath + '/*.html',
        imgDst = buildPath + '/images';
    return gulp.src(imgSrc)
        .pipe(md5(10, [quoteSrc,quooteSrc]))
        .pipe(gulp.dest(imgDst));
});


//压缩JS
gulp.task('compress:js', function() {
    return gulp.src(buildPath + '/js/**/*.js', {
            base: buildPath
        })
        .pipe(clean())
        .pipe(uglify())
        .pipe(md5(5, buildPath + '/*.html'))
        .pipe(gulp.dest(buildPath));
});

/**build**/
gulp.task('build', function() {
    runSequence('clean', 'copy', 'compress', 'img');
});