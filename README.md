# 목차
[페이지 라우팅 0 - React SPA & CSR](#페이지-라우팅-0---react-spa--csr)<br/>
[페이지 라우팅 1 - React Router 기본](#페이지-라우팅-1---react-router-기본)<br/>
[페이지 라우팅 2 - React Router 응용](#페이지-라우팅-2---react-router-응용)<br/>
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

```js
import './App.css';
// 아래와 같이 { BrowserRouter, Route, Routes }를 연결해줘야 한다.
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouteTest from './components/RouteTest';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

function App() {
  // BrowserRouter로 감싸고 Routes로 감싸고 안에 Route를 통해 경로를 만들 수 있다.
  // RouteTest를 불러와 실제 화면에서 클릭할 수 있도록 해주었다.
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/new" element={<New/>} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/diary" element={<Diary/>} />
        </Routes>
        <RouteTest/>
        {/* 아래와 같은 방식을 사용하면 SPA가 아닌 MPA방식으로 화면이 깜빡거리게 된다. */}
        {/* <a href={"/new"}>NEW로 이동</a> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
```

```js
// SPA를 구현하기 위해서 {Link}를 불러온다.
import {Link} from 'react-router-dom';

const RouteTest = () => {
  // 아래와 같이 Link 사용
  return (
    <>
      <Link to={'/'}>HOME</Link>
      <br/>
      <Link to={'/new'}>NEW</Link>
      <br/>
      <Link to={'/edit'}>EDIT</Link>
      <br/>
      <Link to={'/diary'}>DIARY</Link>
      <br/>
    </>
  )
}

export default RouteTest;
```

# 페이지 라우팅 2 - React Router 응용

### React Router Dom의 유용한 기능

#### REACT ROUTER V6
REACT에서 CSR기반의 페이지 라우팅을 할 수 있게 해주는 라이브러리
1. Path Variable - useParams
2. Query String - useSearchParams
3. Page Moving - useNavigate

### Path Variable
```js
function App() {
  // useParams를 사용하려면 별도의 path설정을 해줘야 한다.
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/new" element={<New/>} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/diary/:id" element={<Diary/>} />
          {/* 보통은 id가 걸릴 경우와 안걸릴 경우로 나누어 path설정을 해준다. */}
          <Route path="/diary" element={<Diary/>} />
        </Routes>
        <RouteTest/>
      </div>
    </BrowserRouter>
  );
}
```
```js
import { useParams } from "react-router-dom";

const Diary = () => {
  // diary/10이라면 10을 반환한다.
  const {id} = useParams();
  console.log(id)

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 Diary 입니다.</p>
    </div>
  )
}

export default Diary;
```

### Query String
웹 페이지에 데이터를 전달하는 가장 간단한 방법

/edit?id=10&mode=dark => Query String

Query String으로 전달하면 별도의 처리를 안해줘도 자동으로 맵핑이 된다.

useParams와 다르게 useSearchParams는 두개의 인자를 배열로 반환하게 된다.

```js
// 전달한 query srting http://localhost:3000/edit?id=10&mode=dark
import { useSearchParams } from "react-router-dom";

const Edit = () => {
  // searchParams는 get을 통해 전달받은 Query String들을 꺼내 사용할 수 있는 용도.
  // setSearchParams는 searchParams를 변경시키는 기능을 한다. Query String을 바꿀 수 있다는 뜻이다.
  const [searchParams, setSearchParams] = useSearchParams();

  // get메서드를 통해 id를 가져오면 10이 출력된다.
  const id = searchParams.get('id');
  console.log(id);

  // mode는 dark가 출력된다.
  const mode = searchParams.get('mode');
  console.log(mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 Edit 입니다.</p>
      {/* Query String이 ?who=yong로 변경된다. */}
      <button onClick={() => setSearchParams({who:'yong'})}>QS 변경</button>
    </div>
  )
}

export default Edit;
```

### Page Moving
```js
import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  // useNavigate는 경로를 옮겨줄 수 있는 함수
  // 사용예시: 로그인이 안된 사용자가 로그인 페이지로 가려고 할때 로그인 값을 검사해서 로그인을 안했다면 로그인페이지로 강제로 보내기
  const navigate = useNavigate();
  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 Edit 입니다.</p>
      <button onClick={() => setSearchParams({who:'yong'})}>QS 변경</button>
      {/* Link를 사용하지 않고 useNavigate()를 통해 SPA를 구현할 수 있다. */}
      <button onClick={() => {navigate("/home")}}>HOME로 이동</button>
      {/* -1을 넣으면 뒤로가기를 구현할 수 있다. */}
      <button onClick={() => {navigate(-1)}}>뒤로가기</button>
    </div>
  )
}

export default Edit;
```