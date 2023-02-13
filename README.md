# 목차
[페이지 라우팅 0 - React SPA & CSR](#페이지-라우팅-0---react-spa--csr)<br/>
[페이지 라우팅 1 - React Router 기본](#페이지-라우팅-1---react-router-기본)<br/>
<br/>

# 페이지 라우팅 0 - React SPA & CSR

### ROUTING이란?
어떤 네트워크 내에서 통신 데이터를 보낼 경로를 선택하는 일련의 과정

- ROUTER: 데이터의 경로를 실시간으로 지정해주는 역할을 하는 무언가
- ROUTE + ING: 경로를 정해주는 행위 자체와 그런 과정들을 다 포함하여 일컫는 말

### PAGE ROUTING이란?
브라우저가 서버에게 경로를 요청하고 서버는 경로를 찾아 응답한다.

- Multipage Application - MPA(전통적인 방식)
  - 서버가 여러개의 페이지를 가지고 클라이언트가 요청할때마다 요청하는 페이지를 응답하는 방식
  - 화면이 깜빡거림
- Single Page Application - SPA(react)
  - 클라이언트가 경로를 요청해도 서버는 하나의 페이지만을 응답한다.
  - REACT APP이 알아서 페이지를 업데이트 해준다. React는 서버에게 데이터만을 요청하여 전달 받는다.
  - 우선 REACT APP이 웹페이지를 먼저 바꿔버리고 데이터가 없다면 로딩은 잠깐 띄어놓고 데이터가 들어오면 그때 데이터를 보여주는 방식
  - 화면이 깜빡거리지 않음(빠른 페이지 이동)
  - 클라이언트가 직접 렌더링 하는 방식을 Client Side Rendering - CSR이라고 한다.

# 페이지 라우팅 1 - React Router 기본
강의 내용의 npm 설치 코드를 발견하지 못했다.
[React Router](#https://reactrouter.com/en/main)
```
npm install react-router-dom@6
```