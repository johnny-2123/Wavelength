import React from "react";
import { Switch, Route } from "react-router-dom";
import GamePlay from "../../GamePlay";
import DirectMessageForm from "../../DirectMessageForm";
import FriendsList from "../../Friends";

const Routes = ({ sessionUser, sendMessage, receivedMessages, friends, game, showRoundResults, setShowRoundResults, playerReady, setPlayerReady, setShowGamePlay }) => (
    <Switch>
        <Route path="/gameplay/:gameId">
            <GamePlay sessionUser={sessionUser}
                sendMessage={sendMessage}
                setShowGamePlay={setShowGamePlay}
                showRoundResults={showRoundResults}
                setShowRoundResults={setShowRoundResults}
                playerReady={playerReady}
                setPlayerReady={setPlayerReady}
                game={game}
            />
        </Route>
        <Route path="/direct-message-form">
            <DirectMessageForm sendMessage={sendMessage} sessionUser={sessionUser} receivedMessages={receivedMessages} />
        </Route>
        <Route path="/friends">
            <FriendsList friends={friends} sessionUser={sessionUser} sendMessage={sendMessage} />
        </Route>
    </Switch>
);

export default Routes;
