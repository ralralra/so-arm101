const L=require('./lib.js'); const {pres,P,X,CW,R,T,card,pill,circleNum,band,newSlide,content,code,steps,table,cards,chapter}=L;
const CAM='{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}, side: {type: opencv, index_or_path: 1, width: 640, height: 480, fps: 30}}';
global.CAM=CAM;
const CH=[['00','시작하기 전에'],['01','초기 설정 ① VS Code와 conda 연결'],['02','초기 설정 ② LeRobot 설치'],['03','USB 포트 찾기'],['04','모터 ID 설정'],['05','조립'],['06','캘리브레이션'],['07','원격조작'],['08','카메라 연결'],['09','데이터 수집'],['10','AI 학습'],['11','평가 · AI 혼자 움직이기'],['12','문제 해결']];

// ===== 표지 =====
{ const s=newSlide();
  pill(s,X,1.0,'SO-ARM101 × LeRobot · 윈도우 실습',P.lav,P.purple);
  T(s,'로봇팔에게',{x:X,y:2.7,w:10.5,h:1.3,fontSize:72,bold:true});
  T(s,'일을 가르쳐 보자',{x:X,y:4.05,w:10.5,h:1.3,fontSize:72});
  T(s,'설치 · 연결 · 원격조작 · 녹화 · AI 학습 · 평가',{x:X,y:7.0,w:10.5,h:0.5,fontSize:24,color:P.muted});
  T(s,'윈도우 PC 한 대와 VS Code 터미널로 끝까지 따라 한다',{x:X,y:7.6,w:10.5,h:0.5,fontSize:22,bold:true});
  const flow=[['사람이 시범','리더암으로 움직이기'],['녹화','카메라 + 관절 각도 50번'],['AI 학습','시범을 따라 하는 법'],['AI 혼자 동작','팔로워암 스스로']];
  flow.forEach((f,i)=>{ const y=1.0+i*2.35, x=12.4, hi=i===3; card(s,x,y,6.35,1.95,hi?P.purple:P.white,hi?P.purple:P.lav);
    circleNum(s,x+0.45,y+0.62,0.72,i+1,hi?P.white:P.purple,hi?P.purple:P.white);
    T(s,f[0],{x:x+1.5,y:y+0.42,w:4.6,h:0.6,fontSize:28,bold:true,color:hi?P.white:P.ink});
    T(s,f[1],{x:x+1.5,y:y+1.05,w:4.6,h:0.5,fontSize:19,color:hi?P.lav:P.muted});
    if(i<3) T(s,'↓',{x:x+0.45,y:y+1.95,w:0.72,h:0.4,fontSize:22,bold:true,color:P.purple,align:'center',valign:'middle'}); });
  s.addNotes('사람이 리더암으로 시범을 보이고, 그 장면을 녹화해 AI가 배우게 한 뒤, 마지막에는 팔로워암이 혼자 움직인다. 이것이 모방 학습이다.'); }

// ===== 목차 =====
{ const s=newSlide();
  T(s,'SO-ARM101 × LeRobot',{x:X,y:0.55,w:10,h:0.4,fontSize:16,bold:true,color:P.purple});
  T(s,'전체 순서',{x:X,y:1.15,w:CW,h:1.0,fontSize:48,bold:true,valign:'middle'});
  T(s,'번호 순서가 곧 실습 순서다. 조립 완성품이면 04·05는 건너뛴다',{x:X,y:2.2,w:CW,h:0.5,fontSize:22,color:P.muted});
  const cols=5, gap=0.25, w=(CW-gap*4)/5, h=2.05;
  CH.forEach((c,i)=>{ const col=i%cols, row=Math.floor(i/cols), x=X+col*(w+gap), y=3.15+row*(h+gap); const skip=(c[0]==='04'||c[0]==='05'); const hi=c[0]==='10';
    card(s,x,y,w,h,hi?P.purple:P.white,hi?P.purple:P.lav);
    T(s,c[0],{x:x+0.35,y:y+0.3,w:1.4,h:0.75,fontSize:34,bold:true,color:hi?P.white:P.purple});
    if(skip) pill(s,x+w-1.75,y+0.35,'완성품 생략',P.lav2,P.purple,1.5);
    T(s,c[1],{x:x+0.35,y:y+1.1,w:w-0.7,h:0.8,fontSize:20,bold:true,color:hi?P.white:P.ink}); });
  s.addNotes('13개 챕터를 순서대로 진행한다. 04 모터 ID 설정과 05 조립은 조립 완성품을 받았다면 건너뛴다.'); }

// ================= CH00 =================
chapter('00','시작하기 전에',['키트 구성품과 전원 어댑터를 구분한다','로봇팔 안전수칙을 안다','VS Code 터미널에 명령을 입력하는 방법을 안다'],'로봇을 켜기 전에 준비물, 전원, 안전, 터미널, 용어 다섯 가지를 먼저 확인한다. 특히 전원 어댑터는 모터 고장과 직결된다.');
{ const s=content('01','준비물 확인','시작 전에 책상 위에 10가지를 꺼내 놓고 하나씩 체크한다');
  const items=[['리더암','사람이 손잡이를 잡고 움직이는 팔'],['팔로워암','리더암을 따라 움직이는 팔 (끝에 집게)'],['모터 제어 보드 ×2','팔 아래 작은 기판, USB와 전원을 꽂는 곳'],['전원 어댑터 ×2','전압이 서로 다를 수 있다! 다음 장 필독','hi'],['USB 케이블 ×2','보드↔PC 연결, 데이터 전송용이어야 함'],['USB 카메라 ×2','위에서 보는 카메라 + 옆(손목) 카메라'],['윈도우 PC','Win 10/11, USB 4개 이상, 여유 공간 30GB'],['VS Code','Python 확장(Microsoft)까지 설치'],['클램프 ×2','팔을 책상에 고정, 안 하면 넘어진다'],['NVIDIA GPU','선택 사항, 없으면 Colab으로 학습','opt']];
  const cols=5,gap=0.3,w=(CW-gap*4)/5,h=3.3;
  items.forEach((it,i)=>{ const c=i%cols,r=Math.floor(i/cols),x=X+c*(w+gap),y=3.15+r*(h+gap),hi=it[2]==='hi';
    card(s,x,y,w,h,hi?P.orange:P.white,hi?P.orange:P.lav);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:x+0.35,y:y+0.4,w:0.5,h:0.5,rectRadius:0.08,fill:{color:P.white},line:{color:hi?P.white:P.purple,width:2}});
    if(it[2]==='opt') pill(s,x+w-1.35,y+0.41,'선택',P.lav2,P.purple,1.0);
    T(s,it[0],{x:x+0.35,y:y+1.15,w:w-0.6,h:0.6,fontSize:24,bold:true,color:hi?P.white:P.ink});
    T(s,it[1],{x:x+0.35,y:y+1.85,w:w-0.6,h:1.25,fontSize:18,color:hi?P.white:P.muted}); });
  s.addNotes('충전 전용 USB 케이블은 데이터가 안 통하므로 장치가 안 잡히면 케이블부터 의심한다. 그래픽카드는 없어도 되고 학습만 Colab에서 한다.'); }
{ const s=content('02','전원 어댑터 — 가장 중요한 주의사항','SO-101 키트는 판매처·버전에 따라 모터 전압이 다르다');
  const y=3.2,h=4.9; card(s,X,y,5.4,h,P.white,P.lav); pill(s,X+0.45,y+0.45,'일반형',P.lav2,P.purple);
  T(s,'모터 7.4V',{x:X+0.45,y:y+1.25,w:4.6,h:0.6,fontSize:24,color:P.muted}); T(s,'5V',{x:X+0.45,y:y+1.9,w:4.6,h:1.5,fontSize:96,bold:true,color:P.purple}); T(s,'어댑터',{x:X+0.45,y:y+3.55,w:4.6,h:0.6,fontSize:26,bold:true});
  const x2=X+5.7; card(s,x2,y,5.4,h,P.purple); pill(s,x2+0.45,y+0.45,'Pro형 (고토크)',P.white,P.purple);
  T(s,'모터 12V',{x:x2+0.45,y:y+1.25,w:4.6,h:0.6,fontSize:24,color:P.lav}); T(s,'12V',{x:x2+0.45,y:y+1.9,w:4.6,h:1.5,fontSize:96,bold:true,color:P.white}); T(s,'어댑터',{x:x2+0.45,y:y+3.55,w:4.6,h:0.6,fontSize:26,bold:true,color:P.white});
  const x3=X+11.4,w3=CW-11.4; card(s,x3,y,w3,h,P.white,P.lav); T(s,'Juxi 위키 권장 (Pro판)',{x:x3+0.45,y:y+0.45,w:w3-0.9,h:0.55,fontSize:22,bold:true,color:P.purple});
  [['리더암','5V 6A','손으로 움직이니 힘이 약해도 된다'],['팔로워암','12V 5A','물건을 들어야 하니 더 높은 전압']].forEach((r,i)=>{ const yy=y+1.35+i*1.65;
    T(s,r[0],{x:x3+0.45,y:yy,w:2.0,h:0.6,fontSize:24,bold:true}); T(s,r[1],{x:x3+2.5,y:yy,w:w3-2.95,h:0.6,fontSize:30,bold:true,color:P.purple}); T(s,r[2],{x:x3+0.45,y:yy+0.65,w:w3-0.9,h:0.55,fontSize:18,color:P.muted}); });
  band(s,8.5,'주의','12V 어댑터를 7.4V 모터에 꽂으면 모터가 망가질 수 있다',0.85);
  T(s,'어댑터 라벨(OUTPUT 5V / 12V)과 판매처 안내문을 확인한 뒤 꽂고, 마스킹테이프로 "리더-5V" "팔로워-12V" 이름표를 붙여 둔다',{x:X,y:9.6,w:CW,h:0.9,fontSize:20,color:P.muted});
  s.addNotes('우리 키트의 정확한 전압은 판매처 페이지에 나와 있지 않다. 반드시 어댑터 라벨과 판매처 안내문을 확인하게 한다.'); }
{ const s=content('03','안전수칙','팔로워암은 모터에 힘이 들어가는 순간 갑자기 움직일 수 있다');
  const rules=[['얼굴과 손은 팔로워암에서 멀리','모터에 힘이 들어가는 순간 팔이 갑자기 움직인다'],['팔은 클램프로 책상에 고정','고정하지 않으면 움직이다 넘어진다'],['반경 40cm를 비워 두기','컵, 노트북 화면이 부딪히기 쉽다'],['이상한 소리·열이 나면 전원부터 뽑기','끼익, 덜덜 소리나 뜨거운 모터는 위험 신호'],['멈출 때는 Ctrl + C','창의 X 버튼으로 끄면 모터에 힘이 남을 수 있다'],['그리퍼에 손가락 넣지 않기','집게는 생각보다 세게 닫힌다']];
  const colW=(CW-0.4)/2; rules.forEach((r,i)=>{ const c=Math.floor(i/3),k=i%3,x=X+c*(colW+0.4),y=3.2+k*2.05;
    card(s,x,y,colW,1.75,P.white,P.lav); circleNum(s,x+0.4,y+0.5,0.75,i+1);
    T(s,r[0],{x:x+1.45,y:y+0.3,w:colW-1.8,h:0.65,fontSize:26,bold:true}); T(s,r[1],{x:x+1.45,y:y+0.98,w:colW-1.8,h:0.55,fontSize:19,color:P.muted}); });
  band(s,9.55,'비상시','Ctrl + C로 멈추고, 그래도 움직이면 팔로워암 전원 어댑터를 바로 뽑는다');
  s.addNotes('5번 Ctrl+C와 비상시 전원 뽑기는 실제로 한 번씩 연습시킨다.'); }
{ const s=content('04','VS Code 터미널이란?','마우스 대신, 컴퓨터에게 글로 "이 프로그램을 이렇게 실행해 줘"라고 부탁하는 창');
  const tx=X,ty=3.2,tw=9.6,th=2.3; s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:tx,y:ty,w:tw,h:th,rectRadius:0.18,fill:{color:P.ink},line:{color:P.ink}});
  T(s,'터미널 → 새 터미널   (Ctrl + `)',{x:tx+0.45,y:ty+0.35,w:tw-0.9,h:0.45,fontSize:17,color:P.soft});
  T(s,[{text:'(lerobot) ',options:{color:P.lilac}},{text:'PS ',options:{color:P.orange}},{text:'C:\\robot\\lerobot> ',options:{color:P.white}},{text:'lerobot-find-port',options:{color:P.mint}}],{x:tx+0.45,y:ty+1.1,w:tw-0.9,h:0.7,fontSize:24,fontFace:L.MONO,valign:'middle'});
  [['(lerobot)','lerobot 가상환경 안에 있다'],['PS','PowerShell 터미널이다'],['C:\\robot\\lerobot','지금 있는 폴더'],['>','여기 뒤에 명령 입력']].forEach((l,i)=>{ const y=ty+th+0.35+i*0.62;
    T(s,l[0],{x:tx,y,w:3.6,h:0.5,fontSize:20,bold:true,color:P.purple,fontFace:L.MONO,valign:'middle'}); T(s,l[1],{x:tx+3.7,y,w:tw-3.7,h:0.5,fontSize:20,valign:'middle'}); });
  const rx=X+10.3,rw=CW-10.3; T(s,'명령 붙여넣기',{x:rx,y:3.2,w:rw,h:0.55,fontSize:24,bold:true,color:P.purple});
  ['교재 명령 상자를 복사 (Ctrl+C)','터미널 클릭 → 붙여넣기 (Ctrl+V)','COM3 같은 값을 내 것으로 고치고 Enter'].forEach((t,i)=>{ const y=3.95+i*0.85; circleNum(s,rx,y,0.58,i+1); T(s,t,{x:rx+0.8,y,w:rw-0.8,h:0.58,fontSize:21,bold:true,valign:'middle'}); });
  T(s,'꼭 알아야 할 키',{x:rx,y:6.65,w:rw,h:0.55,fontSize:24,bold:true,color:P.purple});
  [['Ctrl + C','실행 중인 프로그램 멈추기'],['↑','방금 명령 다시 불러오기'],['Tab','폴더·파일 이름 자동 완성']].forEach((k,i)=>{ const y=7.35+i*0.72; card(s,rx,y,1.9,0.56,P.white,P.lav);
    T(s,k[0],{x:rx,y,w:1.9,h:0.56,fontSize:18,bold:true,align:'center',valign:'middle',fontFace:L.MONO}); T(s,k[1],{x:rx+2.15,y,w:rw-2.15,h:0.56,fontSize:20,valign:'middle'}); });
  band(s,9.75,'주의','명령은 한 상자씩, 한 줄씩 붙여넣는다. 여러 개를 한 번에 붙이면 줄이 합쳐져 오류가 난다');
  s.addNotes('프롬프트 앞에 (lerobot)과 PS가 보이는지 매번 확인하게 한다.'); }
{ const s=content('05','용어 미리 보기','앞으로 계속 나오는 말 9개, 쉬운 뜻으로 먼저 알고 간다');
  cards(s,X,3.15,CW,[{t:'LeRobot',d:'Hugging Face가 만든 로봇 AI용 무료 프로그램 모음'},{t:'Hugging Face',d:'AI 모델과 데이터를 공유하는 사이트, "AI의 깃허브"'},{t:'서보 모터',d:'정해진 각도로 정확히 도는 모터'},{t:'관절 6개 (ID 1~6)',d:'어깨 회전 · 어깨 들기 · 팔꿈치 · 손목 굽힘 · 손목 회전 · 집게'},{t:'COM 포트',d:'윈도우가 USB 장치에 붙여 주는 번호표 (COM3, COM4)'},{t:'캘리브레이션',d:'두 팔의 "0점" 맞추기, 저울 영점 맞추기와 같다'},{t:'에피소드',d:'녹화 한 판, 큐브를 집어 상자에 넣기 1번'},{t:'정책 (모델)',d:'학습이 끝난 AI 두뇌, 화면을 보고 팔 동작을 정한다'},{t:'ACT',d:'이 교재에서 쓰는 AI 모델 이름'}],3,2.05,{tColor:P.purple,dfs:19,tfs:26});
  s.addNotes('외우게 하기보다 나중에 이 말이 나오면 이 장을 다시 본다고 안내한다.'); }

// ================= CH01 =================
chapter('01','초기 설정 ①\nVS Code와 conda 연결',['VS Code 터미널(PowerShell)에서 conda 명령이 동작한다','터미널 앞에 (base)가 보이면 끝이다'],'conda를 설치해도 VS Code 터미널은 바로 알아보지 못한다. PowerShell이 켜질 때 "conda 준비 코드"가 먼저 실행되도록 직접 연결해야 한다. 실습실에서 가장 많이 막히는 지점이다.');
{ const s=content('00','시작 전에 꼭 지킬 것 3가지');
  cards(s,X,3.0,CW,[{num:'1',t:'복사해서 붙여넣기',d:'명령은 VS Code 터미널에 붙여넣는다.\n메뉴 터미널 → 새 터미널 (Ctrl + `)'},{num:'2',t:'PS로 시작하는지 확인',d:'C:\\...> 면 cmd, $ 면 Git Bash다.\n+ 옆 ˅ → PowerShell 선택',hi:true},{num:'3',t:'한 줄씩 붙여넣기',d:'여러 줄을 한 번에 붙이면 줄이 합쳐져 엉뚱한 오류가 난다'}],3,3.9,{dfs:20,tfs:28});
  band(s,7.3,'팁','매번 PowerShell로 열리게 하려면 Ctrl + Shift + P → Terminal: Select Default Profile → PowerShell');
  s.addNotes('프롬프트 맨 앞의 PS를 학생들이 직접 확인하게 한다.'); }
{ const s=content('01','작업 폴더 만들고 VS Code로 열기');
  steps(s,X,3.1,9.0,[{t:'파일 탐색기에서 C:\\robot 폴더 만들기',d:'한글·띄어쓰기가 없는 짧은 경로가 안전하다'},{t:'VS Code → 파일 → 폴더 열기 → C:\\robot'},{t:'터미널을 열고 현재 위치 확인',code:['pwd']}],{fs:24});
  card(s,11.0,3.1,R-11.0,4.6,P.white,P.lav); T(s,'📖 pwd 는?',{x:11.45,y:3.5,w:R-11.9,h:0.6,fontSize:24,bold:true,color:P.purple});
  T(s,'지금 터미널이 어느 폴더에 있는지 보여 준다 (print working directory).\n\nC:\\robot 이 나오면 된다.',{x:11.45,y:4.3,w:R-11.9,h:3.0,fontSize:21});
  band(s,9.4,'주의','바탕화면, 문서, OneDrive 폴더는 피한다. 동기화가 수천 개의 파일을 건드려 설치가 느려지거나 깨질 수 있다');
  s.addNotes('OneDrive 동기화 폴더에 설치하는 실수가 많다.'); }
{ const s=content('02','Miniforge(conda) 설치','이미 설치되어 있으면 3단계로 건너뛴다');
  code(s,X,3.0,5.3,['conda --version'],{fs:20}); T(s,'버전 숫자가 나오거나, 시작 메뉴에 Miniforge/Anaconda Prompt가 있으면 → 3단계로',{x:X,y:4.1,w:5.3,h:1.4,fontSize:19,color:P.muted});
  const sx=X+6.0, sw=CW-6.0;
  steps(s,sx,3.0,sw,[{t:'설치 파일 내려받기',code:['Invoke-WebRequest -Uri "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Windows-x86_64.exe" -OutFile "$env:TEMP\\Miniforge3.exe"']},{t:'설치 파일 실행',code:['Start-Process "$env:TEMP\\Miniforge3.exe" -Wait']},{t:'설치 창: 기본 설정 그대로',d:'Next → I Agree → Just Me → Next → Install → Finish'}],{fs:21});
  band(s,9.55,'주의','윈도우 사용자 이름이 한글이거나 띄어쓰기가 있으면 설치 위치를 C:\\miniforge3 로 바꾼다');
  s.addNotes('내려받기가 느리면 브라우저로 conda-forge.org/download 에서 Windows x86_64 설치 파일을 직접 받아도 된다.'); }
{ const s=content('03','PowerShell과 conda 연결','처음 한 번만 한다. 이 단계가 가장 중요하다');
  T(s,'① 스크립트 실행 허용',{x:X,y:2.95,w:8,h:0.55,fontSize:24,bold:true,color:P.purple});
  code(s,X,3.6,CW,['Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force'],{fs:18});
  T(s,'윈도우가 막아 둔 PowerShell 스크립트 실행을 내 계정에서만 허용한다. 관리자 권한은 필요 없다.',{x:X,y:4.55,w:CW,h:0.5,fontSize:19,color:P.muted});
  T(s,'② conda 연결 — 긴 한 줄을 통째로 복사해서 한 번만 실행',{x:X,y:5.25,w:CW,h:0.55,fontSize:24,bold:true,color:P.purple});
  code(s,X,5.9,CW,['$conda = @("$env:USERPROFILE\\miniforge3", "$env:USERPROFILE\\anaconda3", "$env:USERPROFILE\\miniconda3", "C:\\miniforge3", "C:\\ProgramData\\miniforge3", "C:\\ProgramData\\anaconda3", "C:\\ProgramData\\miniconda3") | ForEach-Object { "$_\\Scripts\\conda.exe" } | Where-Object { Test-Path $_ } | Select-Object -First 1; if (-not $conda) { Write-Host "conda를 찾을 수 없습니다. 선생님께 알려주세요." -ForegroundColor Red } else { New-Item -ItemType Directory -Force (Split-Path $PROFILE) | Out-Null; Add-Content -Path $PROFILE -Encoding utf8 -Value "`n#region conda initialize`n(& `"$conda`" `"shell.powershell`" `"hook`") | Out-String | ?{`$_} | Invoke-Expression`n#endregion"; Write-Host "완료: $conda" -ForegroundColor Green }'],{fs:12});
  band(s,9.6,'성공','초록색 "완료: ...conda.exe" 가 나오면 성공. 노란 "재정의" 경고가 나오면 학교 정책으로 막힌 것 → 이 챕터 마지막 장');
  s.addNotes('②는 conda를 찾아서 PowerShell 시작 설정 파일(프로필)에 conda 준비 코드를 덧붙인다. 원래 쓰는 conda init powershell 은 일부 버전(25.11)에서 실패해서 대신 쓴다. 여러 번 실행하면 같은 내용이 여러 번 들어가니 한 번만 실행한다.'); }
{ const s=content('04','VS Code를 완전히 껐다가 다시 켜기','터미널만 새로 여는 것으로는 부족하다. VS Code 창을 모두 닫는다');
  s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:X,y:3.1,w:CW,h:1.6,rectRadius:0.18,fill:{color:P.ink},line:{color:P.ink}});
  T(s,[{text:'(base) ',options:{color:P.lilac}},{text:'PS ',options:{color:P.orange}},{text:'C:\\robot>',options:{color:P.white}}],{x:X+0.6,y:3.1,w:CW-1.2,h:1.6,fontSize:40,fontFace:L.MONO,valign:'middle'});
  table(s,X,5.1,CW,[0.32,0.3,0.38],['보이는 모습','의미','할 일'],[['`(base) PS C:\\robot>`','✅ 성공','5단계로'],['`PS C:\\robot>` ((base) 없음)','프로필이 안 읽힘','VS Code 창을 모두 닫고 다시 켜기'],['터미널 맨 위 빨간 글씨 오류','프로필 실행이 막힘','문제 해결 장 확인']],{fs:20});
  s.addNotes('VS Code는 처음 켜질 때 설정을 기억해 두기 때문에 프로그램 자체를 다시 켜야 3단계 설정을 읽는다.'); }
{ const s=content('05','로봇 USB 드라이버 확인');
  steps(s,X,3.0,CW,[{t:'팔로워암 보드에 전원 어댑터를 꽂고 USB로 PC에 연결'},{t:'시작 버튼 오른쪽 클릭 → 장치 관리자 → 포트(COM & LPT)'}],{fs:23});
  table(s,X,5.0,CW,[0.42,0.58],['보이는 이름','할 일'],[['USB-SERIAL CH343 (COM3), USB 직렬 장치 (COM3) 등','✅ 정상. 다음으로'],['기타 장치 아래 노란 ⚠️','WCH 드라이버 설치: CH343 / CH340 (모르면 둘 다)'],['아무것도 안 생김','다른 USB 케이블로 교체 (충전 전용 케이블은 데이터가 안 통한다)']],{fs:20});
  s.addNotes('드라이버 주소: wch-ic.com/downloads/CH343SER_EXE.html, CH341SER_EXE.html'); }
{ const s=content('06','윈도우 개발자 모드 켜기','AI 학습(챕터 10)에 필요하다');
  const chips=['설정','시스템','개발자용','개발자 모드 켬']; let x=X; chips.forEach((c,i)=>{ const w=0.9+L.textW(c,26); const hi=i===3;
    card(s,x,3.2,w,1.1,hi?P.purple:P.white,hi?P.purple:P.lav); T(s,c,{x,y:3.2,w,h:1.1,fontSize:26,bold:true,align:'center',valign:'middle',color:hi?P.white:P.ink}); x+=w;
    if(i<3){ T(s,'→',{x,y:3.2,w:0.8,h:1.1,fontSize:30,bold:true,color:P.purple,align:'center',valign:'middle'}); x+=0.8; } });
  T(s,'윈도우 10은 설정 → 업데이트 및 보안 → 개발자용',{x:X,y:4.5,w:CW,h:0.5,fontSize:19,color:P.muted});
  card(s,X,5.4,CW,2.6,P.white,P.lav); T(s,'🤔 왜 필요할까?',{x:X+0.5,y:5.75,w:CW-1,h:0.6,fontSize:24,bold:true,color:P.purple});
  T(s,'LeRobot은 학습 중 "가장 최근 저장본"을 가리키는 바로가기(last 폴더)를 만든다. 개발자 모드가 꺼져 있으면 윈도우가 이걸 막아서 학습이 WinError 1314 오류로 멈춘다.',{x:X+0.5,y:6.45,w:CW-1,h:1.3,fontSize:21});
  band(s,8.5,'학교 PC','설정을 바꿀 수 없다면 학습할 때만 VS Code를 마우스 오른쪽 클릭 → 관리자 권한으로 실행');
  s.addNotes('개발자 모드는 심볼릭 링크 생성 권한 때문에 필요하다.'); }
{ const s=content('07','문제 해결');
  table(s,X,2.75,CW,[0.36,0.27,0.37],['증상 / 오류 메시지','원인','해결'],[
   ["'Set-ExecutionPolicy'은(는) 내부 또는 외부 명령...",'cmd 터미널이다','PowerShell로 바꾼다'],
   ["conda : 'conda' 용어가 ... 인식되지 않습니다",'미설치, 3단계 미실행, 재시작 안 함','2 → 3 → 4단계 순서대로 다시'],
   ['4단계 후에도 (base)가 안 보임','VS Code 창이 남아 있었다','VS Code 창을 모두 닫고 다시 켜기'],
   ['빨간 글씨 ...profile.ps1 파일을 로드할 수 없습니다','3단계 ①이 적용 안 됨','3단계 ① 다시. "재정의" 경고면 다음 장'],
   ["'Forceconda' 처럼 단어가 붙은 오류",'두 줄이 붙어서 붙여넣어짐','한 줄씩 다시 붙여넣기'],
   ['conda를 찾을 수 없습니다 (빨간 글씨)','다른 위치에 설치됨','Miniforge Prompt에서 where conda 로 확인'],
   ['VS Code를 켤 때마다 빨간 오류','프로필 내용이 깨짐','notepad $PROFILE 로 conda 부분 정리 후 ② 다시'],
   ['python 을 치면 Microsoft Store가 열림','가상환경 밖에서 실행','conda activate lerobot 후 다시']],{fs:16});
  s.addNotes('오류 메시지의 마지막 줄을 보고 표에서 찾게 한다.'); }
{ const s=content('08','PowerShell 연결이 끝내 안 될 때','학교 전산 정책으로 막혀 있으면 VS Code 터미널을 cmd로 바꿔 진행한다');
  steps(s,X,3.0,CW,[{t:'터미널 오른쪽 위 + 옆 ˅ → Command Prompt 선택'},{t:'터미널을 열 때마다 이 한 줄을 먼저 실행',d:'프롬프트 앞에 (base)가 붙으면 성공. C:\\miniforge3 에 설치했다면 경로를 바꾼다',code:['"%USERPROFILE%\\miniforge3\\Scripts\\activate.bat"']},{t:'이후 conda activate lerobot 부터는 똑같이 진행'},{t:'명령 안의 $env:USERPROFILE 은 %USERPROFILE% 로 바꿔 쓴다'}],{fs:22,cfs:18});
  band(s,9.55,'안심','이 교재의 명령은 모두 한 줄 형식이라 cmd에서도 그대로 쓸 수 있다');
  s.addNotes('PowerShell이 막힌 PC에서만 쓰는 우회 방법이다.'); }

// ================= CH02 =================
chapter('02','초기 설정 ②\nLeRobot 설치',['lerobot 가상환경을 만들고 켤 수 있다','LeRobot v0.6.1을 설치하고 확인한다'],'가상환경은 LeRobot만을 위한 독립된 방이다. 파이썬 3.12와 LeRobot 부품만 들어 있어 다른 프로그램과 엉키지 않고, 망가지면 지우고 다시 만들면 된다.');
{ const s=content('01','가상환경 만들고 켜기','Python 3.12 — LeRobot 0.6부터 3.12 이상만 지원한다');
  steps(s,X,3.0,10.5,[{t:'lerobot 가상환경 만들기',code:['conda create -y -n lerobot python=3.12']},{t:'가상환경 켜기',code:['conda activate lerobot']},{t:'확인: 결과에 envs\\lerobot 이 있으면 OK',code:['python -c "import sys; print(sys.executable)"']}],{fs:22,cfs:17});
  const rx=12.4,rw=R-rx; card(s,rx,3.0,rw,4.2,P.purple); T(s,'성공하면 프롬프트가',{x:rx+0.5,y:3.4,w:rw-1,h:0.5,fontSize:20,color:P.lav});
  T(s,'(lerobot)\nPS C:\\robot>',{x:rx+0.5,y:4.1,w:rw-1,h:1.6,fontSize:28,color:P.white,fontFace:L.MONO});
  T(s,'-y 는 "설치할까요?"에 미리 "예"라고 답하는 옵션',{x:rx+0.5,y:5.9,w:rw-1,h:1.0,fontSize:18,color:P.lav});
  s.addNotes('예전 자료의 Python 3.10은 이제 안 된다.'); }
{ const s=content('02','git, ffmpeg 설치');
  code(s,X,3.0,CW,['conda install -y git ffmpeg -c conda-forge'],{fs:22});
  cards(s,X,4.6,CW,[{t:'git',d:'GitHub에서 코드를 내려받고 버전을 고르는 프로그램 (다음 단계에서 사용)'},{t:'ffmpeg',d:'동영상을 압축·재생하는 프로그램 (카메라 녹화 영상 저장·학습에 사용)'}],2,2.6,{tColor:P.purple,dfs:21,tfs:30});
  band(s,7.75,'팁',"PC에 git이 있어도 이렇게 설치해 두면 'git' 용어가 ... 인식되지 않습니다 오류를 미리 막는다");
  s.addNotes('가상환경 안에 설치되므로 다른 프로그램에 영향이 없다.'); }
{ const s=content('03','LeRobot 소스 받기','v0.6.1 로 고정한다. LeRobot은 거의 매주 바뀌기 때문이다');
  steps(s,X,3.0,CW,[{t:'GitHub의 LeRobot 저장소를 C:\\robot\\lerobot 으로 복제',code:['git clone https://github.com/huggingface/lerobot.git']},{t:'복제한 폴더로 들어가기',code:['cd lerobot']},{t:'이 교재가 검증한 버전으로 맞추기',code:['git checkout v0.6.1']}],{fs:22,cfs:19});
  band(s,9.4,'안심',"You are in 'detached HEAD' state 라는 영어 안내는 오류가 아니다. 특정 버전을 보고 있다는 뜻");
  s.addNotes('최신 코드에서는 이 교재의 명령 이름이 다를 수 있어 버전을 고정한다.'); }
{ const s=content('04','GPU용 PyTorch 먼저 설치','NVIDIA 그래픽카드가 있는 PC만 한다');
  code(s,X,3.0,5.5,['nvidia-smi'],{fs:22});
  cards(s,X+6.0,3.0,CW-6.0,[{t:'표가 나온다',d:'GPU 있음 → 아래 명령 실행',hi:true},{t:"'nvidia-smi' 인식 안 됨",d:'GPU 없음 → 이 단계 건너뛰기, 학습은 Colab으로'}],2,1.9,{dfs:19,tfs:23});
  code(s,X,5.35,CW,['pip install torch==2.11.0 torchvision==0.26.0 --index-url https://download.pytorch.org/whl/cu128'],{fs:19});
  card(s,X,6.65,CW,2.3,P.white,P.lav); T(s,'🤔 왜 먼저 설치할까?',{x:X+0.5,y:6.95,w:CW-1,h:0.55,fontSize:22,bold:true,color:P.purple});
  T(s,'그냥 LeRobot을 설치하면 윈도우에서는 CPU 전용 PyTorch가 깔린다. GPU가 있어도 학습이 수십 배 느려지므로 GPU용을 먼저 깔아 둔다. 2GB 이상이라 시간이 걸린다.',{x:X+0.5,y:7.6,w:CW-1,h:1.2,fontSize:20});
  s.addNotes('PyTorch 2.11.0은 LeRobot v0.6.1이 시험한 버전과 같다.'); }
{ const s=content('05','LeRobot 설치 (SO-101용)','(lerobot) PS C:\\robot\\lerobot> 위치에서 실행한다');
  code(s,X,3.0,CW,['pip install -e ".[core_scripts,feetech,training]"'],{fs:24});
  cards(s,X,4.65,CW,[{t:'core_scripts',d:'캘리브레이션·녹화·재생 명령, 화면 표시, 키보드 입력'},{t:'feetech',d:'SO-101의 STS3215 모터가 Feetech 제품이라 그 통신 프로그램',hi:true},{t:'training',d:'AI 학습(챕터 10)에 필요한 부품'}],3,2.6,{dfs:20,tfs:28});
  band(s,7.65,'주의','따옴표 "..." 를 빼먹으면 대괄호를 잘못 읽어 오류가 난다. 10~30분 걸린다');
  T(s,'-e 는 코드를 복사하지 않고 이 폴더를 그대로 연결해서 설치한다는 뜻이다. 노란 WARNING은 대부분 무시해도 되지만 마지막 줄이 빨간 ERROR면 문제 해결을 본다.',{x:X,y:8.75,w:CW,h:1.0,fontSize:19,color:P.muted});
  s.addNotes('설치가 오래 걸리니 이 시간에 다음 장의 확인 방법을 미리 설명한다.'); }
{ const s=content('06','설치 확인');
  code(s,X,2.9,CW,['python -c "import lerobot, torch; print(\'lerobot OK\', torch.__version__, \'CUDA:\', torch.cuda.is_available())"'],{fs:18});
  table(s,X,4.2,CW,[0.45,0.55],['결과','의미'],[['`lerobot OK 2.11.0+cu128 CUDA: True`','✅ GPU까지 완벽'],['`lerobot OK 2.11.0+cpu CUDA: False` (GPU 없는 PC)','✅ 정상. 학습은 Colab으로'],['`lerobot OK 2.11.0+cpu CUDA: False` (GPU 있는 PC)','4단계 명령 끝에 --force-reinstall 을 붙여 다시']],{fs:19});
  code(s,X,7.4,6.0,['lerobot-info'],{fs:22}); T(s,'LeRobot 명령어가 등록되었는지 확인한다. 환경 정보가 오류 없이 나오면 성공',{x:X+6.5,y:7.4,w:CW-6.5,h:0.95,fontSize:20,valign:'middle'});
  s.addNotes('lerobot OK 가 나오면 설치 완료.'); }
{ const s=content('07','VS Code 인터프리터 지정');
  const chips=['Ctrl + Shift + P','Python: Select Interpreter',"Python 3.12 ('lerobot')"]; let x=X; chips.forEach((c,i)=>{ const w=0.9+L.textW(c,24); const hi=i===2;
    card(s,x,3.2,w,1.1,hi?P.purple:P.white,hi?P.purple:P.lav); T(s,c,{x,y:3.2,w,h:1.1,fontSize:24,bold:true,align:'center',valign:'middle',color:hi?P.white:P.ink}); x+=w;
    if(i<2){ T(s,'→',{x,y:3.2,w:0.8,h:1.1,fontSize:30,bold:true,color:P.purple,align:'center',valign:'middle'}); x+=0.8; } });
  card(s,X,4.9,CW,2.4,P.white,P.lav); T(s,'📖 무엇이 바뀌나?',{x:X+0.5,y:5.25,w:CW-1,h:0.55,fontSize:22,bold:true,color:P.purple});
  T(s,'VS Code의 코드 편집기와 노트북이 lerobot 가상환경의 파이썬을 쓰도록 지정한다. 터미널은 영향이 없고 conda activate lerobot 으로 정한다.',{x:X+0.5,y:5.9,w:CW-1,h:1.2,fontSize:21});
  band(s,7.7,'안 보이면','VS Code에 Python 확장(Microsoft)이 설치되어 있는지 확인한다');
  s.addNotes('노트북 실습을 할 때 필요하다.'); }
{ const s=content('08','다음에 다시 작업할 때 (매번!)','VS Code를 켜고 터미널에서 이 두 줄만 실행한다');
  code(s,X,3.0,8.4,['conda activate lerobot'],{fs:24}); code(s,X+9.1,3.0,CW-9.1,['cd C:\\robot\\lerobot'],{fs:24});
  T(s,'프롬프트가 (lerobot) PS C:\\robot\\lerobot> 이면 준비 완료. 이후 모든 챕터는 이 상태에서 시작한다',{x:X,y:4.25,w:CW,h:0.6,fontSize:21,bold:true,color:P.purple});
  table(s,X,5.2,CW,[0.4,0.6],['하고 싶은 것','명령'],[['가상환경 켜기','`conda activate lerobot`'],['가상환경 끄기','`conda deactivate`'],['가상환경 목록 (* = 현재)','`conda env list`'],['지금 어떤 파이썬인지 확인','`python -c "import sys; print(sys.executable)"`']],{fs:19});
  s.addNotes('매 수업 시작 루틴으로 만든다.'); }
{ const s=content('09','문제 해결');
  table(s,X,2.75,CW,[0.38,0.62],['증상 / 오류 메시지','원인 / 해결'],[
   ['conda activate lerobot 해도 (lerobot)이 안 붙음','PowerShell–conda 연결 문제 → 챕터 01의 3·4단계'],
   ['EnvironmentNameNotFound: lerobot','가상환경이 아직 없다 → 1단계 conda create'],
   ["'git' 용어가 ... 인식되지 않습니다",'2단계 git 설치를 빠뜨림, 또는 (lerobot) 밖에서 실행'],
   ["destination path 'lerobot' already exists",'이미 받은 폴더가 있다 → cd lerobot 후 git checkout v0.6.1 만'],
   ["Package 'lerobot' requires a different Python",'가상환경 밖이거나 3.12 미만 → conda activate lerobot'],
   ['Microsoft Visual C++ 14.0 or greater is required','Visual Studio Build Tools 설치 (C++를 사용한 데스크톱 개발)'],
   ["'lerobot-info' 용어가 ... 인식되지 않습니다",'(lerobot) 밖이거나 5단계 실패 → 5단계 다시'],
   ['pip 설치 중 ReadTimeout 등 네트워크 오류','같은 명령을 다시 실행하면 이어서 받는다']],{fs:17});
  band(s,9.85,'최후의 방법','conda deactivate → conda remove -y -n lerobot --all 후 1단계부터 다시 (데이터는 지워지지 않는다)');
  s.addNotes('3 channel Terms of Service accepted 안내는 오류가 아니다.'); }

// ================= CH03 =================
chapter('03','USB 포트 찾기',['리더암과 팔로워암의 COM 포트 번호를 알아낸다','이후 명령에서 포트 번호를 바꿔 쓸 수 있다'],'PC에 팔 두 개를 꽂으면 윈도우는 COM3, COM4 같은 번호표를 붙이지만 어느 쪽이 리더인지는 알려 주지 않는다. 꽂혀 있을 때와 뽑았을 때의 목록을 비교하면, 사라진 번호가 바로 그 팔의 번호다.');
{ const s=content('01','준비');
  steps(s,X,3.0,8.6,['두 팔 모두 전원 어댑터 꽂기','두 팔 모두 USB로 PC에 연결','터미널이 (lerobot) PS C:\\robot\\lerobot> 인지 확인'],{fs:24});
  T(s,'아니라면 이 두 줄',{x:10.9,y:3.0,w:R-10.9,h:0.5,fontSize:22,bold:true,color:P.purple});
  code(s,10.9,3.65,R-10.9,['conda activate lerobot'],{fs:21}); code(s,10.9,4.8,R-10.9,['cd C:\\robot\\lerobot'],{fs:21});
  s.addNotes('챕터 02의 매번 시작 루틴과 같다.'); }
{ const s=content('02','팔로워암 포트 찾기');
  code(s,X,3.0,7.0,['lerobot-find-port'],{fs:26});
  T(s,'연결된 포트 목록을 보여 준 뒤 USB를 하나 뽑으라고 안내한다. 뽑고 Enter를 누르면 사라진 포트를 알려 준다',{x:X,y:4.3,w:7.0,h:1.6,fontSize:20,color:P.muted});
  code(s,X+7.6,3.0,CW-7.6,['Finding all available ports for the MotorsBus.',"Ports before disconnecting: ['COM3', 'COM4']",'Remove the USB cable from your MotorsBus and press Enter when done.','',"The port of this MotorsBus is 'COM3'",'Reconnect the USB cable.'],{fs:16,colors:[P.soft,P.soft,P.orange,P.white,P.mint,P.soft]});
  steps(s,X,6.4,CW,[{t:'주황색 안내가 나오면 팔로워암(흰 팔)의 USB만 뽑고 Enter'},{t:'초록색 결과의 COM 번호를 적고, USB를 같은 구멍에 다시 꽂기'}],{fs:22});
  band(s,9.5,'주의','Enter를 누르기 전에 반드시 USB를 뽑는다. 안 뽑으면 No difference was found 오류가 난다');
  s.addNotes('예시에서는 팔로워암이 COM3이다.'); }
{ const s=content('03','리더암 포트 찾기','같은 명령을 한 번 더 실행하고, 이번에는 리더암(검은 팔)의 USB만 뽑는다');
  code(s,X,3.0,7.0,['lerobot-find-port'],{fs:26});
  table(s,X+7.6,3.0,CW-7.6,[0.55,0.45],['팔','내 포트 번호'],[['팔로워암 (Follower)','COM ______'],['리더암 (Leader)','COM ______']],{fs:24});
  card(s,X,6.0,CW,2.6,P.white,P.lav); T(s,'💡 같은 구멍 = 같은 번호',{x:X+0.5,y:6.35,w:CW-1,h:0.55,fontSize:22,bold:true,color:P.purple});
  T(s,'윈도우는 보통 같은 장치를 같은 USB 구멍에 꽂으면 같은 번호를 준다. USB 구멍에 "리더", "팔로워" 스티커를 붙여 두면 다음 수업에서 다시 찾지 않아도 된다. 장치 관리자 → 포트(COM & LPT)에서도 볼 수 있다.',{x:X+0.5,y:7.0,w:CW-1,h:1.4,fontSize:20});
  s.addNotes('두 번호를 학생 노트에 적게 한다.'); }
{ const s=content('04','명령에서 포트 번호 바꿔 쓰기','이 교재의 명령은 팔로워 = COM3, 리더 = COM4 를 예시로 쓴다');
  table(s,X,3.0,CW,[0.33,0.27,0.4],['명령 속 글자','뜻','바꿀 것'],[['`--robot.port=COM3`','팔로워암 포트','내 팔로워 포트'],['`--teleop.port=COM4`','리더암 포트','내 리더 포트'],['`--robot.id=my_follower`','팔로워암 이름','바꾸지 않는다'],['`--teleop.id=my_leader`','리더암 이름','바꾸지 않는다']],{fs:22});
  band(s,7.4,'팁','명령을 붙여넣은 뒤 Enter 전에 숫자만 고친다. 메모장에 미리 고쳐 두고 복사해 쓰면 편하다');
  s.addNotes('이름(id)은 캘리브레이션 파일 이름이 되므로 절대 바꾸지 않는다.'); }

// ================= CH04 =================
chapter('04','모터 ID 설정',['새 모터 6개에 ID 1~6과 통신 속도를 저장한다','리더암 모터의 기어비가 다르다는 것을 안다'],'모터 6개는 전선 하나로 줄줄이 연결된다. 새 모터는 모두 1번으로 나오기 때문에, 조립 전에 하나씩 따로 연결해 출석번호를 바꿔 준다. 한 번만 하면 된다.','조립 완성품은 건너뜀');
{ const s=content('01','모터 6개의 출석번호','이 번호는 모터 안의 메모리(EEPROM)에 저장되어 한 번만 하면 된다');
  cards(s,X,3.0,CW,[{num:'1',t:'shoulder_pan',d:'어깨 좌우 회전 (몸통 돌리기)'},{num:'2',t:'shoulder_lift',d:'어깨 위아래'},{num:'3',t:'elbow_flex',d:'팔꿈치 굽히기'},{num:'4',t:'wrist_flex',d:'손목 위아래'},{num:'5',t:'wrist_roll',d:'손목 돌리기'},{num:'6',t:'gripper',d:'집게 열고 닫기',hi:true}],3,2.9,{dfs:20,tfs:24});
  s.addNotes('반 친구들처럼 출석번호가 있어야 3번, 팔꿈치 접어! 하고 부를 수 있다.'); }
{ const s=content('02','리더암 모터는 섞이면 안 된다!','팔로워암은 6개 모두 1/345. 리더암은 3종류를 섞어 쓴다');
  table(s,X,3.0,10.2,[0.5,0.2,0.3],['리더암 관절','모터','기어비'],[['Base / Shoulder Pan','1','1/191'],['Shoulder Lift','2','1/345'],['Elbow Flex','3','1/191'],['Wrist Flex','4','1/147'],['Wrist Roll','5','1/147'],['Gripper','6','1/147']],{fs:21});
  const rx=12.0,rw=R-rx; card(s,rx,3.0,rw,5.4,P.purple); T(s,'🤔 왜 다를까?',{x:rx+0.5,y:3.4,w:rw-1,h:0.6,fontSize:24,bold:true,color:P.white});
  T(s,'기어비 숫자가 클수록(1/345) 힘은 세지만 손으로 돌리기 뻑뻑하다.\n\n리더암은 사람 손이 움직이는 팔이라 대부분 가벼운 기어를 쓰고, 팔 무게를 버텨야 하는 어깨(2번)만 센 기어를 쓴다.',{x:rx+0.5,y:4.15,w:rw-1,h:4.0,fontSize:20,color:P.white});
  band(s,9.4,'팁','시작 전에 모터를 기어비별로 나눠 놓고 마스킹테이프로 1~6 번호를 붙인다');
  s.addNotes('모터 스티커에 기어비가 적혀 있다.'); }
{ const s=content('03','팔로워암 모터 설정');
  steps(s,X,3.0,8.4,[{t:'보드에 전원과 USB 연결, 모터는 아직 연결하지 않기'},{t:'설정 도우미 실행',code:['lerobot-setup-motors --robot.type=so101_follower --robot.port=COM3']},{t:"화면 안내대로 'gripper' 모터 하나만 연결하고 Enter"},{t:'6 → 5 → 4 → 3 → 2 → 1 순서로 반복'}],{fs:21,cfs:15});
  const rx=10.3,rw=R-rx; code(s,rx,3.0,rw,["Connect the controller board to the 'gripper' motor only and press enter.","'gripper' motor id set to 6","Connect the controller board to the 'wrist_roll' motor only and press enter."],{fs:15,colors:[P.orange,P.mint,P.orange]});
  card(s,rx,5.5,rw,2.6,P.white,P.lav); T(s,'Waveshare 보드라면',{x:rx+0.45,y:5.85,w:rw-0.9,h:0.5,fontSize:20,bold:true,color:P.purple});
  T(s,'보드 위 점퍼 2개가 B 채널(USB) 쪽에 꽂혀 있어야 한다. 매번 Enter 전에 전원 케이블이 빠지지 않았는지 확인한다.',{x:rx+0.45,y:6.45,w:rw-0.9,h:1.5,fontSize:18});
  band(s,9.55,'주의','반드시 보드에 모터 1개만 연결된 상태에서 Enter. 두 개가 연결되면 둘 다 같은 번호가 된다');
  s.addNotes('모터 케이블은 보드에서만 뽑고 모터 쪽은 꽂아 둬도 된다.'); }
{ const s=content('04','리더암 모터 설정','리더암 보드로 바꿔 연결하고, 기어비를 확인하며 똑같이 진행한다');
  code(s,X,3.0,CW,['lerobot-setup-motors --teleop.type=so101_leader --teleop.port=COM4'],{fs:22});
  card(s,X,4.5,CW,2.4,P.white,P.lav); T(s,'📖 robot 대신 teleop?',{x:X+0.5,y:4.85,w:CW-1,h:0.55,fontSize:22,bold:true,color:P.purple});
  T(s,'리더암은 로봇을 "조종하는 장치"이므로 robot 대신 teleop(원격조작기)이라는 이름을 쓴다. 이 구분은 이후 모든 명령에서 똑같다.',{x:X+0.5,y:5.5,w:CW-1,h:1.2,fontSize:21});
  s.addNotes('팔로워는 robot, 리더는 teleop.'); }
{ const s=content('05','오류가 나면');
  table(s,X,3.0,CW,[0.35,0.65],['증상','확인할 것'],[['아무 반응 없이 오류','① 전원 어댑터 ② USB 케이블 ③ 보드↔모터 3핀 케이블, 세 군데를 모두 다시 꽂는다'],['There is no status packet!','모터 쪽 3핀 케이블이 헐겁다. 딸깍 소리 날 때까지 꽂는다'],['Could not connect on port','포트 번호가 챕터 03에서 찾은 번호와 같은지, 다른 프로그램이 포트를 쓰고 있지 않은지']],{fs:21});
  s.addNotes('케이블 문제가 가장 흔하다.'); }
