import { Field, InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class InterestedJobInput {
  @Field(() => JobType, {
    description: '관심 직업 1지망',
  })
  interestedJob1: JobType;

  @Field(() => JobType, {
    description: '관심 직업 2지망',
  })
  interestedJob2: JobType;

  @Field(() => JobType, {
    description: '관심 직업 3지망',
  })
  interestedJob3: JobType;
}

export enum JobType {
  SoftwareDeveloper = '소프트웨어 개발자',
  Doctor = '의사',
  Nurse = '간호사',
  Lawyer = '변호사',
  Teacher = '교사',
  Manager = '경영자',
  Accountant = '회계사',
  MarketingExpert = '마케팅 전문가',
  GraphicDesigner = '그래픽 디자이너',
  Engineer = '엔지니어',
  Architect = '건축가',
  Painter = '화가',
  Musician = '뮤지션',
  Writer = '작가',
  Journalist = '기자',
  FilmDirector = '영화 감독',
  Psychologist = '심리학자',
  SocialWorker = '사회복지사',
  EnvironmentalEngineer = '환경 엔지니어',
  DigitalMarketer = '디지털 마케터',
  DataAnalyst = '데이터 분석가',
  Biologist = '생물학자',
  Astronomer = '천문학자',
  Statistician = '통계학자',
  MusicProducer = '음악 프로듀서',
  Photographer = '사진작가',
  WebDeveloper = '웹 개발자',
  MedicalDeviceEngineer = '의료 기기 엔지니어',
  Beautician = '미용사',
  SportsTrainer = '스포츠 트레이너',
  InteriorDesigner = '인테리어 디자이너',
  Actor = '연극 배우',
  RestaurantOwner = '레스토랑 주인',
  TravelWriter = '여행 작가',
  Chemist = '화학자',
  Farmer = '농부',
  InternationalRelationsExpert = '국제 관계 전문가',
  YouTuber = '유튜버',
  FoodResearcher = '음식 연구가',
  OfficeAdministrator = '사무원',
  MedicalTechnician = '의료 기술자',
  CarDesigner = '자동차 디자이너',
  SportsCommentator = '스포츠 해설가',
  SocialMediaManager = '소셜미디어 매니저',
  SalesExpert = '세일즈 전문가',
  MarineBiologist = '해양학자',
  Mechanic = '기계공',
  FinancialAnalyst = '금융 애널리스트',
  EarlyChildhoodEducator = '유아교육사',
  OfficeManager = '사무 관리자',
}

registerEnumType(JobType, {
  name: 'JobType',
  description: '직업 종류',
});
