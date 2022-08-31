# Creating an Unbeatable AI: Minimax algorithm (Tic Tac Toe)

## Funtionality

In this tic-tac-toe game, you can :
- Play against an unbeatable computer (the best you can do is tie)
- Play multi-player mode with two players 
- Choose if you want to play as X or O

## Tools Used

- Visual Studio Code 
- React with [Create React App](https://github.com/facebook/create-react-app).
- Cpanel file manager

## Preperation: 

1. Defining boundaries/specs
- Two players: human player + human player
- Option for 1 human players + 1 computer player
- Algorithm must follow space complexity of: O(bm) and time complexity of: O(b^m)

2. Defining key features
- Game must be in 3x3 grid (square, board, game)
- Click on grid should input a value of X or O 
- Game must take turns between 2 values: X and O
- Computer should randomly select a spot on the 3x3 grid when playing in one-player mode

3. Finding sub features 
- Define a Winner, Loser, and a Tie game 
- Implement AI; minimax algorithm: computer should always make the most optimal move (game should always end in a tie)
- Create a navbar to allow users to link to code written 
- Link to resources used 

4. Establishing a time-line for feature functionality 
- priorities were as follows: become familiar with minimax algorithm
- get 3x3 grid with click values 
- create computer to randomly generate a value on grid 
- create winner/loser/tie game outcome
- implement minimax algorithm for optimal game with AI 

## My Experience:

I had a lot of fun creating this game! I chose to use React because it allowed me to focus most of my time on the minimax algorithm as I didn't have to worry too much about spending too much time putting the aesthetics together since React makes it a relative breeze which allowed me to test and assemble the logic and functionality of the algorithm. In the future, I would like to implement alpha-beta pruning to the minimax algorithm which should optimize its speed. The game is relatively quick, however I recognize that with a larger game that has more possibility for moves, there would be a need for a more optimal algorithm. Ultimately, being able to create this game and learn more about it's implementation was very exciting for me :) 

## Resources Used: 

- https://www.whitman.edu/documents/Academics/Mathematics/2019/Felstiner-Guichard.pdf
- https://people.cs.pitt.edu/~litman/courses/cs2710/lectures/pruningReview.pdf
- https://cis.temple.edu/~vasilis/Courses/CIS603/Lectures/l7.html#:~:text=The%20time%20complexity%20of%20minimax,the%20leaves%20of%20the%20tree
- https://www.neverstopbuilding.com/blog/minimax

## Challenges:

- Understanding minimax and alpha-beta pruning
- Turning pseudocode of the minimax algorithm into functional code (lots of trial and error)
- Balancing functionality with aesthetics
- Deciding when functionality was enough and when to move onto some of the aesthetics

## Screenshots: 

![Alt text](https://www.cloudformdata.com/img/tttgithub.gif "gif of working app")

### play tic tac toe here: www.cloudformdata.com 

## or:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

