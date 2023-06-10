## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "token": ""
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": [
        "Email is required",
        "Password is required"
      ]
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "token": ""
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": [
        "User with that email already exists"
      ]
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": [
        "Invalid email",
        "First Name is required",
        "Last Name is required"
      ]
    }
    ```


## Friend Routes

### Get Top Friends

Retrieve the top three friends based on recent game activity.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/friends/top`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "friends": [
        {
          "id": 1,
          "username": "friend1"
        },
        {
          "id": 2,
          "username": "friend2"
        },
        {
          "id": 3,
          "username": "friend3"
        }
      ]
    }
    ```

* Error Response: If no friends are found or there is an error retrieving the data
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "friends": []
    }
    ```

### Get Games with Friend

Retrieve all games between the current user and a friend.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/friends/:friendId/games`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "games": [
        {
          "id": 1,
          "user1Id": 1,
          "user2Id": 2,
          "user1": {
            "id": 1,
            "username": "user1"
          },
          "user2": {
            "id": 2,
            "username": "user2"
          },
          "Round": [
            {
              "id": 1,
              "GameId": 1,
              "Word": [
                {
                  "id": 1,
                  "wordText": "word1",
                  "userId": 1
                },
                {
                  "id": 2,
                  "wordText": "word2",
                  "userId": 2
                }
              ]
            }
          ]
        },
        ...
      ]
    }
    ```

* Error Response: If no games are found between the user and the friend
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "games": []
    }
    ```

### Get Friend Details

Retrieve details about a friend.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/friends/:friendId`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    - If friend request sent:
      ```json
      {
        "friend": {
          "id": 2,
          "username": "friend2",
          "status": "accepted",
          "friendship": "sent"
        }
      }
      ```

    - If friend request received:
      ```json
      {
        "friend": {
          "id": 3,
          "username": "friend3",
          "status": "pending",
          "friendship": "received"
        }
      }
      ```

    - If not friends:
      ```json
      {
        "friend": {
          "id": 4,
          "username": "friend4",
          "status": "notFriend"
        }
      }
      ```

* Error Response: If the friend is not found or there is an error retrieving the data
  * Status Code: 404 or 500 (depending on the error)
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": ["Friend not found."]
    }
    ```

### Delete Friendship

Delete a friendship with a friend.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: `/api/friends/:friendId`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Friendship deleted.",
      "friendship": {
        "id": 2,
        "userId": 1,
        "friendId": 2,
        "status": "accepted",
        "createdAt": "2022-06-01T12:00:00.000Z",
        "updatedAt": "2022-06-02T12:00:00.000Z"
      }
    }
    ```

* Error Response: If the friendship is not found or there is an error deleting it
  * Status Code: 404 or 500 (depending on the error)
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": ["Friendship not found."]
    }
    ```

### Update Friendship Status

Update the status of a friend request.

* Require Authentication: true
* Request
  * Method: PUT
  * URL: `/api/friends/:friendId`
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "status": "accepted"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    - If the friend request is accepted:
      ```json
      {
        "message": ["Friend request from friend2 accepted."],
        "friendship": {
          "id": 2,
          "userId": 1,
          "friendId": 2,
          "status": "accepted",
          "createdAt": "2022-06-01T12:00:00.000Z",
          "updatedAt": "2022-06-02T12:00:00.000Z"
        }
      }
      ```

    - If the friend request is rejected:
      ```json
      {
        "message": ["Friend request rejected."],
        "friendship": {
          "id": 2,
          "userId": 1,
          "friendId": 2,
          "status": "rejected",
          "createdAt": "2022-06-01T12:00:00.000Z",
          "updatedAt": "2022-06-02T12:00:00.000Z"
        }
      }
      ```

* Error Response: If the friend is not found, the friendship is not found, or there is an error updating the status
  * Status Code: 404 or 500 (depending on the error)
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": ["Friend not found."]
    }
    ```

### Send Friend Request

Send a friend request to a user.

* Require Authentication: true
* Request
  * Method: POST
  * URL: `/api/friends`
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "friendCredential": "friendUsername"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": ["Friend request sent to friendUsername."]
    }
    ```

* Error Response: If the friend is not found, a friendship already exists, or there is an error creating the friendship
  * Status Code: 400 or 404 or 500 (depending on the error)
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": ["Friend not found."]
    }
    ```

### Get User's Friends

Retrieve all friends of a user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/friends`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "friends": [
        {
          "id": 1,
          "userId": 1,
          "friendId": 2,
          "status": "accepted",
          "createdAt": "2022-06-01T12:00:00.000Z",
          "updatedAt": "2022-06-02T12:00:00.000Z",
          "RequestingUser": {
            "id": 1,
            "username": "user1"
          },
          "ReceivingUser": {
            "id": 2,
            "username": "user2"
          }
        },
        ...
      ]
    }
    ```

* Error Response: If no friends are found or there is an error retrieving the data
  * Status Code: 200 or 500 (depending on the error)
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "friends": []
    }
    ```


## Game Routes

### Get Recent Games

Retrieve the most recent games for the authenticated user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/games/recentGames`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "recentGames": [
        {
          "id": 1,
          "user1Id": 1,
          "user2Id": 2,
          "gameOver": false,
          "datetime": "2023-06-08T12:00:00Z",
          "Round": [
            {
              "id": 1,
              "roundNumber": 1,
              "gameId": 1,
              "word1Id": 1,
              "word2Id": 2,
              "user1Agrees": false,
              "user2Agrees": false,
              "Words": [
                {
                  "id": 1,
                  "roundId": 1,
                  "userId": 1,
                  "wordText": "example"
                },
                {
                  "id": 2,
                  "roundId": 1,
                  "userId": 2,
                  "wordText": "sample"
                }
              ]
            }
          ],
          "user1": {
            "id": 1,
            "username": "user1"
          },
          "user2": {
            "id": 2,
            "username": "user2"
          }
        }
      ]
    }
    ```

* Error Response: If no recent games are found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "No Recent Games Found."
    }
    ```

### Get Most Recent Game

Retrieve the most recent game for the authenticated user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/games/recentGame`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "game": {
        "id": 1,
        "user1Id": 1,
        "user2Id": 2,
        "gameOver": false,
        "datetime": "2023-06-08T12:00:00Z",
        "Round": [
          {
            "id": 1,
            "roundNumber": 1,
            "gameId": 1,
            "word1Id": 1,
            "word2Id": 2,
            "user1Agrees": false,
            "user2Agrees": false,
            "Words": [
              {
                "id": 1,
                "roundId": 1,
                "userId": 1,
                "wordText": "example"
              },
              {
                "id": 2,
                "roundId": 1,
                "userId": 2,
                "wordText": "sample"
              }
            ]
          }
        ],
        "user1": {
          "id": 1,
          "username": "user1"
        },
        "user2": {
          "id": 2,
          "username": "user2"
        }
      }
    }
    ```

* Error Response: If no recent game is found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "Game not found."
    }
    ```

### Get Rounds for a Game

Retrieve all rounds for a specific game.

* Require Authentication: false
* Request
  * Method: GET
  * URL: `/api/games/:gameId/rounds`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "rounds": [
        {
          "id": 1,
          "roundNumber": 1,
          "gameId": 1,
          "word1Id": 1,
          "word2Id": 2,
          "user1Agrees": false,
          "user2Agrees": false
        }
      ]
    }
    ```

* Error Response: If game is not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "Game not found."
    }
    ```

### Create a New Round

Create a new round for a game.

* Require Authentication: false
* Request
  * Method: POST
  * URL: `/api/games/:gameId/rounds`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "round": {
        "id": 1,
        "roundNumber": 2,
        "gameId": 1,
        "word1Id": null,
        "word2Id": null,
        "user1Agrees": false,
        "user2Agrees": false
      }
    }
    ```

* Error Response: If the previous round conditions are not met (e.g., incomplete, both users agree, or not ready)
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "round": {
        "id": 1,
        "roundNumber": 1,
        "gameId": 1,
        "word1Id": 1,
        "word2Id": 2,
        "user1Agrees": false,
        "user2Agrees": false
      }
    }
    ```

### Update Game

Update a game by setting the "gameOver" flag.

* Require Authentication: true
* Request
  * Method: PUT
  * URL: `/api/games/:gameId`
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "gameOver": true
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "game": {
        "id": 1,
        "user1Id": 1,
        "user2Id": 2,
        "gameOver": true,
        "datetime": "2023-06-08T12:00:00Z",
        "Round": [
          {
            "id": 1,
            "roundNumber": 1,
            "gameId": 1,
            "word1Id": 1,
            "word2Id": 2,
            "user1Agrees": false,
            "user2Agrees": false,
            "Words": [
              {
                "id": 1,
                "roundId": 1,
                "userId": 1,
                "wordText": "example"
              },
              {
                "id": 2,
                "roundId": 1,
                "userId": 2,
                "wordText": "sample"
              }
            ]
          }
        ],
        "user1": {
          "id": 1,
          "username": "user1"
        },
        "user2": {
          "id": 2,
          "username": "user2"
        }
      }
    }
    ```

* Error Response: If game is not found or unauthorized
  * Status Code: 404 or 401
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "Game not found."
    }
    ```

### Delete Game

Delete a game.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: `/api/games/:gameId`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Game 1 deleted.",
      "game": {
        "id": 1,
        "user1Id": 1,
        "user2Id": 2,
        "gameOver": true,
        "datetime": "2023-06-08T12:00:00Z",
        "Round": [
          {
            "id": 1,
            "roundNumber": 1,
            "gameId": 1,
            "word1Id": 1,
            "word2Id": 2,
            "user1Agrees": false,
            "user2Agrees": false,
            "Words": [
              {
                "id": 1,
                "roundId": 1,
                "userId": 1,
                "wordText": "example"
              },
              {
                "id": 2,
                "roundId": 1,
                "userId": 2,
                "wordText": "sample"
              }
            ]
          }
        ],
        "user1": {
          "id": 1,
          "username": "user1"
        },
        "user2": {
          "id": 2,
          "username": "user2"
        }
      }
    }
    ```

* Error Response: If game is not found or unauthorized
  * Status Code: 404 or 401
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "Game not found."
    }
    ```

### Get Game

Retrieve a specific game.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/games/:gameId`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "game": {
        "id": 1,
        "user1Id": 1,
        "user2Id": 2,
        "gameOver": false,
        "datetime": "2023-06-08T12:00:00Z",
        "Round": [
          {
            "id": 1,
            "roundNumber": 1,
            "gameId": 1,
            "word1Id": 1,
            "word2Id": 2,
            "user1Agrees": false,
            "user2Agrees": false,
            "Words": [
              {
                "id": 1,
                "roundId": 1,
                "userId": 1,
                "wordText": "example"
              },
              {
                "id": 2,
                "roundId": 1,
                "userId": 2,
                "wordText": "sample"
              }
            ]
          }
        ],
        "user1": {
          "id": 1,
          "username": "user1"
        },
        "user2": {
          "id": 2,
          "username": "user2"
        }
      }
    }
    ```

* Error Response: If game is not found or unauthorized
  * Status Code: 404 or 401
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "Game not found."
    }
    ```

### Create a New Game

Create a new game.

* Require Authentication: true
* Request
  * Method: POST
  * URL: `/api/games/`
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "user1Id": 1,
      "user2Id": 2
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "game": {
        "id": 1,
        "user1Id": 1,
        "user2Id": 2,
        "gameOver": false,
        "datetime": "2023-06-08T12:00:00Z"
      }
    }
    ```

* Error Response: If the request is invalid
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "Invalid request."
    }
    ```

### Get Games

Retrieve all games for the authenticated user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/games/`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "games": [
        {
          "id": 1,
          "user1Id": 1,
          "user2Id": 2,
          "gameOver": false,
          "datetime": "2023-06-08T12:00:00Z",
          "Round": [
            {
              "id": 1,
              "roundNumber": 1,
              "gameId": 1,
              "word1Id": 1,
              "word2Id": 2,
              "user1Agrees": false,
              "user2Agrees": false,
              "Words": [
                {
                  "id": 1,
                  "roundId": 1,
                  "userId": 1,
                  "wordText": "example"
                },
                {
                  "id": 2,
                  "roundId": 1,
                  "userId": 2,
                  "wordText": "sample"
                }
              ]
            }
          ],
          "user1": {
            "id": 1,
            "username": "user1"
          },
          "user2": {
            "id": 2,
            "username": "user2"
          }
        }
      ]
    }
    ```

* Error Response: If no games are found
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "games": []
    }
    ```

## Rounds

### Create a Word for a Round

Create a new word for a round.

* Require Authentication: true
* Request
  * Method: POST
  * URL: `/api/rounds/:roundId/words`
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "wordText": "example"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "word": {
        "id": 1,
        "roundId": 1,
        "userId": 1,
        "wordText": "example"
      }
    }
    ```

* Error Response: If the round is not found or unauthorized
  * Status Code: 404 or 401
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "Round not found."
    }
    ```

* Error Response: If the round already has two words
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "Round already has two words."
    }
    ```

### Delete a Round

Delete a round.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: `/api/rounds/:roundId`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Round 1 deleted."
    }
    ```

* Error Response: If the round is not found or unauthorized
  * Status Code: 404 or 401
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "Round not found."
    }
    ```

### Update a Round

Update a round.

* Require Authentication: true
* Request
  * Method: PUT
  * URL: `/api/rounds/:roundId`
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "user1Agrees": true,
      "user2Agrees": false,
      "user1Ready": true,
      "user2Ready": true
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "round": {
        "id": 1,
        "roundNumber": 1,
        "gameId": 1,
        "word1Id": 1,
        "word2Id": 2,
        "user1Agrees": true,
        "user2Agrees": false,
        "user1Ready": true,
        "user2Ready": true
      }
    }
    ```

* Error Response: If the round is not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "Round not found."
    }
    ```

### Get a Round

Retrieve a round by its ID.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/rounds/:roundId`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "round": {
        "id": 1,
        "roundNumber": 1,
        "gameId": 1,
        "word1Id": 1,
        "word2Id": 2,
        "user1Agrees": false,
        "user2Agrees": false,
        "user1Ready": true,
        "user2Ready": true,
        "Game": {
          "id": 1
        },
        "Words": [
          {
            "id": 1,
            "roundId": 1,
            "userId": 1,
            "wordText": "example",
            "User": {
              "id": 1,
              "username": "user1"
            }
          },
          {
            "id": 2,
            "roundId": 1,
            "userId": 2,
            "wordText": "another example",
            "User": {
              "id": 2,
              "username": "user2"
            }
          }
        ]
      }
    }
    ```

* Error Response: If the round is not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "errors": "Round not found."
    }
    ```

## Words

### Get Words between User and Friend

Retrieve all words between the current user and a friend.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/words/:friendId`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "words": [
        {
          "wordText": "example",
          "userId": 1
        },
        {
          "wordText": "another example",
          "userId": 2
        },
        ...
      ]
    }
    ```

* Error Response: If no words are found between the user and the friend
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "words": []
    }
    ```

### Get User's Words

Retrieve all words created by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: `/api/words/`
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "words": [
        {
          "wordText": "example",
          "userId": 1
        },
        {
          "wordText": "another example",
          "userId": 1
        },
        ...
      ]
    }
    ```

* Error Response: If no words are found for the user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "words": []
    }
    ```
