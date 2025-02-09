## OOTC (Outfit of the Closet)

OOTC는 옷의 정보를 사전에 등록하여 쉽게 찾을 수 있게 하고, 소유하고 있는 옷의 데이터를 이용하여 코디를 설정하고 검색할 수 있도록 도와주는 프로젝트입니다.

## 프로젝트 개요

### 개발 인원
- **정관훈** (프론트엔드 개발자)
- **이현태** (백엔드 개발자)

### 개발 기간
- **시작일:** 2024년 4월
- **상태:** 완료

### 주요 기능
1. **회원가입**
2. **로그인**
3. **오늘의 옷 추천**: 현재 날씨에 따라 옷을 추천받습니다.
4. **옷 CRUD**: 옷의 정보를 생성, 조회, 수정, 삭제합니다.
5. **코디 CRUD**: 코디를 관리합니다.
6. **코디 추천**: 옷장 데이터를 기반으로 코디를 추천받습니다.

→ 버전 2에서는 다양한 기능이 추가될 예정입니다.

## 개발 스택

| 카테고리 | 사용 기술 |
| -------- | ----------------- |
| **백엔드** | Nest.js, Prisma |
| **데이터베이스** | MySQL |
| **인프라** | AWS EC2, Docker, Route 53, ELB, S3|
| **도구** | Slack, Postman, Swagger |

## ERD


![image](https://github.com/OOTC-project/OOTC-BE/assets/50650892/91f6a51f-7745-44cc-a326-90a3ab2e6965)


### 도전과제

1. Prisma ORM 사용
2. Docker compose 와 AWS를 사용하여 기본적인 배포 관련 경험
3. 헥사고날 아키텍처로 코드 작성
4. 추후 개발 계획
    1. 테스트 코드 작성
    2. CI/CD 적용 ( 진행중 )
    3. 소셜 로그인 구현
    4. session 방식 로그인 구현

### 인프라 다이어그램
<img width="928" alt="image" src="https://github.com/OOTC-project/OOTC-BE/assets/50650892/37ab3970-fa24-4066-84b0-70f3af4b9888">

### Swagger
https://api.ootc.store/docs

