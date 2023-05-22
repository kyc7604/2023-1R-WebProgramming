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

    useEffect(() => {
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
          setTimeout(() => { //3초 뒤에 사라지게
            setShowImg(false);
          }, 3000);
        }
      },[showImg]);

    if( game.length === 1 ){
        return <div>
            <p>대학교 월드컵 우승!</p>
            <img src={game[0].src} /> <p>{game[0].name}</p>
        </div>
    }
    if( game.length === 0 || round + 1 > game.length / 2 ) return <p>로딩중입니다</p>;
    return (
     <div>
        <p>대학교 월드컵! {round + 1} / {game.length / 2} <b>{game.length === 2 ? "결승" : game.length + "강"}</b></p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <img src={game[round * 2].src} onClick={() => {
                setNextGame((prev) => prev.concat(game[round * 2]))
                setRound(round => round + 1);
                setShowImg(!showImg);
            }} />
            <img src={game[round * 2 + 1].src} onClick={() => {
                setNextGame((prev) => prev.concat(game[round * 2 + 1]))
                setRound(round => round + 1);
                setShowImg(!showImg);
            }}/>
            <p>{game[round*2+1].name}</p>
        </div>
    </div>
    )
}

export default Worldcup;