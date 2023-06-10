# Wavelength

Check out the Live Version of Wavelength here: 
[Wavelength Live][wavelength]

[wavelength]: https://wavelength-2hp9.onrender.com

Wavelength is an online game that let's user's challenge friend's in a game of creativity and connection. Players begin by entering a random word of their choice. If the choose the same word, the game ends and they achieve victory together. If they choose different words, players have the apportunity to decide if the word's were close enough and end the game if they both decide so. Otherwise, the game will continue to the next round. In every round following the first, player's are shown the two word's from the previous round and have 30 seconds to come up with a word that is related to both words. The goal of the game is for player's to use the two word's from the previous round to try and enter the same word. The game progresses until players succeed or decide to give up. 

The project backend of the project is build on node with a PostgresSQL database. The frontend is built on React and Redux. Realtime communication for player's in a game is handled with Websockets.

## Features and Implementation

Users can create, read, update, and destroy games and friend relationships. React components exist for each corresponding action. Information needed for all friend and past game components are managed with Redux store. Information for realtime gameplay is through Websockets. 

### Users

 achieved through the integration of React components, Redux store, and Websockets. 

### User Management

#### User Registration
- As an unregistered user, you have the ability to register by providing your email, username, and password. 
    - Upon successful registration, you will be automatically logged in.
    - Clear feedback will be provided in case of validation errors.

#### User Login
- As a registered user, you can log into the website using your email and password.
    - Successful login grants access to the full functionality of the site.
    - Appropriate error messages are displayed for invalid credentials.

#### User Logout
- As a logged-in user, you can log out of your account to securely end your session from any page of the site.



### Games

#### Send Game Invite
  - As a logged in user, I want to be able to send a new game invite to a friend
    - i can select a friend my accepted friends list and send them a new game invite
    - I would like to be informed if the user is offline or if they decline the game invite

#### Receive a New Game Invite
  - As a logged in user, i want to be able to join a game invite received from a friend
    - I can click a notification button to accept the game invite.
    - I can click a notification button to decline the game invite.
    - The other player and I will automatically be redirected to the gameplay component if I accept a new game invite

#### GamePlay
#### Sending Game Invites
- As a logged-in user, you can send a new game invite to a friend from your accepted friends list.
    - You will be notified if the user is offline or declines the game invite.

#### Receiving Game Invites
- As a logged-in user, you can respond to game invites received from a friend.
    - You can accept or decline a game invite.
    - Accepting a new game invite redirects both players to the gameplay component.

#### Gameplay
- As a player, you can participate in real-time gameplay with your friend.
    - In the first round, both players are prompted to enter a random word.
        - If both players enter the same word, the game ends, and both players win.
        - If the words are different, the game progresses to the next round.
    - In the intermediary stage between rounds, you have the opportunity to decide if the entered words were close enough.
        - If both players agree that the words were close enough, the game ends, and both players win.
        - If only one player agrees, a new round begins.
    - In subsequent rounds, you are shown the words from the previous round and are able to input a new word related to those.
        - If you submit a word and your partner has not yet submitted their word, you will be directed to a waiting page.
        - Each player has 30 seconds to enter a word. If not, the game ends.
        - You can choose to end the game by clicking a button.

#### Game Results
- At the end of a game, you will be shown a detailed summary, including every round and word submitted.
    - You have the option to replay the game with your friend by clicking a "play again" button.

#### Viewing Past Games
- As a user, you can access a history of your past games.
    - Recent games are shown first.
    - Each game entry provides a summary, including the game partner's username and the words from the game's final round if player's submited words in the final round
    - 
#### Deleting Past Games
- As a user, you have the ability to delete entries of past games from your history.
    - You can choose to delete a single game.
    - Upon successful deletion, the game entry will be permanently removed from your history

### Friends

#### Sending Friend Requests
- As a user, you can send friend requests to other users.
    - You can search for other users by their username or email.
    - If the user is found, a friend request will be sent.
    - If the user doesn't exist, an error message will be displayed.

#### Receiving Friend Requests
- As a user, you can see friend requests from other users.
    - Friend requests will be visible in a designated component for pending friends.
    - Each friend request will show the username of the person who sent the request.

#### Accepting Friend Requests
- As a user, you can accept friend requests from other users.
    - By accepting a friend request, the user will be added to your accepted friends list.

#### Rejecting Friend Requests
- As a user, you can reject friend requests from other users.
    - By rejecting a friend request, the request will be removed from your pending friend requests list.

#### Additional Friend-related Features
#### View friend details: 
  - As a user, you can access detailed information about your friends if you navigate to that friend's details page.
    - You can see how many games you have played with that friend, how many games were won, and past games played with that friend
 
#### Online Status Update
  - As a user, you see your friends' online status. 
    - See instantly when they come online or go offline by the presense or absence of a green circle next to their listing in your accepted friend's page

#### Delete Friendship
  - If needed, you can unfriend a user
    - This action will remove the user from your friends list.
#### View Top Friends
  - As a user, you can see your top friends within the last week (most number of games played together).
