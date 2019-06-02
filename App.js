import React, {Component} from 'react';
import { StyleSheet, Button, Alert, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount(){
    this.initGame();
  }

  initGame = () => {
    this.setState({
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1
    });
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
      switch (value) {
        case 1: 
          return <Icon style={ styles.iconX } name="times" />;
        
        case -1: 
          return <Icon style={ styles.iconO } name="circle" />
        
        default: 
          return <View/>
      }
  }

  onTilePress = (row, col) => {

    //Don´t allow tile to change....
    var value = this.state.gameState[row][col];
    if(value !==0) { return; }

    //Grab current plaer...
    var currentPlayer = this.state.currentPlayer;

    //Set te correct tile...
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr})

    //Swith to other player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    //There are no winners
    var winner = this.getWinner();
    if(winner == 1){
      Alert.alert("Player #1 is the winner");
      setTimeout(() => {
        this.initGame();
      }, 3000);
    }else if(winner == -1){
      Alert.alert("Player #2 is the winner");
      setTimeout(() => {
        this.initGame();
      }, 3000);
    }
  }

  onNewGamePress = () =>{
    this.initGame();
  }

  /**
   * Return 1 if Player 1 won, -1 if player 2 won, or 0 if no one has won
   */
  getWinner = () => {
    const NUM_TILES = 3;
    var arr =  this.state.gameState;
    var sum;

    //Check rows
    for (var i = 0; i < NUM_TILES; i++) {
        sum = arr[i][0] + arr[i][1] + arr[i][2];
        if(sum == 3){ 
          return 1;
        }else if(sum == -3){ 
          return -1
        }
    }

    //Check columns
    for (var i = 0; i < NUM_TILES; i++) {
          sum = arr[0][i] + arr[1][i] + arr[2][i];
          if(sum == 3){ 
            return 1;
          }else if(sum == -3){ 
            return -1
          }
      }

    /**
     * Check diagnals
     *    0   1  2
     *  0 [*, 0, *],
     *  1 [0, *, 0],
     *  2 [*, 0, *]
     */
    sum = arr[0][0] + arr[1][1] + arr[2][2]
    if(sum == 3){ 
      return 1;
    }else if(sum == -3){ 
      return -1
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2]
    if(sum == 3){ 
      return 1;
    }else if(sum == -3){ 
      return -1
    }
  }

  render() {
    return (
      <View style={styles.container}>

          <View style={ styles.row }>
            <TouchableOpacity onPress={ () => this.onTilePress(0,0) } style={ [ styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 } ] } >
              { this.renderIcon(0,0)}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={ () => this.onTilePress(0,1) } style={ [ styles.tile,{ borderTopWidth: 0 }] } >
              { this.renderIcon(0,1)}
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.onTilePress(0,2) } style={ [ styles.tile, { borderTopWidth: 0, borderRightWidth: 0 } ] } >
              { this.renderIcon(0,2)}
            </TouchableOpacity>
          </View>

          <View style={ styles.row }>
            <TouchableOpacity onPress={ () => this.onTilePress(1,0) } style={ [ styles.tile,{ borderLeftWidth: 0 }] } >
              { this.renderIcon(1,0)}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={ () => this.onTilePress(1,1) } style={styles.tile} >
              { this.renderIcon(1,1)}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={ () => this.onTilePress(1,2) } style={ [ styles.tile, { borderRightWidth: 0 } ] } >
              { this.renderIcon(1,2)}
            </TouchableOpacity>
        </View>

        <View style={ styles.row }>
            <TouchableOpacity onPress={ () => this.onTilePress(2,0) } style={ [ styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 } ] } >
              { this.renderIcon(2,0)}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={ () => this.onTilePress(2,1) } style={ [ styles.tile,{ borderBottomWidth: 0 }] } >
              { this.renderIcon(2,1)}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={ () => this.onTilePress(2,2) } style={ [ styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 } ] } >
              { this.renderIcon(2,2)}
            </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 50 }} />
        <Button title="New Game" onPress={ this.onNewGamePress }/>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  iconX:{
    color: "red",
    fontSize:  60
  },
  iconO:{
    color: "green",
    fontSize:  60
  }
});
