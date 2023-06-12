import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateGame } from "../../store/game";
import { fetchCreateRound } from "../../store/rounds";

function areWordsSimilar(word1, word2) {
    const threshold = 2; // Maximum allowed edit distance

    // Calculate the Levenshtein distance between the words
    const distance = levenshteinDistance(word1.toLowerCase(), word2.toLowerCase());

    // Compare the distance with the threshold
    return distance <= threshold;
}

function levenshteinDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;

    // Create a matrix to store the distance values
    const matrix = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(null));

    // Initialize the matrix with base values
    for (let i = 0; i <= m; i++) {
        matrix[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
        matrix[0][j] = j;
    }

    // Calculate the distance using dynamic programming
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = word1[i - 1] === word2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // Deletion
                matrix[i][j - 1] + 1, // Insertion
                matrix[i - 1][j - 1] + cost // Substitution
            );
        }
    }

    // Return the distance between the words
    return matrix[m][n];
}


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
            if (areWordsSimilar(Words[0]?.wordText, Words[1]?.wordText)) {
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
