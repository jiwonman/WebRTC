"# WebRTC" 

## 사용방법

- openssl 설치
1. https://sourceforge.net/projects/openssl/
2. openssl 설치 후 [환경 변수] - [시스템 변수] - [path] - openssl 설치한 위치의 bin 추가
3. [환경변수] - [시스템 변수] - OPENSSL_CONF 추가
4. 해당 cmd 폴더에 들어가서 
```
>> openssl genrsa 1024 > private.pem
>> openssl req -x509 -new -key private.pem > public.pem
```
해당 명령어 입력
5. npm install 
6. npm start 

## 접속 방법
기존 http://localhost:3000 이 아니라
https://localhost:3000 으로 접속한다.

### 주의사항
Windows Os는 Chrome 사용이 가능하지만
Mac Os는 Chrome 사용이 안되서 Safari, Edge 등 다른 브라우저에서 사용

### 추가할 사항
기존에 했던 Sokcet 채팅 구현 옮겨서 실시간 화상 + 채팅 적용하기
