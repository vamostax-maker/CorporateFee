import { useState, useMemo } from "react";
import "./App.css";

const RAW_DATA = [
  { no: 1, manager: "곽민영 팀장", company: "(주) 선 건축사사무소", bizno: "210-88-03112", ceo: "이인수", rev2024: 170482728, rev2025: 195991818, fee2024: 1006000, fee2025base: 984177.91, fee_adjust: 1181013.49, fee2026: 1181013.49, fee2026vat: 1181013.49 },
  { no: 2, manager: "곽민영 팀장", company: "(주)두루두루", bizno: "572-86-03388", ceo: "황신혜", rev2024: 145747182, rev2025: 208627271, fee2024: null, fee2025base: 1018293.63, fee_adjust: 0, fee2026: 1018293.63, fee2026vat: 509146.82 },
  { no: 3, manager: "곽민영 팀장", company: "주식회사 그로스어스", bizno: "359-86-02511", ceo: "엄도환", rev2024: 314445328, rev2025: 408762117, fee2024: 1567000, fee2025base: 1573038.77, fee_adjust: 1887646.53, fee2026: 1887646.53, fee2026vat: 2076411.18 },
  { no: 4, manager: "곽민영 팀장", company: "주식회사 카이앤컴퍼니", bizno: "880-87-02633", ceo: "강승완", rev2024: 246448000, rev2025: 263986187, fee2024: 440000, fee2025base: 1167762.70, fee_adjust: 0, fee2026: 1167762.70, fee2026vat: 1284538.98 },
  { no: 5, manager: "곽민영 팀장", company: "주식회사 동진유통", bizno: "640-87-00167", ceo: "서동진", rev2024: 4660513272, rev2025: 4790322319, fee2024: 4306000, fee2025base: 4735483.72, fee_adjust: "예외", fee2026: 4306000, fee2026vat: 4306000 },
  { no: 6, manager: "곽민영 팀장", company: "스포니스 본사(HQ)", bizno: "871-87-01703", ceo: "심규화", rev2024: 311770309, rev2025: 335083571, fee2024: 3300000, fee2025base: 1337267.43, fee_adjust: 4000000, fee2026: 4000000, fee2026vat: 4400000 },
  { no: 7, manager: "곽민영 팀장", company: "스포니스 약수", bizno: "477-85-01680", ceo: "김태우", rev2024: 216047187, rev2025: 195150914, fee2024: 1141000, fee2025base: 981907.47, fee_adjust: 1080098.21, fee2026: 1080098.21, fee2026vat: 1080098.21 },
  { no: 8, manager: "곽민영 팀장", company: "스포니스 반포", bizno: "412-85-10877", ceo: "정진욱", rev2024: 558191726, rev2025: 639619282, fee2024: 2115000, fee2025base: 2062352.78, fee_adjust: 3000000, fee2026: 3000000, fee2026vat: 3000000 },
  { no: 9, manager: "곽민영 팀장", company: "스포니스 신대방", bizno: "542-85-02232", ceo: "지무엽", rev2024: 258617958, rev2025: 229772425, fee2024: 1268000, fee2025base: 1075385.55, fee_adjust: 1182924.10, fee2026: 1182924.10, fee2026vat: 1182924.10 },
  { no: 10, manager: "곽민영 팀장", company: "스포니스 군자 PT&헬스", bizno: "493-85-02740", ceo: "심규화", rev2024: null, rev2025: 98711757, fee2024: 1016000, fee2025base: 828945.26, fee_adjust: 994734.31, fee2026: 994734.31, fee2026vat: 1094207.74 },
  { no: 11, manager: "곽민영 팀장", company: "㈜헬로월드랩스", bizno: "468-88-02575", ceo: "김진호", rev2024: 392446884, rev2025: 1095190141, fee2024: 1824000, fee2025base: 2629258.38, fee_adjust: 3155110.06, fee2026: 3155110.06, fee2026vat: 3470621.06 },
  { no: 12, manager: "곽민영 팀장", company: "주식회사 몬도", bizno: "872-88-02702", ceo: "명건국", rev2024: 426115096, rev2025: 198355366, fee2024: 2148000, fee2025base: 990559.49, fee_adjust: 1500000, fee2026: 1500000, fee2026vat: 1650000 },
  { no: 13, manager: "곽민영 팀장", company: "주식회사 힌지큐브", bizno: "829-87-02604", ceo: "김갑령", rev2024: 64000000, rev2025: 150080000, fee2024: 1100000, fee2025base: 860216, fee_adjust: 1210000, fee2026: 1210000, fee2026vat: 1331000 },
  { no: 14, manager: "곽민영 팀장", company: "주식회사 링커", bizno: "719-86-03240", ceo: "차가람", rev2024: 49685954, rev2025: 1226619485, fee2024: 550000, fee2025base: 2704173.11, fee_adjust: 3245007.73, fee2026: 3245007.73, fee2026vat: 3569508.50 },
  { no: 15, manager: "곽민영 팀장", company: "주식회사 라플람", bizno: "215-86-58700", ceo: "이윤석", rev2024: 3771038634, rev2025: 6111192316, fee2024: 4400000, fee2025base: 5297260.39, fee_adjust: 7000000, fee2026: 7000000, fee2026vat: 7700000 },
  { no: 16, manager: "곽민영 팀장", company: "주식회사 아카식랩스", bizno: "771-87-03610", ceo: "조은제", rev2024: null, rev2025: 26363637, fee2024: 550000, fee2025base: 600000, fee_adjust: 700000, fee2026: 700000, fee2026vat: 770000 },
  { no: 17, manager: "방민혁 주임", company: "한국자동차중개사협동조합", bizno: "220-88-58841", ceo: "김영선", rev2024: 12100000, rev2025: 30900000, fee2024: 550000, fee2025base: 600000, fee_adjust: 700000, fee2026: 700000, fee2026vat: 770000 },
  { no: 18, manager: "방민혁 주임", company: "케이유융합소프트웨어연구센터㈜", bizno: "326-87-02032", ceo: "김현조", rev2024: 1600214700, rev2025: 1856903590, fee2024: 3465000, fee2025base: 3063435.05, fee_adjust: 3676122.06, fee2026: 3676122.06, fee2026vat: 3676122.06 },
  { no: 19, manager: "방민혁 주임", company: "베이스라인파트너스", bizno: "622-87-01625", ceo: "정경호", rev2024: 5180654060, rev2025: 6777836798, fee2024: 5131800, fee2025base: 5610583.30, fee_adjust: 6732699.95, fee2026: 6732699.95, fee2026vat: 7405969.95 },
  { no: 23, manager: "방민혁 주임", company: "샤인소프트", bizno: "446-88-01197", ceo: "신광배", rev2024: 3409117798, rev2025: 4256056725, fee2024: 4169000, fee2025base: 4430952.33, fee_adjust: 4874047.57, fee2026: 4874047.57, fee2026vat: 4874047.57 },
  { no: 24, manager: "방민혁 주임", company: "㈜에이티홀딩스(본점)", bizno: "418-88-02911", ceo: "이경민", rev2024: null, rev2025: 3833315266, fee2024: 5288000, fee2025base: 4189989.70, fee_adjust: 2200000, fee2026: 7040000, fee2026vat: 7040000 },
  { no: 31, manager: "방민혁 주임", company: "주식회사 리앤디자인", bizno: "105-88-07529", ceo: "이유정", rev2024: 0, rev2025: 0, fee2024: 1100000, fee2025base: 600000, fee_adjust: 600000, fee2026: 600000, fee2026vat: 660000 },
  { no: 32, manager: "방민혁 주임", company: "주식회사 제아", bizno: "887-86-01851", ceo: "이유정", rev2024: 2787258281, rev2025: 3778316006, fee2024: 3794000, fee2025base: 4158640.12, fee_adjust: 4574504.14, fee2026: 4574504.14, fee2026vat: 4574504.14 },
  { no: 33, manager: "방민혁 주임", company: "아뜰리에호수 수원", bizno: "768-27-01835", ceo: "주경로", rev2024: 393125367, rev2025: 833882220, fee2024: 1827000, fee2025base: 2392599.77, fee_adjust: 2871119.73, fee2026: 2871119.73, fee2026vat: 3158231.70 },
  { no: 34, manager: "방민혁 주임", company: "아뜰리에호수 의정부점", bizno: "867-88-02976", ceo: "안솔", rev2024: 40032736, rev2025: 234368717, fee2024: 550000, fee2025base: 1087795.54, fee_adjust: 1305354.64, fee2026: 1305354.64, fee2026vat: 1435890.11 },
  { no: 35, manager: "방민혁 주임", company: "아뜰리에호수 부산", bizno: "627-81-03252", ceo: "한지나", rev2024: 39059120, rev2025: 514936515, fee2024: 550000, fee2025base: 1850392.08, fee_adjust: 2220470.49, fee2026: 2220470.49, fee2026vat: 2442517.54 },
  { no: 36, manager: "방민혁 주임", company: "아뜰리에호수 광안리", bizno: "520-85-02682", ceo: "한지나", rev2024: 48856392, rev2025: 741485882, fee2024: 550000, fee2025base: 2235526.00, fee_adjust: 2682631.20, fee2026: 2682631.20, fee2026vat: 2950894.32 },
  { no: 37, manager: "방민혁 주임", company: "(주)라비에벨이엔티 (아뜰리에광주)", bizno: "230-87-03098", ceo: "이아진", rev2024: null, rev2025: 444463268, fee2024: null, fee2025base: 1687282.46, fee_adjust: 2024738.95, fee2026: 2024738.95, fee2026vat: 2227212.84 },
  { no: 38, manager: "방민혁 주임", company: "아뜰리에호수 울산", bizno: "299-87-03461", ceo: "이선희", rev2024: 0, rev2025: 56672449, fee2024: null, fee2025base: 631360.51, fee_adjust: 694496.56, fee2026: 694496.56, fee2026vat: 763946.22 },
  { no: 39, manager: "방민혁 주임", company: "㈜신세계플래너스", bizno: "263-88-02849", ceo: "신세계", rev2024: 33054883, rev2025: 435451819, fee2024: 550000, fee2025base: 1658445.82, fee_adjust: 1990134.98, fee2026: 1990134.98, fee2026vat: 2189148.48 },
  { no: 40, manager: "박지석 주임", company: "㈜ 디에프스카이", bizno: "779-86-02199", ceo: "진보민", rev2024: 335000000, rev2025: 0, fee2024: 1470000, fee2025base: 600000, fee_adjust: 600000, fee2026: 600000, fee2026vat: 660000 },
  { no: 41, manager: "박지석 주임", company: "JHL FC", bizno: "104-88-02161", ceo: "정길용", rev2024: 312227313, rev2025: 451372850, fee2024: 1390000, fee2025base: 1709393.12, fee_adjust: 1880332.43, fee2026: 1880332.43, fee2026vat: 2068365.68 },
  { no: 42, manager: "박지석 주임", company: "제이앤엘글로벌탑스", bizno: "414-87-02547", ceo: "정인숙", rev2024: 223595009, rev2025: 7200000, fee2024: 814000, fee2025base: 600000, fee_adjust: 720000, fee2026: 720000, fee2026vat: 792000 },
  { no: 43, manager: "박지석 주임", company: "주식회사 에프컴바인", bizno: "687-87-02543", ceo: "김건주", rev2024: 21491291941, rev2025: 23460828285, fee2024: 7700000, fee2025base: 9313340.81, fee_adjust: 8000000, fee2026: 9313340.81, fee2026vat: 10244674.89 },
  { no: 44, manager: "박지석 주임", company: "(주)중앙전람", bizno: "120-81-65010", ceo: "김일기", rev2024: 2069535680, rev2025: 2153763631, fee2024: 3183200, fee2025base: 3232645.27, fee_adjust: 3183200, fee2026: 3232645.27, fee2026vat: 3555909.80 },
  { no: 45, manager: "박지석 주임", company: "주식회사 존앤321(윤종규)", bizno: "147-86-02543", ceo: "윤종규", rev2024: 23603219, rev2025: 37802800, fee2024: 660000, fee2025base: 600000, fee_adjust: 600000, fee2026: 600000, fee2026vat: 660000 },
  { no: 46, manager: "박지석 주임", company: "(주)플러스프로", bizno: "251-86-00617", ceo: "양진선", rev2024: 1259116991, rev2025: 1068011351, fee2024: 2695000, fee2025base: 2613766.47, fee_adjust: 2695000, fee2026: 2695000, fee2026vat: 2695000 },
  { no: 47, manager: "박지석 주임", company: "(주)인딕슬로우", bizno: "185-81-01425", ceo: "김형진", rev2024: 691912944, rev2025: 572314762, fee2024: 2064000, fee2025base: 1947935.10, fee_adjust: 2142728.60, fee2026: 2142728.60, fee2026vat: 2357001.47 },
  { no: 48, manager: "박지석 주임", company: "㈜위드제이제이 (정성진)", bizno: "367-88-03266", ceo: "박지은", rev2024: 142858288, rev2025: 354891462, fee2024: 924000, fee2025base: 1400652.68, fee_adjust: 1680783.21, fee2026: 1680783.21, fee2026vat: 1848861.54 },
  { no: 49, manager: "박지석 주임", company: "(주)트리오커넥트", bizno: "186-88-02483", ceo: "서희원", rev2024: 250399094, rev2025: 761531688, fee2024: 1717000, fee2025base: 2269603.87, fee_adjust: 2723524.64, fee2026: 2723524.64, fee2026vat: 2995877.11 },
  { no: 50, manager: "박지석 주임", company: "주식회사 진아엔텍", bizno: "809-87-03410", ceo: "문용식", rev2024: null, rev2025: 1783319546, fee2024: null, fee2025base: 3021492.14, fee_adjust: 3323641.36, fee2026: 3323641.36, fee2026vat: 3323641.36 },
  { no: 51, manager: "박지석 주임", company: "㈜비지스트", bizno: "389-81-03457", ceo: "김병선", rev2024: 56000000, rev2025: 3168312156, fee2024: null, fee2025base: 3810937.93, fee_adjust: 1900000, fee2026: 1900000, fee2026vat: 2090000 },
  { no: 52, manager: "박지석 주임", company: "주식회사 봄패밀리", bizno: "338-81-01956", ceo: "강민교", rev2024: 241240258, rev2025: 159954196, fee2024: 1000000, fee2025base: 886876.33, fee_adjust: 975563.96, fee2026: 975563.96, fee2026vat: 1073120.36 },
  { no: 53, manager: "박지석 주임", company: "주식회사 펀카", bizno: "307-86-02844", ceo: "박지호", rev2024: 2012163950, rev2025: 2552081478, fee2024: 3403000, fee2025base: 3459686.44, fee_adjust: 4151623.73, fee2026: 4151623.73, fee2026vat: 4151623.73 },
  { no: 54, manager: "박지석 주임", company: "㈜더세움건축", bizno: "538-86-03452", ceo: "이정민", rev2024: 541200656, rev2025: 2895807456, fee2024: 4701000, fee2025base: 3655610.25, fee_adjust: 4386732.30, fee2026: 4386732.30, fee2026vat: 4825405.53 },
  { no: 55, manager: "임유빈 주임", company: "㈜ 사이디라이트", bizno: "661-81-01365", ceo: "김은지", rev2024: 450508230, rev2025: 102150638, fee2024: 1650000, fee2025base: 0, fee_adjust: 0, fee2026: 0, fee2026vat: 100 },
  { no: 56, manager: "임유빈 주임", company: "주식회사 엘리트리서치", bizno: "863-87-02851", ceo: "고은솔", rev2024: 348994973, rev2025: 628373850, fee2024: 1849000, fee2025base: 2043235.55, fee_adjust: 2451882.65, fee2026: 2451882.65, fee2026vat: 2697070.92 },
  { no: 57, manager: "임유빈 주임", company: "㈜램퍼스", bizno: "321-81-03602", ceo: "이수희", rev2024: 431081818, rev2025: 1562671704, fee2024: 2170000, fee2025base: 2895722.87, fee_adjust: 3474867.45, fee2026: 3474867.45, fee2026vat: 3822354.19 },
  { no: 58, manager: "임유빈 주임", company: "엔네이션 주식회사", bizno: "341-87-01518", ceo: "조연화", rev2024: 126868374, rev2025: 164578823, fee2024: 550000, fee2025base: 899362.82, fee_adjust: 1079235.39, fee2026: 1079235.39, fee2026vat: 1187158.93 },
  { no: 59, manager: "임유빈 주임", company: "(주)모노앤마노", bizno: "391-87-03016", ceo: "윤혜현", rev2024: 279762726, rev2025: 348107273, fee2024: 1397000, fee2025base: 1378943.27, fee_adjust: 1654731.93, fee2026: 1654731.93, fee2026vat: 1820205.12 },
  { no: 60, manager: "임유빈 주임", company: "(주)퍼시픽로더", bizno: "749-86-03085", ceo: "이승복", rev2024: null, rev2025: 3075922, fee2024: 660000, fee2025base: 600000, fee_adjust: 720000, fee2026: 720000, fee2026vat: 792000 },
  { no: 61, manager: "임유빈 주임", company: "엑스텍바이오 주식회사", bizno: "705-86-03538", ceo: "김민경", rev2024: null, rev2025: 64797042, fee2024: null, fee2025base: 669546.10, fee_adjust: 1000000, fee2026: 1000000, fee2026vat: 1100000 },
  { no: 62, manager: "임유빈 주임", company: "㈜인플루언서 컴퍼니", bizno: "236-87-03664", ceo: "신현준", rev2024: null, rev2025: 296235776, fee2024: null, fee2025base: 1254836.60, fee_adjust: 1505803.91, fee2026: 1505803.91, fee2026vat: 1656384.31 },
  { no: 63, manager: "임유빈 주임", company: "주식회사 인컴글로벌", bizno: "384-88-03636", ceo: "진선중", rev2024: null, rev2025: 172269871, fee2024: null, fee2025base: 920128.65, fee_adjust: 1104154.38, fee2026: 1104154.38, fee2026vat: 1214569.82 },
  { no: 64, manager: "임유빈 주임", company: "주식회사 스틸", bizno: "286-87-03669", ceo: "김태영", rev2024: null, rev2025: 34000000, fee2024: null, fee2025base: 600000, fee_adjust: 1500000, fee2026: 1500000, fee2026vat: 1650000 },
  { no: 65, manager: "임유빈 주임", company: "㈜홀리바넘", bizno: "459-81-02214", ceo: "신은영", rev2024: 1038703143, rev2025: 1494913313, fee2024: 2742000, fee2025base: 2857100.59, fee_adjust: 3428520.71, fee2026: 3428520.71, fee2026vat: 3428520.71 },
  { no: 66, manager: "안성은 주임", company: "㈜션늘푸름", bizno: "844-87-01870", ceo: "홍나영", rev2024: 549651846, rev2025: 560859114, fee2024: 1934900, fee2025base: 1928460.49, fee_adjust: 2121306.54, fee2026: 2121306.54, fee2026vat: 2333437.20 },
  { no: 67, manager: "안성은 주임", company: "㈜굳아이", bizno: "818-81-01016", ceo: "박성우", rev2024: 49501034, rev2025: 0, fee2024: 550000, fee2025base: 600000, fee_adjust: 600000, fee2026: 600000, fee2026vat: 660000 },
  { no: 68, manager: "안성은 주임", company: "주식회사 피움플랫폼(본점)", bizno: "792-88-02842", ceo: "이용규", rev2024: 13771276, rev2025: 127406494, fee2024: 1423200, fee2025base: 798997.53, fee_adjust: 1000000, fee2026: 1000000, fee2026vat: 1100000 },
  { no: 69, manager: "안성은 주임", company: "주식회사 피움플랫폼(하남)", bizno: "143-85-09232", ceo: "이용규", rev2024: null, rev2025: 192910129, fee2024: null, fee2025base: 975857.35, fee_adjust: 1500000, fee2026: 1500000, fee2026vat: 1650000 },
  { no: 70, manager: "안성은 주임", company: "주식회사 피움바이오(테마파크)", bizno: "639-81-02862", ceo: "이용규", rev2024: null, rev2025: 0, fee2024: null, fee2025base: 600000, fee_adjust: 700000, fee2026: 700000, fee2026vat: 770000 },
  { no: 71, manager: "안성은 주임", company: "㈜티에프엔씨", bizno: "342-81-03609", ceo: "허동철", rev2024: null, rev2025: 913814505, fee2024: null, fee2025base: 2528484.66, fee_adjust: 3034181.59, fee2026: 3034181.59, fee2026vat: 3337599.75 },
  { no: 72, manager: "안성은 주임", company: "㈜ 티엔피솔루션", bizno: "127-88-03090", ceo: "허동철", rev2024: null, rev2025: 1281247719, fee2024: 220000, fee2025base: 2735311.20, fee_adjust: 3282373.44, fee2026: 3282373.44, fee2026vat: 3610610.78 },
  { no: 73, manager: "안성은 주임", company: "코믹마트", bizno: "460-81-02567", ceo: "백승훈", rev2024: 362425728, rev2025: 227274403, fee2024: 1100000, fee2025base: 1068640.89, fee_adjust: 1000000, fee2026: 1000000, fee2026vat: 1100000 },
  { no: 74, manager: "안성은 주임", company: "코믹마트 컴퍼니", bizno: "301-86-35560", ceo: "임준빈", rev2024: 116626421, rev2025: 120006244, fee2024: 1100000, fee2025base: 779016.86, fee_adjust: 1000000, fee2026: 1000000, fee2026vat: 1100000 },
  { no: 75, manager: "안성은 주임", company: "주식회사 슈퍼원에이", bizno: "361-86-03380", ceo: "오세라", rev2024: 0, rev2025: 100000000, fee2024: 550000, fee2025base: 725000, fee_adjust: 1000000, fee2026: 1000000, fee2026vat: 1100000 },
  { no: 76, manager: "안성은 주임", company: "주식회사 티나고", bizno: "627-81-02670", ceo: "전현미", rev2024: 0, rev2025: 137444169, fee2024: null, fee2025base: 826099.26, fee_adjust: 1000000, fee2026: 1000000, fee2026vat: 1100000 },
  { no: 78, manager: "안성은 주임", company: "국가안전교육원", bizno: "176-82-00322", ceo: "이형일", rev2024: null, rev2025: 253570922, fee2024: 1300000, fee2025base: 1139641.49, fee_adjust: 1367569.79, fee2026: 1367569.79, fee2026vat: 1367569.79 },
  { no: 79, manager: "안성은 주임", company: "(주)원라인에듀", bizno: "797-86-00772", ceo: "이주영", rev2024: null, rev2025: 1503608823, fee2024: 5700000, fee2025base: 2862057.03, fee_adjust: 3434468.43, fee2026: 3434468.43, fee2026vat: 3434468.43 },
  { no: 80, manager: "구동현 세무사", company: "㈜ 서진에프엔디", bizno: "280-81-00508", ceo: "서천권", rev2024: 7281814862, rev2025: 3407512934, fee2024: 7016000, fee2025base: 3947282.37, fee_adjust: 4736738.85, fee2026: 4736738.85, fee2026vat: 4736738.85 },
  { no: 81, manager: "구동현 세무사", company: "㈜ 늘해온", bizno: "550-86-03807", ceo: "박경이", rev2024: null, rev2025: 884312654, fee2024: null, fee2025base: 2478331.51, fee_adjust: 2973997.81, fee2026: 2973997.81, fee2026vat: 3271397.60 },
  { no: 82, manager: "구동현 세무사", company: "㈜ jj웰미트", bizno: "619-86-03576", ceo: "지일웅", rev2024: null, rev2025: 595029560, fee2024: null, fee2025base: 1986550.25, fee_adjust: 2383860.30, fee2026: 2383860.30, fee2026vat: 2622246.33 },
  { no: 83, manager: "구동현 세무사", company: "㈜ 미트원대조", bizno: "173-81-00122", ceo: "지건효", rev2024: 2997002497, rev2025: 3173482194, fee2024: 2640000, fee2025base: 2640000, fee_adjust: 2904000, fee2026: 2904000, fee2026vat: 2904000 },
  { no: 84, manager: "신고대리(구동현세무사)", company: "㈜더 방픽", bizno: "601-88-01775", ceo: "김현호", rev2024: 40954550, rev2025: 13000002, fee2024: 550000, fee2025base: 600000, fee_adjust: 600000, fee2026: 600000, fee2026vat: 660000 },
  { no: 85, manager: "신고대리(방민혁 주임)", company: "㈜ 더프라이빗", bizno: "766-87-02787", ceo: "차현주", rev2024: 1636365, rev2025: 0, fee2024: 550000, fee2025base: 600000, fee_adjust: 600000, fee2026: 600000, fee2026vat: 660000 },
  { no: 86, manager: "신고대리(구동현세무사)", company: "㈜티케이홀딩스", bizno: "814-81-02653", ceo: "김도완", rev2024: null, rev2025: 0, fee2024: 550000, fee2025base: 600000, fee_adjust: 600000, fee2026: 600000, fee2026vat: 633000 },
  { no: 87, manager: "신고대리(구동현세무사)", company: "㈜블루밍트레블", bizno: "101-86-74736", ceo: "강신혜", rev2024: null, rev2025: 43083667, fee2024: 550000, fee2025base: 600000, fee_adjust: 600000, fee2026: 600000, fee2026vat: 660000 },
  { no: 88, manager: "신고대리(구동현세무사)", company: "㈜장시앤파트너스", bizno: "836-84-00020", ceo: "서지영", rev2024: null, rev2025: null, fee2024: null, fee2025base: 600000, fee_adjust: 600000, fee2026: 600000, fee2026vat: 1100000 },
  { no: 89, manager: "리스트없음", company: "(주)코니퍼주식회사", bizno: "860-87-02866", ceo: "김영선", rev2024: null, rev2025: null, fee2024: null, fee2025base: 600000, fee_adjust: 600000, fee2026: 600000, fee2026vat: 660000 },
  { no: 91, manager: "신고대리[임유빈 주임]", company: "(주)아르비에", bizno: "217-86-03744", ceo: "조연화", rev2024: null, rev2025: null, fee2024: null, fee2025base: 600000, fee_adjust: 600000, fee2026: 600000, fee2026vat: 660000 },
];

const MANAGER_COLORS = {
  "곽민영 팀장":   { bg: "#e8f4fd", accent: "#2196F3", dark: "#1565C0" },
  "방민혁 주임":   { bg: "#e8f5e9", accent: "#4CAF50", dark: "#2E7D32" },
  "박지석 주임":   { bg: "#fff8e1", accent: "#FFA000", dark: "#E65100" },
  "임유빈 주임":   { bg: "#fce4ec", accent: "#E91E63", dark: "#880E4F" },
  "안성은 주임":   { bg: "#f3e5f5", accent: "#9C27B0", dark: "#4A148C" },
  "구동현 세무사": { bg: "#e0f2f1", accent: "#00897B", dark: "#004D40" },
};

const MAIN_MANAGERS = ["곽민영 팀장", "방민혁 주임", "박지석 주임", "임유빈 주임", "안성은 주임", "구동현 세무사"];

function getManagerColor(manager) {
  for (const key of Object.keys(MANAGER_COLORS)) {
    if (manager.includes(key) || manager === key) return MANAGER_COLORS[key];
  }
  return { bg: "#f5f5f5", accent: "#9E9E9E", dark: "#616161" };
}

function fmt(n) {
  if (n === null || n === undefined || n === "" || typeof n === "string") return "-";
  const num = typeof n === "number" ? n : parseFloat(n);
  if (isNaN(num)) return "-";
  return Math.round(num).toLocaleString("ko-KR");
}

function fmtM(n) {
  if (!n || typeof n !== "number") return "0";
  return (n / 10000).toFixed(0) + "만";
}

function numVal(v) {
  if (v === null || v === undefined || typeof v === "string") return 0;
  return typeof v === "number" ? v : 0;
}

export default function App() {
  const [checkedIds, setCheckedIds] = useState({});
  const [filterManager, setFilterManager] = useState("전체");
  const [filterStatus, setFilterStatus] = useState("전체");
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("table");

  const toggleCheck = (no) => {
    setCheckedIds(prev => ({ ...prev, [no]: !prev[no] }));
  };

  const filteredData = useMemo(() => {
    return RAW_DATA.filter(d => {
      if (filterManager !== "전체" && !d.manager.includes(filterManager.replace(" 팀장","").replace(" 주임","").replace(" 세무사",""))) {
        if (d.manager !== filterManager) return false;
      }
      if (filterStatus === "입금") return checkedIds[d.no];
      if (filterStatus === "미입금") return !checkedIds[d.no];
      if (searchText) return d.company.includes(searchText) || d.ceo.includes(searchText) || d.bizno.includes(searchText);
      return true;
    });
  }, [filterManager, filterStatus, searchText, checkedIds]);

  const checkedTotal = useMemo(() => {
    return filteredData.filter(d => checkedIds[d.no]).reduce((sum, d) => sum + numVal(d.fee2026vat), 0);
  }, [filteredData, checkedIds]);

  const grandTotal = useMemo(() => {
    return filteredData.reduce((sum, d) => sum + numVal(d.fee2026vat), 0);
  }, [filteredData]);

  const managerStats = useMemo(() => {
    return MAIN_MANAGERS.map(m => {
      const items = RAW_DATA.filter(d => d.manager === m);
      const total = items.reduce((s, d) => s + numVal(d.fee2026vat), 0);
      const checked = items.filter(d => checkedIds[d.no]).reduce((s, d) => s + numVal(d.fee2026vat), 0);
      const checkedCount = items.filter(d => checkedIds[d.no]).length;
      const color = MANAGER_COLORS[m] || { bg: "#f5f5f5", accent: "#9E9E9E", dark: "#616161" };
      return { manager: m, count: items.length, total, checked, checkedCount, color };
    });
  }, [checkedIds]);

  const overallTotal = RAW_DATA.reduce((s, d) => s + numVal(d.fee2026vat), 0);
  const overallChecked = RAW_DATA.filter(d => checkedIds[d.no]).reduce((s, d) => s + numVal(d.fee2026vat), 0);
  const overallCheckedCount = RAW_DATA.filter(d => checkedIds[d.no]).length;

  const checkAll = () => {
    const newState = {};
    filteredData.forEach(d => { newState[d.no] = true; });
    setCheckedIds(prev => ({ ...prev, ...newState }));
  };
  const uncheckAll = () => {
    const newState = { ...checkedIds };
    filteredData.forEach(d => { delete newState[d.no]; });
    setCheckedIds(newState);
  };

  return (
    <div className="app-wrap">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-logo">
            <span className="logo-badge">세무법인 엑스퍼트</span>
            <h1 className="header-title">25년 법인세 조정료 관리</h1>
          </div>
          <div className="header-summary">
            <div className="summary-pill">
              <span className="pill-label">총 거래처</span>
              <span className="pill-value">{RAW_DATA.length}개</span>
            </div>
            <div className="summary-pill paid">
              <span className="pill-label">입금 확인</span>
              <span className="pill-value">{overallCheckedCount}개</span>
            </div>
            <div className="summary-pill total">
              <span className="pill-label">총 조정료(VAT)</span>
              <span className="pill-value">{fmt(overallTotal)}원</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <section className="dashboard">
        <div className="dashboard-top">
          <div className="overall-card">
            <div className="overall-row">
              <div className="overall-item">
                <span className="ov-label">전체 청구액(VAT)</span>
                <span className="ov-value">{fmt(overallTotal)}<span className="ov-unit">원</span></span>
              </div>
              <div className="overall-divider"/>
              <div className="overall-item green">
                <span className="ov-label">입금 완료</span>
                <span className="ov-value">{fmt(overallChecked)}<span className="ov-unit">원</span></span>
              </div>
              <div className="overall-divider"/>
              <div className="overall-item red">
                <span className="ov-label">미입금</span>
                <span className="ov-value">{fmt(overallTotal - overallChecked)}<span className="ov-unit">원</span></span>
              </div>
              <div className="overall-divider"/>
              <div className="overall-item blue">
                <span className="ov-label">수금률</span>
                <span className="ov-value">{overallTotal > 0 ? ((overallChecked / overallTotal) * 100).toFixed(1) : 0}<span className="ov-unit">%</span></span>
              </div>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{ width: `${overallTotal > 0 ? (overallChecked / overallTotal) * 100 : 0}%` }}/>
            </div>
          </div>
        </div>

        <div className="manager-grid">
          {managerStats.map(s => (
            <div key={s.manager} className="manager-card" style={{ borderTop: `3px solid ${s.color.accent}` }}>
              <div className="mc-header">
                <span className="mc-name" style={{ color: s.color.dark }}>{s.manager}</span>
                <span className="mc-count">{s.count}개</span>
              </div>
              <div className="mc-amounts">
                <div className="mc-row">
                  <span className="mc-label">총 조정료</span>
                  <span className="mc-val">{fmt(s.total)}원</span>
                </div>
                <div className="mc-row">
                  <span className="mc-label">입금 확인</span>
                  <span className="mc-val paid-text">{fmt(s.checked)}원 ({s.checkedCount}개)</span>
                </div>
                <div className="mc-row">
                  <span className="mc-label">미입금</span>
                  <span className="mc-val unpaid-text">{fmt(s.total - s.checked)}원</span>
                </div>
              </div>
              <div className="mc-bar-wrap">
                <div className="mc-bar-fill" style={{
                  width: `${s.total > 0 ? (s.checked / s.total) * 100 : 0}%`,
                  background: s.color.accent
                }}/>
              </div>
              <span className="mc-pct" style={{ color: s.color.accent }}>
                {s.total > 0 ? ((s.checked / s.total) * 100).toFixed(1) : 0}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Bar */}
      <section className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">담당자</span>
          <div className="filter-btns">
            {["전체", ...MAIN_MANAGERS].map(m => (
              <button
                key={m}
                className={`filter-btn ${filterManager === m ? "active" : ""}`}
                style={filterManager === m && m !== "전체" ? {
                  background: getManagerColor(m).accent,
                  color: "#fff",
                  borderColor: getManagerColor(m).accent
                } : {}}
                onClick={() => setFilterManager(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-label">입금상태</span>
          <div className="filter-btns">
            {["전체", "입금", "미입금"].map(s => (
              <button
                key={s}
                className={`filter-btn ${filterStatus === s ? "active" : ""}`}
                onClick={() => setFilterStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group search-group">
          <input
            className="search-input"
            placeholder="업체명 / 대표자 / 사업자번호 검색"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
      </section>

      {/* Checked Summary Bar */}
      <div className="checked-summary-bar">
        <div className="csb-left">
          <span>조회 건수: <strong>{filteredData.length}개</strong></span>
          <span className="csb-sep">|</span>
          <span>입금 체크: <strong className="paid-text">{filteredData.filter(d => checkedIds[d.no]).length}개</strong></span>
          <span className="csb-sep">|</span>
          <span>미입금: <strong className="unpaid-text">{filteredData.filter(d => !checkedIds[d.no]).length}개</strong></span>
        </div>
        <div className="csb-right">
          <span className="csb-total">체크된 합계(VAT): <strong className="paid-text">{fmt(checkedTotal)}원</strong></span>
          <span className="csb-sep">|</span>
          <span className="csb-total">조회 전체 합계: <strong>{fmt(grandTotal)}원</strong></span>
          <button className="btn-sm" onClick={checkAll}>전체 체크</button>
          <button className="btn-sm gray" onClick={uncheckAll}>체크 해제</button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="fee-table">
          <thead>
            <tr className="th-group">
              <th rowSpan={2} className="th-check">입금</th>
              <th rowSpan={2} className="th-no">No.</th>
              <th rowSpan={2} className="th-mgr">담당자</th>
              <th rowSpan={2} className="th-company">업체명</th>
              <th rowSpan={2} className="th-ceo">대표자</th>
              <th colSpan={2} className="th-group-cell">매출 현황</th>
              <th colSpan={4} className="th-group-cell th-fee">조정료 (원)</th>
            </tr>
            <tr>
              <th className="th-rev">24년 귀속매출</th>
              <th className="th-rev">25년 귀속매출</th>
              <th className="th-fee-item">24년 귀속<br/>조정료</th>
              <th className="th-fee-item">25년 귀속<br/>조정료[보수표]</th>
              <th className="th-fee-item">26년 조정료<br/>[공급가]</th>
              <th className="th-fee-item highlight">★26년 조정료<br/>[최종 VAT]</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d) => {
              const mc = getManagerColor(d.manager);
              const isChecked = !!checkedIds[d.no];
              return (
                <tr key={d.no} className={`data-row ${isChecked ? "row-checked" : ""}`}>
                  <td className="td-check">
                    <label className="check-label">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheck(d.no)}
                      />
                      <span className={`check-mark ${isChecked ? "checked" : ""}`}>
                        {isChecked ? "✓" : ""}
                      </span>
                    </label>
                  </td>
                  <td className="td-no">{d.no}</td>
                  <td className="td-mgr">
                    <span className="mgr-badge" style={{ background: mc.bg, color: mc.dark, borderColor: mc.accent }}>
                      {d.manager}
                    </span>
                  </td>
                  <td className="td-company">{d.company}</td>
                  <td className="td-ceo">{d.ceo}</td>
                  <td className="td-num">{fmt(d.rev2024)}</td>
                  <td className="td-num">{fmt(d.rev2025)}</td>
                  <td className="td-num">{fmt(d.fee2024)}</td>
                  <td className="td-num">{fmt(d.fee2025base)}</td>
                  <td className="td-num">{fmt(d.fee2026)}</td>
                  <td className={`td-num td-vat ${isChecked ? "td-paid" : ""}`}>
                    {fmt(d.fee2026vat)}
                    {isChecked && <span className="paid-badge">입금</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="tf-row">
              <td colSpan={5} className="tf-label">합 계 ({filteredData.length}개)</td>
              <td className="tf-num">{fmt(filteredData.reduce((s,d)=>s+numVal(d.rev2024),0))}</td>
              <td className="tf-num">{fmt(filteredData.reduce((s,d)=>s+numVal(d.rev2025),0))}</td>
              <td className="tf-num">{fmt(filteredData.reduce((s,d)=>s+numVal(d.fee2024),0))}</td>
              <td className="tf-num">{fmt(filteredData.reduce((s,d)=>s+numVal(d.fee2025base),0))}</td>
              <td className="tf-num">{fmt(filteredData.reduce((s,d)=>s+numVal(d.fee2026),0))}</td>
              <td className="tf-num tf-vat">{fmt(filteredData.reduce((s,d)=>s+numVal(d.fee2026vat),0))}</td>
            </tr>
            <tr className="tf-row tf-checked">
              <td colSpan={5} className="tf-label">입금 확인 합계 ({filteredData.filter(d=>checkedIds[d.no]).length}개)</td>
              <td colSpan={5}></td>
              <td className="tf-num tf-vat paid-text">{fmt(checkedTotal)}</td>
            </tr>
            <tr className="tf-row tf-unpaid">
              <td colSpan={5} className="tf-label">미입금 합계 ({filteredData.filter(d=>!checkedIds[d.no]).length}개)</td>
              <td colSpan={5}></td>
              <td className="tf-num tf-vat unpaid-text">{fmt(grandTotal - checkedTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <footer className="app-footer">
        세무법인 엑스퍼트 성수점 | 2025 법인세 조정료 현황 관리 시스템
      </footer>
    </div>
  );
}
