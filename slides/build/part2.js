const L=require('./lib.js'); const {pres,P,X,CW,R,T,card,pill,circleNum,band,newSlide,content,code,steps,table,cards,chapter}=L;
const CAM=global.CAM;
const REC='lerobot-record --robot.type=so101_follower --robot.port=COM3 --robot.id=my_follower --robot.cameras="'+CAM+'" --teleop.type=so101_leader --teleop.port=COM4 --teleop.id=my_leader --display_data=true ';

// ================= CH05 =================
chapter('05','조립',['번호를 붙인 모터를 올바른 자리에 넣어 두 팔을 완성한다','나사 두 종류(M2×6, M3×6)를 구분해서 쓴다'],'조립은 글보다 눈으로 보는 게 빠르다. Hugging Face 공식 문서의 관절별 짧은 영상을 한 번 끝까지 본 뒤, 다시 틀어 놓고 멈춰 가며 따라 한다.','조립 완성품은 건너뜀');
{ const s=content('01','시작 전 준비');
  cards(s,X,3.0,CW,[{num:'1',t:'나사 구분',d:'가장 작은 M2×6 = 모터를 몸체에 고정\n조금 굵은 M3×6 = 혼·부품 연결'},{num:'2',t:'서포트 제거',d:'3D 프린팅 부품의 지지대 찌꺼기를 작은 일자 드라이버로 떼어 낸다'},{num:'3',t:'케이블 먼저',d:'모터를 넣은 뒤 다음 단계 전에 3핀 케이블을 미리 꽂아 둔다'},{num:'4',t:'모터 혼',d:'위쪽 혼은 M3×6 나사로 고정, 아래쪽 혼은 나사 없이 끼우기만',hi:true}],4,4.0,{dfs:20,tfs:26});
  s.addNotes('나중에 손이 안 들어가는 문제를 피하려면 케이블을 미리 꽂는다.'); }
{ const s=content('02','관절별 조립 순서','공식 문서 요약 — 관절마다 영상 링크는 교재 05_조립.md');
  table(s,X,2.95,CW,[0.2,0.8],['단계','핵심 작업'],[
   ['Joint 1 어깨 회전','혼 2개 → 1번 모터를 베이스에 넣고 M2×6 4개 → 모터 홀더 M2×6 2개 → 어깨 부품 위·아래 M3×6 4개씩 → 어깨 모터 홀더'],
   ['Joint 2 어깨 들기','혼 2개 → 2번 모터를 위에서 밀어 넣기 → M2×6 4개 → 윗팔을 양쪽 M3×6 4개씩'],
   ['Joint 3 팔꿈치','혼 2개 → 3번 모터 넣고 M2×6 4개 → 아랫팔을 양쪽 M3×6 4개씩'],
   ['Joint 4 손목 굽힘','혼 2개 → 모터 홀더 4 끼우기 → 4번 모터 넣기 → M2×6 4개'],
   ['Joint 5 손목 회전','5번 모터를 손목 홀더에 넣고 앞쪽 M2×6 2개 → 혼은 1개만(M3×6) → 손목을 4번 모터에 양쪽 M3×6 4개씩'],
   ['Gripper (팔로워)','그리퍼를 5번 혼에 M3×6 4개 → 6번 모터 양쪽 M2×6 2개씩 → 혼 2개 → 집게 발 양쪽 M3×6 4개씩'],
   ['Handle (리더)','리더 홀더를 손목에 M3×6 4개 → 손잡이 M2×6 1개 → 6번 모터 M2×6 2개씩, 혼 M3×6 → 트리거 M3×6 4개']],{fs:16});
  s.addNotes('영상: huggingface.co/docs/lerobot/so101'); }
{ const s=content('03','마무리 배선');
  steps(s,X,3.0,10.8,['모터끼리 3핀 케이블로 1 → 2 → … → 6 차례로 연결','1번 모터(shoulder_pan) 케이블을 제어 보드에 연결','제어 보드를 팔 베이스에 고정','각 관절을 끝까지 돌려 보며 케이블이 끼지 않는지 확인'],{fs:23,gap:0.45});
  const rx=12.6,rw=R-rx; card(s,rx,3.0,rw,5.0,P.white,P.lav); T(s,'추가 자료',{x:rx+0.5,y:3.4,w:rw-1,h:0.55,fontSize:22,bold:true,color:P.purple});
  T(s,'부품 목록·3D 프린팅 파일\ngithub.com/TheRobotStudio/SO-ARM100\n\n공식 조립 문서(영상)\nhuggingface.co/docs/lerobot/so101',{x:rx+0.5,y:4.1,w:rw-1,h:3.6,fontSize:18});
  band(s,8.6,'주의','나사를 너무 세게 조이지 않는다. 3D 프린팅 플라스틱은 나사산이 쉽게 뭉개진다');
  T(s,'전원을 넣기 전에 손으로 모든 관절을 천천히 움직여 걸리는 곳이 없는지 확인한다',{x:X,y:9.6,w:CW,h:0.6,fontSize:20,color:P.muted});
  s.addNotes('남는 나사가 있으면 어디서 빠졌는지 확인한다.'); }

// ================= CH06 =================
chapter('06','캘리브레이션',['두 팔을 캘리브레이션해 같은 자세 = 같은 숫자로 만든다','캘리브레이션 파일 위치를 알고 다시 할 수 있다'],'모터는 각도를 0~4095 숫자로 알려 주는데, 조립 방향에 따라 같은 자세에서도 숫자가 다르다. 캘리브레이션은 "이 자세가 가운데고, 여기까지가 범위야"라고 알려 주는 영점 맞추기다.');
{ const s=content('01','팔로워암 캘리브레이션');
  code(s,X,3.0,CW,['lerobot-calibrate --robot.type=so101_follower --robot.port=COM3 --robot.id=my_follower'],{fs:21});
  table(s,X,4.4,CW,[0.32,0.68],['옵션','뜻'],[['`--robot.type=so101_follower`','SO-101 팔로워암 설정을 쓴다'],['`--robot.port=COM3`','챕터 03에서 찾은 팔로워 포트로 바꾼다'],['`--robot.id=my_follower`','이 팔의 이름. 캘리브레이션 결과가 이 이름의 파일로 저장된다']],{fs:20});
  band(s,7.6,'주의','이름(id)은 한번 정하면 바꾸지 않는다. 이후 챕터에서도 똑같은 이름이어야 이 파일을 찾아 쓴다');
  s.addNotes('공식 캘리브레이션 영상을 먼저 보여 준다.'); }
{ const s=content('02','진행 순서','모터 힘이 풀려 손으로 팔을 움직일 수 있다');
  const w=(CW-0.4)/2;
  card(s,X,3.0,w,6.0,P.white,P.lav); circleNum(s,X+0.5,3.4,0.8,1); T(s,'가운데 자세 만들기',{x:X+1.55,y:3.45,w:w-2,h:0.7,fontSize:28,bold:true});
  code(s,X+0.5,4.5,w-1,['Move my_follower SOFollower to the middle of its range of motion and press ENTER....'],{fs:15,colors:[P.orange]});
  T(s,'모든 관절을 각자 움직일 수 있는 범위의 가운데쯤에 놓는다. 그리퍼는 반쯤 벌린다. 자세를 잡고 Enter',{x:X+0.5,y:5.9,w:w-1,h:2.0,fontSize:21});
  const x2=X+w+0.4; card(s,x2,3.0,w,6.0,P.purple); circleNum(s,x2+0.5,3.4,0.8,2,P.white,P.purple); T(s,'관절을 끝에서 끝까지',{x:x2+1.55,y:3.45,w:w-2,h:0.7,fontSize:28,bold:true,color:P.white});
  code(s,x2+0.5,4.5,w-1,['NAME            |    MIN |    POS |    MAX','shoulder_pan    |   1023 |   2047 |   3071'],{fs:15});
  T(s,'관절을 하나씩 천천히, 끝까지 양쪽으로 돌린다. MIN·MAX가 넓어지는 게 보인다. wrist_roll은 자동(0~4095)이라 안 움직여도 된다. 다 하면 Enter',{x:x2+0.5,y:5.9,w:w-1,h:2.6,fontSize:21,color:P.white});
  band(s,9.4,'성공','Calibration saved to ...\\my_follower.json 이 나오면 끝. 끝까지 움직일 때 억지로 힘을 주지 않는다');
  s.addNotes('Some motors have the same min and max values 오류는 어떤 관절을 하나도 안 움직인 것이다.'); }
{ const s=content('03','리더암 캘리브레이션','진행 방법은 팔로워와 똑같다');
  code(s,X,3.0,CW,['lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM4 --teleop.id=my_leader'],{fs:21});
  card(s,X,4.5,CW,2.6,P.white,P.lav); T(s,'💡 두 팔을 나란히',{x:X+0.5,y:4.85,w:CW-1,h:0.55,fontSize:22,bold:true,color:P.purple});
  T(s,'두 팔의 "가운데 자세"를 최대한 똑같이 잡을수록 원격조작이 자연스럽다. 두 팔을 나란히 놓고 같은 모양을 만든 뒤 진행한다.',{x:X+0.5,y:5.5,w:CW-1,h:1.3,fontSize:21});
  s.addNotes('리더는 teleop 으로 부른다.'); }
{ const s=content('04','캘리브레이션 파일은 어디에?');
  table(s,X,3.0,CW,[0.15,0.85],['팔','저장 위치'],[['팔로워','`%USERPROFILE%\\.cache\\huggingface\\lerobot\\calibration\\robots\\so_follower\\my_follower.json`'],['리더','`%USERPROFILE%\\.cache\\huggingface\\lerobot\\calibration\\teleoperators\\so_leader\\my_leader.json`']],{fs:18});
  T(s,'파일 탐색기 주소창에 붙여넣으면 폴더가 바로 열린다',{x:X,y:5.4,w:CW,h:0.5,fontSize:21,bold:true,color:P.purple});
  code(s,X,6.0,CW,['%USERPROFILE%\\.cache\\huggingface\\lerobot\\calibration'],{fs:20});
  T(s,'JSON 파일을 메모장으로 열면 관절마다 homing_offset(0점 보정값), range_min, range_max 가 있다. 방금 손으로 움직여 기록한 숫자들이다',{x:X,y:7.3,w:CW,h:1.0,fontSize:20,color:P.muted});
  s.addNotes('%USERPROFILE% 은 C:\\Users\\내이름 이다.'); }
{ const s=content('05','다시 캘리브레이션하고 싶다면','같은 명령을 다시 실행하면 이렇게 묻는다');
  code(s,X,3.0,CW,['Press ENTER to use provided calibration file associated with the id my_follower, or type \'c\' and press ENTER to run calibration:'],{fs:18,colors:[P.orange]});
  cards(s,X,4.6,CW,[{tag:'그냥 Enter',t:'저장된 파일 사용',d:'평소에는 이것'},{tag:'c 입력 후 Enter',t:'처음부터 새로',d:'팔로워가 한쪽으로 치우치거나 리더와 각도가 다를 때 두 팔 모두',hi:true}],2,3.2,{dfs:20,tfs:28});
  s.addNotes('원격조작이 이상하면 두 팔 모두 다시 캘리브레이션한다.'); }
{ const s=content('06','오류가 나면');
  table(s,X,3.0,CW,[0.4,0.6],['오류','해결'],[['Magnitude 30841 exceeds 2047 ...','전원 어댑터를 뽑았다 다시 꽂고 재시도. 계속되면 해당 모터 ID·중앙값 재설정 (Juxi FAQ)'],["Motor 'gripper' was not found",'모터 케이블 연결과 전원 전압 확인'],['There is no status packet!','해당 팔의 전원과 모터 데이터선 확인'],['Some motors have the same min and max values','어떤 관절을 안 움직였다. 다시 실행해 5개 관절 모두 끝까지']],{fs:20});
  s.addNotes('더 많은 오류는 챕터 12.'); }

// ================= CH07 =================
chapter('07','원격조작',['리더암을 움직이면 팔로워암이 똑같이 따라 한다','프로그램을 안전하게 시작하고 멈출 수 있다'],'프로그램이 1초에 약 60번씩 리더암 6개 모터의 각도를 읽어서 팔로워암에 그대로 보낸다. 캘리브레이션 덕분에 숫자의 의미가 같아서 같은 자세가 된다. 9장의 시범도 이 방식으로 만든다.');
{ const s=content('01','실행 전 안전 확인');
  cards(s,X,3.0,CW,[{num:'1',t:'40cm 비우기',d:'팔로워암 주변에 물건과 사람 손이 없다'},{num:'2',t:'두 팔 자세 맞추기',d:'자세가 크게 다르면 시작하는 순간 팔로워가 확 움직인다',hi:true},{num:'3',t:'연결 확인',d:'두 팔 전원과 USB가 연결되어 있다'}],3,3.6,{dfs:21,tfs:28});
  s.addNotes('2번이 가장 중요하다.'); }
{ const s=content('02','실행');
  code(s,X,3.0,CW,['lerobot-teleoperate --robot.type=so101_follower --robot.port=COM3 --robot.id=my_follower --teleop.type=so101_leader --teleop.port=COM4 --teleop.id=my_leader'],{fs:19});
  cards(s,X,4.75,CW,[{tag:'--robot.~',t:'따라 하는 쪽',d:'팔로워암의 종류·포트·이름'},{tag:'--teleop.~',t:'조종하는 쪽',d:'리더암의 종류·포트·이름'}],2,2.7,{dfs:21,tfs:28});
  band(s,7.85,'시작할 때','Press ENTER to use provided calibration file ... 이 나오면 Enter (저장된 캘리브레이션 사용)');
  T(s,'관절 이름과 숫자가 계속 바뀌며 표시되면 동작 중이다. 이제 리더암을 천천히 움직여 보자',{x:X,y:8.95,w:CW,h:0.6,fontSize:21,color:P.muted});
  s.addNotes('캘리브레이션 파일이 없으면 이 명령이 캘리브레이션부터 시작한다.'); }
{ const s=content('03','멈추기');
  card(s,X,3.0,8.0,5.0,P.purple); T(s,'Ctrl + C',{x:X,y:3.0,w:8.0,h:5.0,fontSize:90,bold:true,color:P.white,align:'center',valign:'middle',fontFace:L.MONO});
  T(s,'터미널을 클릭한 뒤 Ctrl + C',{x:X+8.6,y:3.3,w:CW-8.6,h:0.7,fontSize:28,bold:true});
  T(s,'종료되면 팔로워암 모터 힘이 풀린다. 팔이 툭 떨어질 수 있으니 한 손으로 받쳐 준다.',{x:X+8.6,y:4.3,w:CW-8.6,h:2.0,fontSize:23,color:P.muted});
  band(s,8.6,'주의','창의 X 버튼으로 끄지 않는다. 모터에 힘이 남아 있을 수 있다');
  s.addNotes('disable_torque_on_disconnect 기본값 때문에 힘이 풀린다.'); }
{ const s=content('04','연습 미션');
  cards(s,X,3.0,CW,[{num:'1',t:'천천히 따라 하기',d:'리더암을 천천히 움직이며 팔로워가 얼마나 정확히 따라오는지 관찰'},{num:'2',t:'그리퍼 열고 닫기',d:'리더 트리거를 당겨 팔로워 집게 움직이기'},{num:'3',t:'지우개 옮기기',d:'책상 위 지우개를 집어 옮기기. 9장에서 녹화할 동작이다',hi:true},{num:'4',t:'빠르게 움직여 보기',d:'늦게 따라오거나 떨린다. 녹화 때 천천히 움직이는 이유'}],4,3.8,{dfs:19,tfs:24});
  band(s,7.2,'생각해 보기','카메라 화면만 보고 리더 대신 AI가 각도를 만들어 주면 어떨까? → 챕터 10 AI 학습의 아이디어');
  s.addNotes('미션 3을 충분히 연습시킨다.'); }
{ const s=content('05','문제가 생기면');
  table(s,X,3.0,CW,[0.4,0.6],['증상','원인과 해결'],[['팔로워가 반대 방향 / 한쪽으로 치우침','캘리브레이션 자세가 두 팔에서 달랐다 → 두 팔 모두 c 로 다시'],['팔로워가 덜덜 떨림','전원 부족 가능성 → 어댑터 사양 확인, 너무 빠르게 움직이지 않기'],['Could not connect on port COM3','포트 번호 확인, 다른 터미널에서 같은 팔을 쓰고 있지 않은지 (한 포트는 한 프로그램만)'],['그리퍼가 꽉 쥐지 못함','정상일 수 있다. 과열 방지로 최대 힘을 약 50%로 제한한다']],{fs:20});
  s.addNotes(''); }

// ================= CH08 =================
chapter('08','카메라 연결',['카메라 2대의 번호(index)를 찾는다','원격조작하며 카메라 화면과 관절 그래프를 본다'],'AI가 혼자 움직이려면 AI에게도 눈이 있어야 한다. 좋은 기준이 하나 있다. "카메라 화면만 보고 사람이 그 작업을 할 수 있어야 한다." 사람도 못 보는 각도라면 AI도 배울 수 없다.');
{ const s=content('01','카메라 연결');
  cards(s,X,3.0,CW,[{tag:'front',t:'앞쪽 위에서 비스듬히',d:'물체와 팔 전체 위치 파악'},{tag:'side',t:'옆쪽 또는 손목 근처',d:'집는 순간의 거리·높이 파악'}],2,2.7,{dfs:21,tfs:26});
  steps(s,X,6.1,CW,['USB 카메라 2대를 서로 다른 USB 포트(다른 쪽 면)에 꽂기','카메라를 집게나 거치대로 단단히 고정'],{fs:22});
  band(s,8.6,'팁','같은 USB 허브에 두 대를 꽂지 않는다(대역폭 부족). 노트북은 내장 웹캠이 보통 0번이 된다');
  s.addNotes('녹화 도중 카메라가 움직이면 AI가 혼란에 빠진다.'); }
{ const s=content('02','카메라 번호 찾기');
  code(s,X,3.0,7.5,['lerobot-find-cameras opencv'],{fs:24});
  T(s,'연결된 카메라를 찾아 번호를 출력하고, 각 카메라로 사진을 몇 장 찍어 저장한다',{x:X,y:4.3,w:7.5,h:1.2,fontSize:20,color:P.muted});
  code(s,X+8.1,3.0,CW-8.1,['--- Detected Cameras ---','Camera #0:','  Name: OpenCV Camera @ 0','  Id: 0','Camera #1:','  Id: 1'],{fs:17,colors:[P.soft,P.white,P.soft,P.mint,P.white,P.mint]});
  table(s,X,6.3,7.5,[0.6,0.4],['카메라','번호(Id)'],[['front (앞/위)','____'],['side (옆/손목)','____']],{fs:21});
  card(s,X+8.1,6.3,CW-8.1,2.3,P.white,P.lav); T(s,'사진으로 확인',{x:X+8.55,y:6.6,w:CW-9,h:0.5,fontSize:21,bold:true,color:P.purple});
  T(s,'C:\\robot\\lerobot\\outputs\\captured_images 폴더를 열어 어느 번호가 어느 카메라인지 본다. 교재 예시는 front = 0, side = 1',{x:X+8.55,y:7.2,w:CW-9,h:1.3,fontSize:19});
  s.addNotes('카메라를 다른 USB 포트로 옮기면 번호가 바뀔 수 있다.'); }
{ const s=content('03','카메라 화면 보면서 원격조작');
  code(s,X,2.85,CW,['lerobot-teleoperate --robot.type=so101_follower --robot.port=COM3 --robot.id=my_follower --robot.cameras="'+CAM+'" --teleop.type=so101_leader --teleop.port=COM4 --teleop.id=my_leader --display_data=true'],{fs:16});
  table(s,X,4.75,CW,[0.33,0.67],['카메라 설정 속 글자','뜻'],[['`front:` / `side:`','카메라 이름표. 9·11장에서도 똑같은 이름을 써야 한다'],['`index_or_path: 0`','찾은 카메라 번호'],['`width: 640, height: 480`','해상도. 작을수록 학습이 빠르다'],['`fps: 30`','1초에 찍는 사진 수'],['`--display_data=true`','Rerun 창에 카메라 화면과 관절 그래프를 실시간 표시']],{fs:18});
  band(s,9.7,'확인','Rerun 창에 두 화면이 모두 나오고, 리더를 움직이면 관절 그래프가 따라 움직이면 성공');
  s.addNotes('카메라 설정 부분은 9·11장에서도 똑같이 복사해 쓴다.'); }
{ const s=content('04','문제가 생기면');
  table(s,X,3.0,CW,[0.35,0.65],['증상','해결'],[['카메라가 0개 검색됨','설정 → 개인 정보 및 보안 → 카메라 → 데스크톱 앱 허용 켜기'],['화면이 검게 나옴 / 열기 실패','줌·팀즈·카메라 앱 등 카메라를 쓰는 다른 프로그램 모두 끄기'],['화면이 끊기거나 fps 경고','해상도 640×480 유지, 카메라를 다른 USB 포트로 분산'],['고해상도에서 느림 (고급)','카메라 설정에 fourcc: MJPG 추가 → 압축 전송으로 대역폭 감소']],{fs:20});
  s.addNotes(''); }

// ================= CH09 =================
chapter('09','데이터 수집',['원격조작으로 시범을 보이며 에피소드를 녹화한다','키보드로 넘기기·다시 찍기·끝내기를 한다','5개로 연습하고 최종 50개 이상 모은다'],'녹화하면 1초에 30번씩 카메라 사진과 팔의 자세, 사람이 내린 명령이 한 묶음으로 저장된다. AI는 이 짝을 수만 개 보고 따라 하는 법을 배운다. 시범이 일관될수록 AI도 잘 배운다.');
{ const s=content('01','무엇이 저장되나?','1초에 30번씩 세 가지가 한 묶음으로 저장된다');
  cards(s,X,3.0,CW,[{num:'📷',t:'카메라 사진 2장',d:'front, side — 그 순간 AI가 "보는" 장면'},{num:'🦾',t:'팔로워암 관절 6개',d:'observation — 그 순간 팔의 자세'},{num:'🎮',t:'리더암 관절 6개',d:'action — 그 순간 사람이 내린 "정답 명령"',hi:true}],3,4.4,{dfs:21,tfs:28});
  band(s,7.9,'핵심','"이런 장면 + 이런 자세일 때 → 사람은 이렇게 움직였다"는 짝을 보고 배운다');
  s.addNotes('학생이 선생님의 풀이 과정을 여러 번 보며 배우는 것과 같다.'); }
{ const s=content('02','과제 정하기','처음에는 쉬운 과제로: "큐브를 집어서 상자에 넣기"');
  cards(s,X,3.0,CW,[{t:'물체',d:'손바닥보다 작은 정육면체. 바닥과 색이 확실히 다른 것'},{t:'목표 상자',d:'위치를 테이프로 표시해 항상 같은 곳에'},{t:'카메라',d:'8장 위치에서 절대 움직이지 않게 고정',hi:true},{t:'조명',d:'창가 햇빛은 시간마다 바뀐다. 실내 조명 아래가 좋다'}],4,4.2,{dfs:20,tfs:28});
  s.addNotes(''); }
{ const s=content('03','연습 녹화 (5개)');
  code(s,X,2.85,CW,[REC+'--dataset.repo_id=student/so101_test --dataset.no_stamp=true --dataset.single_task="Put the cube in the box" --dataset.num_episodes=5 --dataset.episode_time_s=30 --dataset.reset_time_s=15 --dataset.push_to_hub=false'],{fs:14});
  table(s,X,5.0,CW,[0.36,0.64],['새로 붙은 옵션','뜻'],[['`--dataset.repo_id=student/so101_test`','데이터셋 이름 (사용자이름/데이터셋이름)'],['`--dataset.no_stamp=true`','이름 뒤에 날짜·시간을 붙이지 않는다 (꼭 넣기!)'],['`--dataset.single_task="..."`','어떤 과제인지 영어 문장으로'],['`--dataset.num_episodes=5`','녹화할 에피소드 수'],['`--dataset.episode_time_s=30` / `reset_time_s=15`','한 판 최대 30초 / 판 사이 정리 15초'],['`--dataset.push_to_hub=false`','인터넷에 올리지 않고 내 PC에만 저장']],{fs:16});
  s.addNotes('데이터셋 이름은 eval_ 로 시작하면 안 된다(평가용 예약).'); }
{ const s=content('04','녹화 중 진행 흐름과 키보드');
  const fl=['녹화 30초','정리 15초','녹화 30초','…','영상 저장']; let x=X; fl.forEach((f,i)=>{ const w=i===3?0.9:3.0; const hi=i===4;
    if(i!==3) card(s,x,3.0,w,1.0,hi?P.purple:(i%2?P.lav2:P.white),hi?P.purple:P.lav);
    T(s,f,{x,y:3.0,w,h:1.0,fontSize:22,bold:true,align:'center',valign:'middle',color:hi?P.white:P.ink}); x+=w+0.25; });
  cards(s,X,4.5,CW,[{num:'→',tag:'또는 n',t:'일찍 끝내고 다음으로',d:'30초 전에 과제를 끝냈을 때'},{num:'←',tag:'또는 r',t:'버리고 다시 녹화',d:'큐브를 떨어뜨리는 등 실수했을 때',hi:true},{num:'Esc',tag:'또는 q',t:'즉시 끝내고 저장',d:'그만하고 싶을 때'}],3,3.8,{dfs:19,tfs:24});
  band(s,8.65,'주의','화살표 키를 쓰자. 한글 입력 상태에서는 n 이 ㅜ 로 입력된다. 끝난 뒤 영상 압축 중에는 창을 끄지 않는다');
  s.addNotes('컴퓨터가 영어 음성으로 Recording episode, Reset the environment 를 읽어 준다.'); }
{ const s=content('05','저장된 데이터 확인과 재생');
  code(s,X,3.0,CW,['%USERPROFILE%\\.cache\\huggingface\\lerobot\\student\\so101_test'],{fs:19});
  table(s,X,4.2,8.4,[0.3,0.7],['폴더','내용'],[['data\\','관절 각도 숫자들 (parquet 표)'],['videos\\','카메라별 녹화 영상 (mp4)'],['meta\\','에피소드 수, fps, 과제 문장 등']],{fs:19});
  const rx=X+9.0,rw=CW-9.0; T(s,'녹화 동작을 팔로워로 다시 재생',{x:rx,y:4.2,w:rw,h:0.55,fontSize:22,bold:true,color:P.purple});
  code(s,rx,4.85,rw,['lerobot-replay --robot.type=so101_follower --robot.port=COM3 --robot.id=my_follower --dataset.repo_id=student/so101_test --dataset.episode=0'],{fs:15});
  T(s,'리더암 없이 팔로워가 녹화 때처럼 움직이면 데이터가 제대로 저장된 것',{x:rx,y:6.9,w:rw,h:0.9,fontSize:19,color:P.muted});
  band(s,8.6,'생각해 보기','재생은 기록된 숫자를 그대로 따라 한다. 큐브 위치가 바뀌면? AI 학습은 화면을 보고 판단하는 법을 배운다');
  s.addNotes('videos 안의 mp4가 AI가 보게 될 화면이다.'); }
{ const s=content('06','본 녹화 (50개)','새 이름(so101_pick)으로, 위치 5곳 × 10번');
  code(s,X,2.85,CW,[REC+'--dataset.repo_id=student/so101_pick --dataset.no_stamp=true --dataset.single_task="Put the cube in the box" --dataset.num_episodes=50 --dataset.episode_time_s=30 --dataset.reset_time_s=15 --dataset.push_to_hub=false'],{fs:14});
  cards(s,X,5.0,CW,[{num:'1',t:'위치 5곳 × 10번',d:'테이프로 위치 표시'},{num:'2',t:'카메라 고정',d:'절대 건드리지 않기'},{num:'3',t:'같은 방식으로',d:'같은 방향·같은 순서로 집기'},{num:'4',t:'물체가 보이게',d:'팔이 큐브를 가리지 않는지'},{num:'5',t:'천천히, 부드럽게',d:'급하면 AI도 급하게 배운다'},{num:'6',t:'변화는 천천히',d:'잘 되면 하나씩 늘린다'}],3,2.35,{dfs:18,tfs:22,gap:0.25});
  s.addNotes('공식 문서는 최소 50개, 위치마다 10개씩을 권장한다.'); }
{ const s=content('07','중간에 끊겼다면 / 처음부터 다시');
  T(s,'이어서 녹화 — 3가지를 바꾼 명령',{x:X,y:2.85,w:CW,h:0.55,fontSize:22,bold:true,color:P.purple});
  code(s,X,3.45,CW,[REC+'--dataset.repo_id=student/so101_pick --dataset.no_stamp=true --dataset.single_task="Put the cube in the box" --dataset.num_episodes=20 --dataset.episode_time_s=30 --dataset.reset_time_s=15 --dataset.push_to_hub=false --dataset.root="$env:USERPROFILE\\.cache\\huggingface\\lerobot\\student\\so101_pick" --resume=true'],{fs:14});
  cards(s,X,5.85,CW,[{tag:'--resume=true',t:'이어서 녹화',d:'끝에 붙인다'},{tag:'num_episodes=20',t:'더 찍을 개수',d:'전체 목표가 아니다! 50이면 총 80개',hi:'orange'},{tag:'--dataset.root',t:'폴더 위치',d:'v0.6.1은 이어 녹화 때 꼭 필요'}],3,2.6,{dfs:19,tfs:24});
  band(s,8.75,'처음부터','%USERPROFILE%\\.cache\\huggingface\\lerobot\\student\\so101_pick 폴더를 직접 삭제한 뒤 다시 실행');
  s.addNotes('삭제하지 않으면 FileExistsError 가 난다.'); }

// ================= CH10 =================
chapter('10','AI 학습',['녹화 데이터로 ACT 모델을 학습시킨다','loss가 줄어드는 것을 읽을 수 있다','GPU가 없으면 Colab으로 학습한다'],'학습은 장면을 보여 주고, AI가 예측하고, 정답과 비교해 틀린 정도(loss)를 계산하고, 덜 틀리도록 고치는 일을 수만 번 반복하는 것이다. 이 반복 1번이 step이다.');
{ const s=content('01','학습이란? 그리고 ACT');
  const st=['장면 보여 주기','AI가 예측','정답과 비교 = loss','조금 고치기']; const w=(CW-0.9)/4;
  st.forEach((t,i)=>{ const x=X+i*(w+0.3), hi=i===2; card(s,x,3.0,w,1.9,hi?P.purple:P.white,hi?P.purple:P.lav);
    circleNum(s,x+0.4,3.35,0.62,i+1,hi?P.white:P.purple,hi?P.purple:P.white); T(s,t,{x:x+0.4,y:4.1,w:w-0.8,h:0.6,fontSize:23,bold:true,color:hi?P.white:P.ink}); });
  T(s,'↻ 수만 번 반복 → loss가 줄면 AI가 시범을 닮아 간다',{x:X,y:5.1,w:CW,h:0.6,fontSize:22,bold:true,color:P.purple});
  card(s,X,6.0,CW,3.2,P.white,P.lav); T(s,'ACT (Action Chunking with Transformers)',{x:X+0.5,y:6.35,w:CW-1,h:0.6,fontSize:24,bold:true,color:P.purple});
  T(s,'한 번에 동작 하나가 아니라 앞으로의 동작 여러 개(v0.6.1 기본값 100개)를 한 덩어리로 예측한다. 사람이 컵을 잡을 때 "뻗고 → 쥐고 → 들기"를 한 흐름으로 계획하듯, 동작이 부드럽고 덜 흔들린다. 데이터 50개 정도로도 잘 배워 입문용으로 널리 쓰인다.',{x:X+0.5,y:7.05,w:CW-1,h:2.0,fontSize:20});
  s.addNotes(''); }
{ const s=content('02','어떤 방법으로 학습할까?');
  cards(s,X,3.0,CW,[{tag:'방법 A',t:'내 PC에서 학습',d:'nvidia-smi 가 나오고 torch.cuda.is_available() 이 True 인 PC'},{tag:'방법 B',t:'구글 Colab에서 학습',d:'GPU가 없거나 학교 PC 사용 제한이 있을 때. 클라우드 GPU를 빌려 쓴다',hi:true}],2,4.4,{dfs:22,tfs:32});
  band(s,7.9,'참고','CPU로도 기술적으로는 가능(--policy.device=cpu)하지만 너무 느려서 수업 시간 안에 끝내기 어렵다');
  s.addNotes(''); }
{ const s=content('03','방법 A — 내 PC에서 학습','시작 전: 챕터 01의 개발자 모드가 켜져 있어야 한다');
  code(s,X,2.85,CW,['lerobot-train --dataset.repo_id=student/so101_pick --policy.type=act --output_dir=outputs/train/act_so101_pick --job_name=act_so101_pick --policy.device=cuda --policy.push_to_hub=false --wandb.enable=false --steps=20000 --save_freq=5000'],{fs:16});
  table(s,X,4.45,CW,[0.38,0.62],['옵션','뜻'],[['`--dataset.repo_id=student/so101_pick`','9장에서 녹화한 데이터셋'],['`--policy.type=act`','ACT 모델로 학습'],['`--output_dir=outputs/train/act_so101_pick`','결과 저장 폴더'],['`--policy.device=cuda`','GPU로 계산'],['`--policy.push_to_hub=false`','모델을 인터넷에 올리지 않음 (없으면 오류)'],['`--steps=20000` / `--save_freq=5000`','반복 횟수(첫 시도용) / 5,000마다 중간 저장']],{fs:17});
  s.addNotes('LeRobot 기본값은 100,000스텝. 100,000스텝은 A100 GPU(배치 64)에서 약 1.5시간이며, 일반 PC 그래픽카드는 훨씬 오래 걸린다.'); }
{ const s=content('04','학습 로그 읽는 법','200스텝마다 한 줄씩 출력된다 (아래 숫자는 형식 예시)');
  code(s,X,3.0,CW,['step:2K smpl:16K ep:45 epch:1.20 loss:0.312 grdn:12.345 lr:1.0e-05 updt_s:0.150 data_s:0.010'],{fs:20});
  table(s,X,4.4,CW,[0.2,0.4,0.4],['항목','뜻','보는 법'],[['`step`','지금까지 반복 횟수','목표(20K)까지 올라간다'],['`epch`','전체 데이터를 몇 바퀴 봤는지',''],['`loss`','틀린 정도','점점 작아지면 잘 배우는 중 ✅'],['`updt_s`','한 스텝 계산 시간(초)','남은 시간 어림']],{fs:20});
  s.addNotes('실제 값은 데이터와 PC에 따라 다르다.'); }
{ const s=content('05','결과물 위치와 이어서 학습');
  code(s,X,3.0,8.6,['C:\\robot\\lerobot\\outputs\\train\\act_so101_pick\\checkpoints\\','    005000\\pretrained_model\\','    010000\\pretrained_model\\','    ...','    last\\pretrained_model\\   ← 11장에서 사용'],{fs:17,colors:[P.soft,P.white,P.white,P.soft,P.mint]});
  const rx=X+9.2,rw=CW-9.2; T(s,'중간에 끊겼다면 — config_path 필수',{x:rx,y:3.0,w:rw,h:0.55,fontSize:22,bold:true,color:P.purple});
  code(s,rx,3.65,rw,['lerobot-train --config_path=outputs/train/act_so101_pick/checkpoints/last/pretrained_model/train_config.json --resume=true'],{fs:15});
  T(s,'last 는 가장 큰 번호 폴더를 가리키는 바로가기다. 없거나 열리지 않으면 checkpoints\\020000\\pretrained_model 처럼 번호 폴더를 직접 쓴다',{x:rx,y:5.6,w:rw,h:1.6,fontSize:19,color:P.muted});
  band(s,7.6,'주의','같은 output_dir 로 처음부터 다시 학습하면 already exists 오류. 폴더 이름을 바꾸거나 지운다');
  s.addNotes(''); }
{ const s=content('06','방법 B — 계정 만들고 데이터 올리기','B-1 · B-2');
  steps(s,X,2.95,8.3,[{t:'huggingface.co 회원가입',d:'학생이라면 보호자·선생님과 상의'},{t:'settings/tokens → New token → Write',d:'토큰은 비밀번호와 같다. 공유·업로드 금지'},{t:'로그인하고 확인',code:['hf auth login','hf auth whoami']}],{fs:21,cfs:17});
  const rx=X+9.0,rw=CW-9.0; T(s,'데이터 올리고 버전 이름표 붙이기',{x:rx,y:2.95,w:rw,h:0.55,fontSize:21,bold:true,color:P.purple});
  code(s,rx,3.6,rw,['hf upload 내아이디/so101_pick "$env:USERPROFILE\\.cache\\huggingface\\lerobot\\student\\so101_pick" --repo-type dataset'],{fs:14});
  code(s,rx,5.45,rw,["python -c \"from huggingface_hub import HfApi; HfApi().create_tag('내아이디/so101_pick', tag='v3.0', repo_type='dataset')\""],{fs:14});
  T(s,'이름표(v3.0)가 없으면 Colab에서 "must be tagged with a codebase version" 오류가 난다',{x:rx,y:7.2,w:rw,h:0.9,fontSize:18,color:P.muted});
  band(s,9.55,'주의','업로드한 데이터는 기본 공개다. 얼굴 등 개인정보가 카메라에 찍히지 않았는지 확인한다');
  s.addNotes('녹화 때부터 --dataset.push_to_hub=true 를 쓰면 업로드와 이름표를 한 번에 해 준다(HF_USER가 실제 아이디여야 함).'); }
{ const s=content('07','방법 B — Colab에서 학습','B-3');
  steps(s,X,3.0,CW,[{t:'공식 ACT 학습 노트북 열기',d:'colab.research.google.com/github/huggingface/notebooks/blob/main/lerobot/training-act.ipynb'},{t:'런타임 → 런타임 유형 변경 → T4 GPU'},{t:'셀을 차례로 실행, 데이터셋 이름을 내아이디/so101_pick 으로'},{t:'학습 명령에 업로드 옵션 확인',code:['--policy.push_to_hub=true --policy.repo_id=내아이디/act_so101_pick']}],{fs:22,cfs:18});
  band(s,9.55,'주의','무료 GPU는 시간 제한이 있다. 버전이 달라 오류가 나면 노트북 설치 셀에 git checkout v0.6.1 추가');
  s.addNotes('학습이 끝나면 모델이 Hugging Face에 자동으로 올라간다.'); }

// ================= CH11 =================
chapter('11','평가\nAI 혼자 움직이기',['리더암 없이 팔로워암이 과제를 수행하게 한다','성공률을 기록하고 실패 원인을 분석한다'],'원격조작에서는 리더암(사람)이 각도를 알려 줬다. 이제 그 자리에 AI 모델이 들어간다. 1초에 30번씩 카메라와 팔 자세를 보고 AI가 다음 각도를 계산한다. 새로운 상황에서도 잘 해내는지 확인한다.');
{ const s=content('01','실행 전 안전 확인 (꼭!)');
  cards(s,X,3.0,CW,[{num:'1',t:'손 멀리',d:'AI는 예상 밖의 동작을 할 수 있다',hi:true},{num:'2',t:'같은 환경',d:'카메라 위치·조명이 녹화 때와 같다'},{num:'3',t:'익숙한 위치',d:'큐브를 녹화 때 위치 중 하나에'},{num:'4',t:'비상 준비',d:'Ctrl + C, 더 급하면 팔로워 전원 뽑기'}],4,3.6,{dfs:20,tfs:26});
  s.addNotes(''); }
{ const s=content('02','실행');
  code(s,X,2.85,CW,['lerobot-rollout --strategy.type=base --policy.path=outputs/train/act_so101_pick/checkpoints/last/pretrained_model --robot.type=so101_follower --robot.port=COM3 --robot.id=my_follower --robot.cameras="'+CAM+'" --task="Put the cube in the box" --duration=60'],{fs:15});
  table(s,X,4.75,CW,[0.36,0.64],['옵션','뜻'],[['`--strategy.type=base`','AI가 움직이기만 하고 녹화는 안 하는 기본 모드'],['`--policy.path=...`','AI 모델 위치. 방법 B면 내아이디/act_so101_pick'],['`--robot.cameras="..."`','녹화 때와 똑같은 카메라 이름·해상도'],['`--duration=60`','60초 실행 후 자동 종료 (0이면 무한)']],{fs:18});
  band(s,8.55,'주의','카메라 이름이 녹화 때(front, side)와 다르면 AI가 망가진 값을 낸다. 리더암(--teleop)은 없다!');
  T(s,'last 폴더가 없으면 checkpoints/020000/pretrained_model 처럼 번호 폴더를 쓴다. 끝나면 팔이 시작 자세로 천천히 돌아간다',{x:X,y:9.6,w:CW,h:0.8,fontSize:19,color:P.muted});
  s.addNotes(''); }
{ const s=content('03','성공률 기록하기','같은 조건으로 10번 실행하고 기록한다');
  table(s,X,3.0,CW,[0.32,0.12,0.12,0.44],['큐브 위치','시도','성공','실패 모습 (못 집음, 떨어뜨림, 엉뚱한 곳)'],[['위치 1 (녹화했던 곳)','2','',''],['위치 2 (녹화했던 곳)','2','',''],['위치 3 (녹화했던 곳)','2','',''],['녹화 위치들 사이','2','',''],['녹화 안 한 새 위치','2','','']],{fs:21});
  band(s,7.8,'성공률','성공 ÷ 10 × 100 = ______ %');
  s.addNotes(''); }
{ const s=content('04','결과 해석 — 왜 실패했을까?');
  table(s,X,3.0,CW,[0.33,0.37,0.3],['관찰','가능한 원인','다음 실험'],[['녹화한 위치는 성공, 새 위치는 실패','AI는 본 적 있는 상황만 잘한다 (일반화 부족)','위치를 더 다양하게 녹화'],['집으러 가다 멈칫멈칫','시범 동작이 매번 달라 헷갈림','일관된 동작으로 다시 녹화'],['아예 엉뚱하게 움직임','카메라 이동·조명 변화, 학습 부족','카메라 고정 확인, 스텝 늘려 재학습'],['집는 것까지는 되는데 놓침','쥐는 순간 데이터 부족','손목(side) 카메라 각도 조정']],{fs:19});
  band(s,8.2,'상관 ≠ 인과','스텝을 늘렸더니 성공률이 올랐다? 그사이 조명이 바뀌었을 수도. 한 번에 하나의 조건만 바꿔 비교한다');
  s.addNotes(''); }
{ const s=content('05','(심화) 평가하면서 녹화하기','episodic 모드: AI가 30초씩 10판, 판 사이 15초 동안 사람이 큐브를 다시 놓는다');
  code(s,X,3.0,CW,['lerobot-rollout --strategy.type=episodic --policy.path=outputs/train/act_so101_pick/checkpoints/last/pretrained_model --robot.type=so101_follower --robot.port=COM3 --robot.id=my_follower --robot.cameras="'+CAM+'" --dataset.repo_id=student/eval_so101_pick --dataset.no_stamp=true --dataset.single_task="Put the cube in the box" --dataset.num_episodes=10 --dataset.episode_time_s=30 --dataset.reset_time_s=15 --dataset.push_to_hub=false'],{fs:15});
  band(s,6.0,'팁','평가 데이터셋 이름은 관례적으로 eval_ 로 시작한다. 각 판 영상이 저장되어 실패 장면을 돌려 볼 수 있다');
  s.addNotes(''); }
{ const s=content('06','더 나아가기');
  cards(s,X,3.0,CW,[{num:'1',t:'데이터 늘리기',d:'위치·물체를 늘려 100개 이상 녹화하고 재학습해 성공률 비교'},{num:'2',t:'다른 모델',d:'SmolVLA, Pi0 같은 언어로 지시받는 모델(VLA). 더 큰 GPU 필요'},{num:'3',t:'생각해 볼 질문',d:'시범 보인 사람의 습관과 실수도 배울까? 공장·가정에서는 누가 시범을 보여야 할까?',hi:true}],3,3.9,{dfs:21,tfs:28});
  s.addNotes('설치부터 AI 로봇까지 완주를 축하한다.'); }

// ================= CH12 =================
chapter('12','문제 해결',['오류 메시지의 마지막 줄로 원인을 찾는다','혼자 해결이 안 될 때 다음 순서를 안다'],'오류 메시지의 마지막 줄에 진짜 원인이 적혀 있는 경우가 많다. 그 줄의 핵심 단어로 표를 찾고, 그래도 안 되면 마지막 장의 순서대로 처음 상태로 되돌린다.');
const TB=(n,title,rows,fs)=>{ const s=content(n,title); table(s,X,2.75,CW,[0.35,0.27,0.38],['오류 / 증상','원인','해결'],rows,{fs:fs||16}); return s; };
TB('01','설치 · 환경 문제',[["conda : 'conda' 용어가 ... 인식되지 않습니다",'PowerShell–conda 미연결','챕터 01 3·4단계 (VS Code 완전 재시작)'],["'lerobot-calibrate' 용어가 ... 인식되지 않습니다",'가상환경 밖 ((base) 상태)','conda activate lerobot'],['...profile.ps1 파일을 로드할 수 없습니다','스크립트 실행이 막힘','Set-ExecutionPolicy 다시, 막히면 cmd 우회'],["'Forceconda' 등 단어가 붙은 오류",'여러 줄을 한 번에 붙여넣음','한 줄씩 다시'],["Package 'lerobot' requires a different Python",'파이썬 3.12 미만','python=3.12 로 환경 새로'],['Microsoft Visual C++ 14.0 or greater is required','C++ 빌드 도구 없음','Visual Studio Build Tools 설치'],['torch.cuda.is_available() 이 False (GPU PC)','CPU용 PyTorch','PyTorch 명령에 --force-reinstall'],['No valid stream found in input file','ffmpeg 없음·버전 불일치','conda install -y -c conda-forge ffmpeg(=7.1.1)'],['설치가 매우 느리거나 멈춤','OneDrive·바탕화면 경로, 백신','작업 폴더를 C:\\robot 으로']],15);
TB('02','포트 · 모터 문제',[['Could not detect the port. No difference was found','Enter 전에 USB를 안 뽑음','뽑은 뒤 Enter'],["Could not connect on port 'COM4' / 액세스가 거부되었습니다",'번호가 틀림, 다른 프로그램이 사용 중','번호 확인, 다른 터미널 종료, USB 재연결'],['FileNotFoundError ... COM4','USB 구멍이 바뀜','lerobot-find-port 로 다시 찾기'],["Motor 'gripper' was not found / Missing motor IDs",'케이블 빠짐, 전원·전압 부족, ID 미설정','전원 → 케이블 → (조립품 아니면) 챕터 04'],['There is no status packet!','전원 또는 데이터선 불량','전원, 3핀 케이블 다시 꽂기'],['Magnitude 30841 exceeds 2047 ...','모터 위치값 이상','전원 껐다 켜기, 계속되면 ID·중앙값 재설정'],['장치 관리자에 노란 ⚠️','USB 드라이버 없음','WCH CH343/CH340 드라이버']],17);
TB('03','캘리브레이션 · 원격조작 · 카메라',[['Some motors have the same min and max values','안 움직인 관절이 있음','5개 관절 모두 끝까지'],['매번 캘리브레이션을 새로 하자고 함','id 이름이 다름','--robot.id / --teleop.id 를 같게'],['팔로워가 리더와 다른 각도','가운데 자세가 달랐음','두 팔 모두 c 로 다시'],['시작하자마자 팔로워가 확 움직임','두 팔 자세 차이가 큼','실행 전 자세 맞추기'],['No opencv cameras were detected','카메라 권한 꺼짐','개인 정보 및 보안 → 카메라 허용'],['Failed to open / 화면이 검음','다른 프로그램이 사용 중','줌·팀즈·카메라 앱 종료'],['fps 경고, 화면 끊김','USB 대역폭 부족','다른 USB 포트로 분산, 640×480']],17);
TB('04','녹화 문제',[['FileExistsError (녹화 시작 시)','같은 이름의 폴더가 있음','이어서: --resume=true + --dataset.root / 새로: 폴더 삭제'],["resume() requires an explicit 'root' directory",'이어 녹화에 폴더 위치 없음','--dataset.root="..." 추가'],['이름 뒤에 _20261008_... 이 붙음','--dataset.no_stamp=true 빠짐','붙은 이름을 쓰거나 옵션 넣고 다시'],["Dataset names starting with 'eval_' are reserved",'녹화에 eval_ 이름','녹화용 이름은 eval_ 없이'],['화살표 키가 안 먹음','다른 창 선택 / 한글 입력 상태','화살표 키 사용, 다른 창 클릭 금지']],18);
TB('05','학습 · 평가 문제',[["'repo_id' argument missing",'업로드 설정이 켜짐','--policy.push_to_hub=false'],['Output directory ... already exists','같은 출력 폴더','이름 변경 또는 --config_path + --resume=true'],['A config_path is expected when resuming','--config_path 빠짐','챕터 10 이어서 학습 명령 그대로'],['OSError: [WinError 1314]','last 바로가기 생성 막힘','개발자 모드 켜고 번호 폴더로 이어서'],['last 폴더가 없음 (평가)','위와 같은 원인','checkpoints\\020000\\pretrained_model'],['must be tagged with a codebase version','hf upload 데이터에 이름표 없음','create_tag 명령 실행'],['CUDA out of memory','GPU 메모리 부족','--batch_size=4'],['DataLoader / worker 오류','윈도우 멀티프로세스 문제','--num_workers=0'],['mean is infinity (평가)','카메라 이름이 다름','front, side 를 녹화 때와 똑같이']],15);
{ const s=content('06','그래도 안 되면');
  steps(s,X,3.0,10.6,[{t:'터미널을 휴지통 아이콘으로 닫고 새로 열기',d:'conda activate lerobot → cd C:\\robot\\lerobot 부터 다시'},{t:'두 팔의 전원과 USB를 모두 뽑았다가 다시 꽂기'},{t:'가상환경 새로 만들기 (최후의 방법)',code:['conda deactivate','conda remove -y -n lerobot --all']},{t:'오류 메시지 전체를 복사해 선생님 또는 LeRobot 디스코드에 질문'}],{fs:22,cfs:17});
  const rx=12.6,rw=R-rx; card(s,rx,3.0,rw,4.6,P.purple); T(s,'안심하세요',{x:rx+0.5,y:3.4,w:rw-1,h:0.6,fontSize:26,bold:true,color:P.white});
  T(s,'가상환경을 지워도 캘리브레이션 파일과 녹화 데이터는 %USERPROFILE%\\.cache\\huggingface\\lerobot 에 따로 있어서 지워지지 않는다.',{x:rx+0.5,y:4.2,w:rw-1,h:3.2,fontSize:20,color:P.white});
  s.addNotes('디스코드: discord.com/invite/s3KuuzsPFb'); }
