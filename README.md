# cryptoBuiltInBoard

비밀번호 암호화를 기반으로한 게시판 기능을 제공하는 서비스입니다.

#### 목차
- [프로젝트 설명](https://github.com/wlsgml719/cryptoBuiltInBoard/edit/main/README.md#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%84%A4%EB%AA%85)
  - 개발기간
  - 사용기술  
  - [요구사항 분석](https://github.com/wlsgml719/cryptoBuiltInBoard/edit/main/README.md#%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD-%EB%B6%84%EC%84%9D)
- [데이터 모델링](https://github.com/wlsgml719/cryptoBuiltInBoard/edit/main/README.md#%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%AA%A8%EB%8D%B8%EB%A7%81)
- [REST API](https://github.com/wlsgml719/cryptoBuiltInBoard/edit/main/README.md#%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%AA%A8%EB%8D%B8%EB%A7%81)
- [테스트]()
<br/> 
  
## 🔍 프로젝트 설명
  ### 개발기간
   2022.11.04 - 2022.11.05
  ### 사용기술
  Node.js, Nest.js, TypeScript, MySQL
<br/>
  
### 요구사항 분석  
- 게시글 작성시 비밀번호를 설정해야합니다.
  - 게시글은 제목 20자, 본문 200자로 제한됩니다.
  - 게시글의 제목과 본문에는 이모지가 포함될 수 있습니다.
  - 비밀번호 형태는 6자 이상이며, 숫자 1개 이상을 포함합니다.
  - 비밀번호는 암호화를 적용해 저장합니다.
- 게시글 수정/삭제시 비밀번호가 일치해야합니다.
- 게시글 최신순 20개를 조회할 수 있습니다.
<br/>
  
## 데이터 모델링

|논리적 이름|물리적 이름|데이터 형식|
|:---:|:---:|:---:|
|아이디|id|int|
|제목|title|varChar(80)|
|본문|content|text|
|비밀번호|password|text|
|생성일|createdAt|datatime|
<br/>
  

## REST API Spec

|**Method**|**URL**|**Description**|**Request**|**Response<br>(Success)**|**Response<br>(Fail)**|
|:---:|---|---|---|:---:|:---:|
|POST|/api/posts|게시글을 작성합니다.|(Body)<br>title: 글 제목<br>content: 글 내용<br>password: 비밀번호|201|400<br><br>{message: “제목은 20자 내외로 작성해주세요.”}<br><br>{ message: “본문은 200자 내외로 작성해주세요.”}<br><br>{message: '비밀번호는 최소 6자 이상입니다.'}<br><br>{message: '비밀번호는 최소 1개의 숫자를 포함해야합니다.'}|
|GET|/api/posts|게시글을 20개씩 최신순으로 조회합니다.|(Query)<br>offset: 조회를 시작할 게시물 아이디|200|
|PUT|/api/posts/:postId|비밀번호를 받아 게시글을 수정합니다.|(Path)<br>postId: 글 Id<br><br>(Body)<br>title: 글 제목<br>content: 글 내용<br>password: 비밀번호|201|{message: “비밀번호가 일치하지 않습니다.”}|
|DELETE|/api/posts/:postId|비밀번호를 받아 게시글을 삭제합니다.|(Path)<br>postId: 글 Id<br><br>(Body)<br>password: 비밀번호|201|{message: “비밀번호가 일치하지 않습니다.”}|


## 🛠 테스트
