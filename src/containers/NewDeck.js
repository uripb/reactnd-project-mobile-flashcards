import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import SubmitBtn from '../components/SubmitBtn';
import { orange, grey } from '../utils/colors';
import { addDeck } from '../actions/decks';
import { saveDeckTitle } from '../utils/api';



const mapDispatchToProps = {
  addDeckFn: addDeck, 
};

class NewDeck extends Component {

  state = {
    text: '',
  };

  submit = () => {
    const { addDeckFn, navigation } = this.props;
    const { text } = this.state;
    const deck = {
      title: text,
      questions: [],
    };

    saveDeckTitle(deck)
      .then(addDeckFn)
      .then(this.reset)
      .then(() => {
        navigation.navigate(
          'DeckDetail',
          { deckId: deck.title }
        );
      });
  };

  onChangeText = (text) => {
    this.setState({
      text,
    });
  }

  reset = () => {
    this.setState({
      text: '',
    });
  }

  render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.questionLabel}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.inputText}
          editable={true}
          placeholder={'Deck Title...'}
          underlineColorAndroid={orange}
          selectionColor={grey}
          value={text}
          onChangeText={this.onChangeText}
        />
        <SubmitBtn
          onPress={this.submit}
          disabled={text.length === 0}
          text="Create Deck"
        />
      </View>
    );
  }
}

NewDeck.propTypes = {
  addDeckFn: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  questionLabel: {
    fontSize: 30,
    color: grey,
    width: '70%',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputText: {
    width: '80%',
    height: 40,
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 5,
    marginBottom: 30,
  },
});

export default connect(
  null,
  mapDispatchToProps
)(NewDeck);