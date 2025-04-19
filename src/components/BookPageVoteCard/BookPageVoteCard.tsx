import Button from "../../components/Button/Button"
import VoteBar from "../../components/VoteBar/VoteBar"

import "./BookPageVoteCard.css"

const BookPageVoteCard: React.FC = () => {
    return <div className="voteframe">
        <div className="votediv">
            <p className="vote-text-wrapper">소설은 현대 사회에서 어떤 역할을 하는가?</p>
            <VoteBar leftPercent={36} rightPercent={64}/>
        </div>
        <div className="voteframe2">
            <div className="voteoverlap-group-wrapper">
                <Button text={"찬성"} type={"voteOption"} />
            </div>
            <div className="voteoverlap-group-wrapper">
                <Button text={"찬성"} type={"voteOption"} />
            </div>
        </div>
    </div>
}

export default BookPageVoteCard;

// emotion으로 변경 필요