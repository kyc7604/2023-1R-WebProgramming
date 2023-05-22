import { useEffect, useState } from "react";
import p1 from './assets/서울대.jpeg' 
import p2 from './assets/연세대.png'
import p3 from './assets/고려대.png'
import p4 from './assets/서강대.png'
import p5 from './assets/성균관대.jpeg'
import p6 from './assets/한양대.jpeg'
import p7 from './assets/중앙대.png' 
import p8 from './assets/경희대.jpg' 
import p9 from './assets/한국외대.jpg' 
import p10 from './assets/서울시립대.jpg'
import p11 from './assets/건국대.jpg' 
import p12 from './assets/동국대.png'
import p13 from './assets/홍익대.png' 
import p14 from './assets/카이스트.png' 
import p15 from './assets/포스텍.png' 
import p16 from './assets/이화여대.png'

function Worldcup () {
    const candidate = [
        {name: '서울대', src: p1},
        {name: '연세대', src: p2},
        {name: '고려대', src: p3},
        {name: '서강대', src: p4},
        {name: '성균관대', src: p5},
        {name: '한양대', src: p6},
        {name: '중앙대', src: p7},
        {name: '경희대', src: p8},
        {name: '한국외대', src: p9},
        {name: '서울시립대', src: p10},
        {name: '건국대', src: p11},
        {name: '동국대', src: p12},
        {name: '홍익대', src: p13},
        {name: '카이스트', src: p14},
        {name: '포스텍', src: p15},
        {name: '이화여대', src: p16}
    ];
    const [game, setGame] = useState([]);
    const [round, setRound] = useState(0);
    const [nextGame, setNextGame] = useState([]);
    const [showImg, setShowImg] = useState(false);
    const [stat, setStat] = useState(
        {"서울대": 0,
         "연세대": 0,
         "고려대": 0,
         "서강대": 0,
         "성균관대": 0,
         "한양대": 0,
         "중앙대": 0,
         "경희대": 0,
         "한국외대": 0,
         "서울시립대": 0,
         "건국대": 0, 
         "동국대": 0, 
         "홍익대": 0, 
         "카이스트": 0,
         "포스텍": 0,
         "이화여대": 0
    });

    const left = game[round*2];
    const right = game[round*2+1];
    const key = "2019111418"

    useEffect(() => {
        const stringState = localStorage.getItem('대학');
        if(stringState != null) {
          setStat(JSON.parse(stringState));
        }
        setGame(candidate.map((c) => {
            return {name: c.name, src: c.src, order: Math.random()}
        }).sort((l, r) => {
            return l.order - r.order;
        }));
    }, []);

    useEffect(() => {
        if( game.length > 1 && round + 1 > game.length / 2 ) {
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }
    }, [round]);

    useEffect(() => {
        if(showImg) {
          setTimeout(() => { 
            setShowImg(false);
          }, 3000);
        }
      },[showImg]);

      const leftClick = () => {
        setStat({...stat, [left.name]: stat[left.name] + 1});
        setNextGame((prev) => prev.concat(left));
        setRound(r => r+1);
        setShowImg(!showImg);
      }
    
      const rightClick = () => {
        setStat({...stat, [right.name]: stat[right.name] + 1});
        setNextGame((prev) => prev.concat(right));
        setRound(r => r+1);
        setShowImg(!showImg);
      }
    
      console.log(stat);
    
      const calculateWidth = (num) => {
        const minWidth = 0; // 최소 너비
        const maxWidth = 700; // 최대 너비
        const increment = 20; // 너비 증가량
        const width = minWidth + num * increment;
        return width > maxWidth ? maxWidth : width;
      };

    if( game.length === 1 ){
        return <div>
            <p>대학교 월드컵 우승!</p>
            <img src={game[0].src} /> <p>{game[0].name}</p>
        </div>
    }

    if(game.length === 1) {
        localStorage.setItem(key, JSON.stringify(stat));
        return <div className="whole">
          <p className="worldcup-title">이상형 월드컵 우승</p>
          <img src={game[0].src} className="champion"/><p className="choice-name">최종 우승자는 {game[0].name}입니다</p>
    
          <table className="statistics">
            {Object.keys(stat).map(name => {
              return <tr key={name}> <td className="titles">{name}</td> <td className="data"><div style={{ width: calculateWidth(stat[name]), height: 50, backgroundColor: "blue" }}></div>{stat[name]}</td> </tr>
            })}
          </table>
        </div>
      }

    if( game.length === 0 || round + 1 > game.length / 2 ) return <p>로딩중입니다</p>;
    return (
     <div>
        <p>대학교 월드컵! {round + 1} / {game.length / 2} <b>{game.length === 2 ? "결승" : game.length + "강"}</b></p>
        <div style={{position: "relative"}}>
            <img className="choice" src={left.src} alt={left.name} onClick={leftClick}/>
            <p className="choice-name">{left.name}</p>
          </div>
          <div style={{position:"relative"}}>
          <img className="choice" src={right.src} alt={right.name} onClick={rightClick}/>
          <p className="choice-name">{right.name}</p>
          </div>
    </div>
    )
}

export default Worldcup;