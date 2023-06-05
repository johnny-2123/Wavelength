import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateGame } from "../../store/game";
import { fetchCreateRound } from "../../store/rounds";

export default function useGameStatus(gameId, roundNumber, sendMessage) {
    const dispatch = useDispatch();

    return useCallback((game) => {
        const currentRound = game?.Round?.[roundNumber - 1];
        const { user1Agrees, user2Agrees, user1Ready, user2Ready, Words = [] } = currentRound || {};

        const agreementObject = {
            gameId: game?.id,
            user1: game?.user1?.username,
            user2: game?.user2?.username,
        };

        const sendGameWonMessage = () => {
            dispatch(updateGame(gameId, true)).then((updatedGame) => {
                sendMessage("send-game-won-message", {
                    gameId: updatedGame?.id,
                    user1: updatedGame?.user1?.username,
                    user2: updatedGame?.user2?.username,
                });
            });
        };


        const sendRoundResults = () => {
            sendMessage("send-round-results", agreementObject);
        };

        const sendStartNewRound = () => {
            dispatch(fetchCreateRound(gameId)).then(() => {
                sendMessage("send-start-new-round", agreementObject);
            });
        };

        if (Words.length === 2) {
            if (Words[0]?.wordText === Words[1]?.wordText) {
                sendGameWonMessage();
            } else {
                sendRoundResults();
            }
        }

        if (Words.length === 2) {
            if (user1Agrees && user2Agrees) {
                sendGameWonMessage();
            } else if (user1Agrees || user2Agrees) {
                sendRoundResults();
            } else if (user1Ready && user2Ready) {
                sendStartNewRound();
            }
        }

        if ((user1Agrees && user2Ready) || (user1Ready && user2Agrees)) {
            sendStartNewRound();
        }
    }, [dispatch, gameId, roundNumber, sendMessage]);
}
