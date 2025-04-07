import Bar from "../../components/Bar";
import Button from "../../components/Button";
import "./BookInfoPage.css";
import image5 from "../../assets/img/book.png";
import Line from "../../assets/img/Vector.png";

const BookInfoPage = () => {
  return (
    <div className="bookinfo-frame">
      <div className="bookinfo-div">
        <div className="bookinfo-group">
          <div className="bookinfotext-wrapper">Book Information</div>
        </div>
        <div className="bookinfo-div2">
          <div className="bookinfo-view">
            <img className="bookinfo-image" src={image5} />
          </div>
          <div className="bookinfo-div3">
            <div className="bookinfo-div4">
              <div className="bookinfotext-wrapper2">소년이 온다</div>
              <div className="bookinfotext-wrapper3">한강</div>
            </div>
            <p className="bookinfo-p">창비 | 2014년 5월 19일</p>
          </div>
          <div className="bookinfo-group-wrapper">
            <div className="bookinfo-chat-room-join-wrapper">
              <div className="bookinfo-chat-room-join">
                <div className="bookinfo-div5">
                  <div className="bookinfo-div6">
                    <div className="bookinfotext-wrapper4">
                      소년이 온다 채팅방 참여하기
                    </div>
                    <p className="bookinfotext-wrapper5">
                      여러 사람들과 소년이 온다에 대해 이야기 해봅시다.
                    </p>
                  </div>
                  <div className="bookinfo-div7">
                    <div className="bookinfo-div8">
                      <div className="bookinfotext-wrapper6">토론방 규칙</div>
                      <p className="bookinfotext-wrapper7">
                        지나친 욕설 / 내상언급/ 소통의 여지가 없는 일방적이고
                        무의미한 글 <br /> 도배 / 지나친 친목/ 분란조성 /
                        수위오버/ 단속/ 카더라 / 타인 신상 언급 등등
                      </p>
                    </div>
                    <div className="bookinfo-div-wrapper">
                      <Button text={"채팅방 참여하기"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bookinfo-div9">
        <div className="bookinfo-div10">
          <div className="bookinfo-div11">
            <div className="bookinfotext-wrapper9">책 소개</div>
            <div className="bookinfotext-wrapper10">투표</div>
            <div className="bookinfotext-wrapper11">출판사 서평</div>
          </div>
          <img className="bookinfo-line" src={Line} />
        </div>
        <div className="bookinfo-description-wrapper">
          <div className="bookinfo-description">
            <div className="bookinfotext-wrapper12">책 소개</div>
            <img className="bookinfo-line" src={Line} />
            <div className="bookinfo-description-text">
              <p className="bookinfotext-wrapper13~15">
                이 책은 현대 문학의 흐름과 소설의 힘에 대한 깊이 있는 탐구를
                담고 있습니다. <br />
                저자 김선향은 20년간의 연구를 바탕으로 소설이 우리 사회와 개인의
                삶에 <br />
                미치는 영향을 다양한 사례와 함께 설득력 있게 전달합니다. <br />
              </p>
            </div>
          </div>
        </div>
        <div className="bookinfo-div8">
          <div className="bookinfo-div12">
            <div className="bookinfo-div13">
              <div className="bookinfotext-wrapper16">출판사 서평</div>
              <img className="bookinfo-line" src={Line} />
            </div>
            <p className="bookinfotext-wrapper17">
              책장을 덮어도 결코 잊을 수 없는 이야기끝나지 않는 오월, 피지 못한
              아이들의 영혼을 위한 간절한 노래『소년이 온다』는 1980년 5월
              18일부터 열흘간 있었던 광주 민주화운동 당시의 상황과 그 이후
              남겨진 사람들의 이야기를 철저한 고증과 취재를 바탕으로 한강 특유의
              정교하고도 밀도 있는 문장으로 그려낸다. 5·18 당시 중학교 3학년이던
              소년 동호는 친구 정대의 죽음을 목격한 것을 계기로 도청 상무관에서
              시신들을 관리하는 일을 돕게 된다. 매일같이 합동분향소가 있는
              상무관으로 들어오는 시신들을 수습하면서 열다섯 어린 소년은 '어린
              새' 한마리가 빠져나간 것 같은 주검들의 말 없는 혼을 위로하기 위해
              초를 밝히고, ‘시취를 뿜어내는 것으로 또다른 시위를 하는 것 같은’
              시신들 사이에서 친구 정대의 처참한 죽음을 떠올리며
              괴로워한다.정대는 동호와 함께 시위대의 행진 도중 계엄군이 쏜 총에
              맞아 쓰러져 죽게 되고, 중학교를 마치기 전에 공장에 들어와 자신의
              꿈을 미루고 동생을 뒷바라지하던 정대의 누나 정미 역시 그 봄에
              행방불명되면서 남매는 비극을 맞는다. 무자비한 국가의 폭력이
              한순간에 무너뜨린 순박한 사람들의 평범한 일상과 무고하게 죽은 어린
              생명들에 대한 억울함과 안타까움이 정대의 절규하는 듯한 목소리로
              대변된다. 5·18 당시, 인구 40만의 광주 시민들을 진압하기 위해
              군인들이 지급받은 탄환은 80만발이었다고 전해진다. 이런 엄혹한
              분위기 속에서도 국가의 부조리에 맞서도록 어린 그들까지
              시위현장으로 이끌었던 강렬한 힘은 다만 ‘깨끗하고도 무서운 양심’
              하나였다. 그렇게 아이들은 ‘세상에서 가장 거대하고 숭고한 심장의
              맥박’을 느끼며 수십만 시민들이 모여 만든 위대한 ‘양심의 혈관’을
              함께 이루었던 것이다. 소설은 동호와 함께 상무관에서 일하던 형과
              누나들이 겪은 5·18 전후의 삶의 모습을 통해 대한민국 근현대사의
              비극적인 단면들을 드러내 보인다. 살아 있다는 것이 오히려
              치욕스러운 고통이 되거나 일상을 회복할 수 없는 무력감에 괴로워하는
              이들의 모습은 수십년이 지난 지금도 현재진행형으로 이어지고
              있다.당시 수피아여고 3학년 시절에 5·18을 겪은 ‘김은숙’은 '전두환
              타도'를 외치는 데모로 점철된 대학생활을 포기하고 작은 출판사에서
              편집자로 일하면서 담당 원고의 검열 문제로 서대문경찰서에 끌려가
              ‘일곱대의 뺨’을 맞기도 한다. 봉제공장에서 일을 하면서 ‘고귀한
              우리’ 자신을 지키기 위해 노조활동을 하다 쫓겨난 ‘임선주’는 이후
              양장점에서 일을 하다가 상무관에 합류하게 되고, 경찰에 연행된 후
              하혈이 멈추지 않는 끔찍한 고문을 당한다. 상무관에서 활발하게
              활동하던 대학생 ‘김진수’ 역시 연행된 이후 ‘모나미 볼펜’ 고문, 성기
              고문 등을 받으며 끔찍한 수감생활을 했고, 출소 후 트라우마로
              고통받다 결국 자살하고 만다. 소설은 이러한 국가의 무자비함을
              핍진하게 그려내면서 ‘유전자에 새겨진 듯 동일한 잔인성’으로 과거뿐
              아니라 지금까지도, 우리나라뿐 아니라 전세계에서 끊임없이 자행되고
              있는 인간의 잔혹함과 악행에 대한 근원적인 질문을 던진다.“당신이
              나를 밝은 쪽으로, 빛이 비치는 쪽으로,꽃이 핀 쪽으로 끌고 가기를
              바랍니다.“한강은 이 작품을 통해 열다섯살 소년 동호의 죽음을
              중심으로 5·18 당시 숨죽이며 고통받았던 인물들의 숨겨진 이야기를
              하나하나 힘겹게 펼쳐 보이며 그들의 아픔을 어루만지고 그 시대를
              증언하는 숙명과도 같은 소명을 다한다. ‘살아남았다’는 것이 오히려
              치욕이 되는 사람들이 혼자서 힘겹게 견뎌내야 하는 매일을 되새기며,
              그들의 아물지 않는 기억들을 함께 나눈다. 한강 작가는 “무덥고
              습했던 여름 끝에 가로수 아래를 걷다가, 잘 마른 깨끗한 홑청 같은
              바람이 얼굴과 팔에 감기는 감각에 놀라며 동호를 생각”한다. 따뜻했던
              봄날의 오월을 지나 ‘그 여름을 건너가지 못한 동호, 이런 아침을
              다시는 만나지 못하는 동호’를 떠올리며 작가는 우리가 ‘날마다 만나는
              모든 이들이 인간이란 것을’ 되새기고, 인간으로서의 우리가 이들에게
              어떠한 대답을 해줄 수 있는가를 간절한 목소리로 묻는다. 그리하여
              이제는 더이상 억울한 영혼들이 없기를, 상처 입은 영혼들이 “밝은
              쪽으로, 빛이 비치는 쪽으로, 꽃이 핀 쪽으로” 나아가 평온할 수
              있기를 기도한다. 5·18 희생자들의 ‘눈 덮인 무덤들’ 사이에서 못다 핀
              소년 동호를 추모하기 위해 작가 한강이 마음을 다해 밝힌 작은
              촛불들이 안타까운 세상에 온기를 더해줄 것이다.
            </p>
          </div>
        </div>
        <div className="bookinfo-view2">
          <div className="bookinfotext-wrapper12">투표</div>
          <img className="bookinfo-line" src={Line} />
        </div>
        <div className="bookinfo-div15">
          <div className="bookinfo-element">
            <div className="bookinfo-div16">
              <div className="bookinfo-div17">
                <p className="bookinfotext-wrapper18">
                  소설은 현대 사회에서 어떤 역할을 하는가
                </p>
                <Bar />
              </div>
              <div className="bookinfo-div18">
                <div className="bookinfooverlap-group-wrapper">
                  <div className="bookinfooverlap-group">
                    <div className="bookinfotext-wrapper19">찬성</div>
                  </div>
                </div>
                <div className="bookinfooverlap-group-wrapper">
                  <div className="bookinfooverlap-group">
                    <div className="bookinfotext-wrapper19">반대</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoPage;
