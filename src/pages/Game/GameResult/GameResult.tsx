import { useEffect, useState } from 'react';
import useGameStore from '../../../store/gameStore';
import useResultStore from '../../../store/resultStore';
import useFinalResultStore from '../../../store/finalResultStore';

import { FlexLayout } from '../../../styles/layout';
import { RegularText, SmallText } from '../../../styles/fonts';
import GrayBox from '../../../components/GrayBox';
import Input from '../../../components/Input';
import { useNavigate } from 'react-router-dom';

type GameResultProps = {
  changeState: () => void;
};

export default function GameResult({ changeState }: GameResultProps) {
  const RESULTS_LENGTH = 5;
  const ROUND_NUMBER = 3;
  const navigate = useNavigate();
  const { roundNumber } = useGameStore().gameData;
  const { killCount, rank, playTime, aliveTime, victim, victimColor } =
    useResultStore().resultData;
  const {
    totalTime,
    totalAliveTime,
    totalKillCount,
    finalRank,
    rankwinnerNickname,
    winnerColor,
  } = useFinalResultStore().finalResultData;
  const [countdown, setCountdown] = useState(30);

  const ResultText = ({
    title,
    results,
    timeText,
  }: {
    title: string;
    results: string[][];
    timeText: string;
  }) => {
    return (
      <FlexLayout
        $isCol
        gap={roundNumber < ROUND_NUMBER && rank === 1 ? '4rem' : '6rem'}
      >
        <RegularText color='black'>{title}</RegularText>
        <FlexLayout $isCol gap='2.4rem'>
          {results.slice(0, RESULTS_LENGTH - 1).map((value, index) => {
            return (
              <FlexLayout key={index} gap='1.2rem'>
                <SmallText color='black'>{`${value[0]} :`}</SmallText>
                <SmallText color={value[1] === '1위' ? '#ffde32' : 'black'}>
                  {value[1]}
                </SmallText>
              </FlexLayout>
            );
          })}
          {roundNumber < ROUND_NUMBER && rank === 1 ? (
            <FlexLayout $isCol gap='1rem'>
              <SmallText color='black'>{`${
                roundNumber + 1
              } 라운드 도발 멘트 입력`}</SmallText>
              <Input name='winnerComment' width='60rem' />
            </FlexLayout>
          ) : (
            <FlexLayout gap='1.2rem'>
              <SmallText color='black'>{`${
                results[RESULTS_LENGTH - 1][0]
              } :`}</SmallText>
              <SmallText
                color={roundNumber < ROUND_NUMBER ? victimColor : winnerColor}
              >
                {results[RESULTS_LENGTH - 1][1]}
              </SmallText>
            </FlexLayout>
          )}
        </FlexLayout>
        <SmallText color='black'>{timeText}</SmallText>
      </FlexLayout>
    );
  };

  const roundData = {
    title: `<< ${roundNumber} 라운드 결과 >>`,
    results: [
      ['게임 시간', `${playTime}초`],
      ['나의 생존 시간', `${aliveTime}초`],
      ['나의 킬 수', `${killCount}킬`],
      ['나의 랭킹', `${rank}위`],
      ['나를 죽인 사람', `${rank === 1 ? `없음` : victim}`],
    ],
    timeText: `${
      roundNumber === ROUND_NUMBER
        ? `최종 결과 표시까지`
        : `${roundNumber + 1} 라운드 시작까지`
    } ...${countdown}초`,
  };

  const finalData = {
    title: `<< 최종 결과 >>`,
    results: [
      ['총 게임 시간', `${totalTime}초`],
      ['나의 총 생존 시간', `${totalAliveTime}초`],
      ['나의 총 킬 수', `${totalKillCount}킬`],
      ['나의 최종 랭킹', `${finalRank}위`],
      ['최종 1위', `${rankwinnerNickname}`],
    ],
    timeText: `게임 종료까지 ...${countdown}초`,
  };

  useEffect(() => {
    if (countdown === 0) {
      if (roundNumber < ROUND_NUMBER) {
        changeState();
      } else {
        navigate(`/lobby`);
      }
    } else {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  return (
    <FlexLayout $isCol gap='1rem'>
      <GrayBox mode={'TALL'} width={'79.2rem'}>
        {roundNumber < ROUND_NUMBER
          ? ResultText(roundData)
          : ResultText(finalData)}
      </GrayBox>
    </FlexLayout>
  );
}
