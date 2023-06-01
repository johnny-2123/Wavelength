import React from "react";
import './WaitingForPartner.css'

const WaitingForPartnerWord = ({ friendUser, userWordText }) => {

    return (
        <div className="waitingForFriend">
            <div>
                <h2 className="waitingForFriendText">Waiting for {friendUser?.username} to submit their word...
                </h2>
            </div>
            <div>
                <h2 className="userSubmittedWord" >Your Word</h2>
                <h3 className="userWord">{userWordText}</h3>
            </div>
        </div>
    )

}


export default WaitingForPartnerWord
