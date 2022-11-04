# cryptoBuiltInBoard

비밀번호 암호화를 기반으로한 게시판 기능 구현

## 요구사항 분석
### 사용자

- 게시글 작성시 비밀번호 설정

- 비밀번호 일치시 게시글 수정

- 비밀번호 일치시 게시글 삭제

- 게시글 조회 (최신순, 20개)

### 게시글

- 제목 20자, 본문 200자 (이모지 포함)

### 비밀번호

- 6자 이상, 숫자를 1개 이상 포함

- 암호화 적용

## ERD

|logical|physical||type|
|:---:|:---:|:---:|:---:|
|아이디|id|PK/AI|int|
|제목|title||varChar(80)|
|본문|content||text|
|비밀번호|password||text|
|생성일|createdAt||datatime|

## REST API Spec

|**Method**|**URL**|**Description**|**Request**|**Response<br>(Success)**|**Response<br>(Fail)**|
|:---:|---|---|---|:---:|:---:|
|POST|/api/posts|게시글을 작성합니다.|(Body)<br>title: 글 제목<br>content: 글 내용<br>password: 비밀번호|201|400<br><br>{message: “제목은 20자 내외로 작성해주세요.”}<br><br>{ message: “본문은 200자 내외로 작성해주세요.”}<br><br>{message: '비밀번호는 최소 6자 이상입니다.'}<br><br>{message: '비밀번호는 최소 1개의 숫자를 포함해야합니다.'}|
|GET|/api/posts|게시글을 20개씩 최신순으로 조회합니다.|(Query)<br>offset: 조회를 시작할 게시물 아이디|200|
|PUT|/api/posts/:postId|비밀번호를 받아 게시글을 수정합니다.|(Path)<br>postId: 글 Id<br><br>(Body)<br>title: 글 제목<br>content: 글 내용<br>password: 비밀번호|201|{message: “비밀번호가 일치하지 않습니다.”}|
|DELETE|/api/posts/:postId|비밀번호를 받아 게시글을 삭제합니다.|(Path)<br>postId: 글 Id<br><br>(Body)<br>password: 비밀번호|201|{message: “비밀번호가 일치하지 않습니다.”}|
