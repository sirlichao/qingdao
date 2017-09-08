// 引入gulp
var gulp = require('gulp'),
    // 合并文件
    concat = require('gulp-concat'),
    // 转换 less 为 css
    less = require('gulp-less'),
    // px 转 rem
    postcss = require('gulp-postcss'),
    px2rem = require('postcss-px2rem'),
    // 压缩图片文件
    imagemin = require('gulp-imagemin'),
    // 压缩css文件
    cssmin = require('gulp-clean-css'),
    // 压缩js文件
    uglify = require('gulp-uglify'),
    // 文件更名
    rename = require('gulp-rename'),
    // CSS 前缀自动补全
    autoprefixer = require('gulp-autoprefixer'),
    // 控制台输出成功失败描述
    notify = require('gulp-notify'),
    // 文件livereload同步
    connect = require('gulp-connect'),
    // html插入includer文件
    contentIncluder = require('gulp-content-includer'),
    // 错误处理
    plumber = require('gulp-plumber');

// webserver 服务设置
gulp.task('server', function() {
    connect.server({
        root: './dist',
        livereload: true,
        host: "0.0.0.0",
        port: 8088
    });
});

// 基础组件文件目录 ---------
var componentsLessSrc = './src/components/*/**/*.less';
var componentsCssDist = './dist/style';
var componentsHtmlSrc = './src/components/**/*.html';
var componentsHtmlDist = './dist/components';
var componentsImgSrc = './src/components/*/*/*.{png,jpg,gif,ico,svg}';
var componentsImgDist = './dist/img/';

// 定义公共文件目录 ---------
var lessSrc = './src/style/*.less';
var cssDist = './dist/style';
var jsSrc = './src/js/**/*.js';
var jsDist = './dist/js';
var imgSrc = './src/img/**/*.{png,jpg,gif,ico,svg}';
var imgDist = './dist/img/';
var fontSrc = './src/font/';
var fontDist = './dist/';

// 定义示例DOME样式文件 ---------
var sampleLessSrc = './src/style/sample/*.less';
var sampleCssDist = './dist/style/sample';

// 定义交易页面文件目录 ---------
var pageHtmlSrc = './src/page/**/*.html';
var pageHtmlDist = './dist/page';

// 定义首页、模板文件目录
var templedHmtlSrc = './src/templet/*.html';
var indexHmtlSrc = './src/index.html';
var indexHmtlDist = './dist';

// 定义PX转换REM基础值
var processors = [px2rem({ remUnit: 64 })];

// 组件样式转换
gulp.task('components_less2css', function() {
    return gulp.src(componentsLessSrc)
        // 错误处理
        .pipe(plumber())
        // less编译
        .pipe(less())
        // PX转REM
        .pipe(postcss(processors))
        // 定义CSS前缀补全及美化
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        // 合并文件
        .pipe(concat('components.css'))
        // 压缩css 
        // .pipe(cssmin())
        // 文件更名
        .pipe(rename({ suffix: '.min' }))
        // 文件输出
        .pipe(gulp.dest(componentsCssDist))
        .pipe(connect.reload());
});
// 公共样式转换
gulp.task('public_less2css', function() {
    return gulp.src(lessSrc)
        // 错误处理
        .pipe(plumber())
        // less编译
        .pipe(less())
        // PX转REM
        .pipe(postcss(processors))
        // 定义CSS前缀补全及美化
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        // 压缩css 
        .pipe(cssmin())
        // 文件输出
        .pipe(gulp.dest(cssDist))
        .pipe(connect.reload());
});
// 样例DEMO样式转换
gulp.task('sample_less2css', function() {
    return gulp.src(sampleLessSrc)
        // 错误处理
        .pipe(plumber())
        // less编译
        .pipe(less())
        // PX转REM
        // .pipe(postcss(processors))
        // 定义CSS前缀补全及美化
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        // 压缩css 
        .pipe(cssmin())
        // 文件输出
        .pipe(gulp.dest(sampleCssDist))
        .pipe(connect.reload());
});
// 组件图片优化
gulp.task('componentsImgMin', function() {
    return gulp.src(componentsImgSrc)
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        // 减除img目录
        .pipe(rename(function (path) {
           path.dirname = path.dirname.replace('/image', '') 
        }))
        .pipe(gulp.dest(componentsImgDist))
        .pipe(connect.reload());
});

// 公共图片优化
gulp.task('imgMin', function() {
    return gulp.src(imgSrc)
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest(imgDist))
        .pipe(connect.reload());
});

// 公共js文件压缩
gulp.task('js', function() {
    return gulp.src(jsSrc)
        .pipe(uglify())
        .pipe(gulp.dest(jsDist))
        // .pipe(notify({ message: 'JS 压缩合并成功！' }))
        .pipe(connect.reload());
});

// 公共字体任务
gulp.task('font', function() {
    return gulp.src(fontSrc)
        .pipe(gulp.dest(fontDist))
        .pipe(connect.reload());

});

// 定义组件html任务
gulp.task('componentsHtml', function() {
    return gulp.src(componentsHtmlSrc)
        .pipe(contentIncluder({
            includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(gulp.dest(componentsHtmlDist))
        .pipe(connect.reload());

});

// 定义交易html任务
gulp.task('pageHtml', function() {
    return gulp.src(pageHtmlSrc)
        .pipe(contentIncluder({
            includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(gulp.dest(pageHtmlDist))
        .pipe(connect.reload());

});

// 定义首页html任务
gulp.task('indexHtml', function() {
    return gulp.src(indexHmtlSrc)
        .pipe(gulp.dest(indexHmtlDist))
        .pipe(connect.reload());

});

// 定义自动看守任务
gulp.task('auto', function() {
    gulp.watch(componentsLessSrc, ['components_less2css']);
    gulp.watch(componentsHtmlSrc, ['componentsHtml']);
    gulp.watch(componentsImgSrc, ['componentsImgMin']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch(imgSrc, ['imgMin']);
    gulp.watch(fontSrc, ['font']);
    gulp.watch(lessSrc, ['public_less2css']);
    gulp.watch(sampleLessSrc, ['sample_less2css']);
    gulp.watch(pageHtmlSrc, ['pageHtml']);
    gulp.watch(templedHmtlSrc, ['componentsHtml', 'pageHtml']);
    gulp.watch(indexHmtlSrc, ['indexHtml']);
});

// 定义默认任务
gulp.task('default', ['components_less2css', 'public_less2css', 'sample_less2css', 'componentsImgMin', 'imgMin', 'js', 'font', 'componentsHtml', 'pageHtml', 'indexHtml', 'server', 'auto']);