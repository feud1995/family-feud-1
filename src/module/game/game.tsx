import { GameBox } from '@/components/game/box';
import { Cards } from '@/components/game/cards';
import Counter from '@/components/game/counter/counter';
import { useEffect, useRef, useState } from 'react';
import FamilyFeudLogo from '@/assets/images/family-feud.png';

const gameKey = 'family-feud';

export const Game = () => {
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);

  useEffect(() => {
    broadcastChannelRef.current = new BroadcastChannel(gameKey);

    const callback = (event: MessageEvent) => {
      console.log(event.data);
      setGameScore(prevScore => prevScore + 100);
    };

    broadcastChannelRef.current.addEventListener('message', callback);

    return () => {
      broadcastChannelRef.current?.removeEventListener('message', callback);
      broadcastChannelRef.current?.close();
    };
  });

  return (
    <div className="bg-[#a7cfdf] min-h-[400px] h-[100svh] bg-gradient-to-b from-[#a7cfdf] to-[#23538a] py-10 sm:block hidden">
      <img
        src={FamilyFeudLogo}
        alt="Family Feud Logo"
        className="max-w-[160px] w-full absolute top-5 left-5"
      />
      <div
        className="[text-shadow:1px_1px_3px_rgba(0,0,0,1)] border-[5px] border-[#003c7b] py-[120px] px-[140px] rounded-[50%] text-center max-w-[1300px] max-h-[800px] min-w-[305px] m-auto text-white bg-[url(./assets/gameboard-bg.svg)] bg-[#0C4779] relative bg-repeat bg-center [box-shadow:0_1px_24px_1px_rgba(0,0,0,0.48)]"
        id="gameboard"
      >
        <GameBox
          className="w-[125px] text-5xl absolute top-5 inset-x-0 m-auto"
          id="current-round-score"
        >
          <Counter value={gameScore} />
        </GameBox>
        <GameBox
          className="w-[75px] h-fit text-3xl absolute inset-y-0 left-10 m-auto"
          id="team-a-score"
        >
          <Counter value={teamAScore} />
        </GameBox>
        <GameBox
          className="w-[75px] h-fit text-3xl absolute inset-y-0 right-10 m-auto"
          id="team-b-score"
        >
          <Counter value={teamBScore} />
        </GameBox>
        <div
          className="max-w-[900px] w-auto m-auto text-center text-2xl text-[#003c7b] border border-black bg-[#deeeff] my-4 [box-shadow:inset_0_1px_24px_1px_rgba(0,0,0,0.48)] px-3 py-9 font-medium"
          id="question"
        >
          <span className="inline-block align-middle leading-normal [text-shadow:initial]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat a
            perferendis optio?
          </span>
        </div>
        <div
          className="bg-black p-1 flex flex-row [box-shadow:0_1px_24px_1px_rgba(0,0,0,0.48)] mb-8"
          id="answers"
        >
          <div className="flex-1 flex flex-col">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
          </div>
          <div className="flex-1 flex flex-col">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
          </div>
        </div>
        <div
          className="flex gap-x-4 justify-center items-center absolute bottom-16 inset-x-0 m-auto w-[500px]"
          id="control"
        >
          <button
            className="rounded-[50px_0_0_50px] border-[3px] border-white text-2xl p-2 px-6"
            style={{
              background:
                'linear-gradient(to bottom, #7db9e8 0%, #207cca 49%, #2989d8 50%, #1e5799 100%)',
            }}
          >
            Award Team A
          </button>
          <button
            className="rounded-[0_50px_50px_0] border-[3px] border-white text-2xl p-2 px-6"
            style={{
              background:
                'linear-gradient(to bottom, #7db9e8 0%, #207cca 49%, #2989d8 50%, #1e5799 100%)',
            }}
          >
            Award Team B
          </button>
        </div>
      </div>
    </div>
  );
};
