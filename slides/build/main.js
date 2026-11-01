// SO-ARM101 교재 PPT 생성
// 사용법: (slides/build 폴더에서) npm install → node main.js [출력파일.pptx]
const L = require('./lib.js');
require('./part1.js');
require('./part2.js');
const out = process.argv[2] || '../SO-ARM101_LeRobot_윈도우실습_전체.pptx';
L.pres.writeFile({ fileName: out }).then(() => console.log('저장 완료:', out, '/', L.pres.slides.length, '장'));
