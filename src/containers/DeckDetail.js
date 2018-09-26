import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import SecondaryBtn from '../components/SecondaryBtn';
import SubmitBtn from '../components/SubmitBtn';
import { grey, black } from '../utils/colors';

const mapStateToProps = (decks, { navigation }) => {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: decks[deckId],
  };
};

class DeckDetail extends PureComponent {

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId
    }
  }

  handleStartQuiz = () => {

  };

  handleAddCard = () => {
    const { navigation, deckId } = this.props;
    navigation.navigate(
      'AddCard',
      {
        deckId,
      }
    );
  };

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cards}>{deck.questions.length} cards</Text>
        <View style={styles.btn}>
          <SecondaryBtn onPress={this.handleAddCard} text="Add card" />
        </View>
        <View style={styles.btn}>
          <SubmitBtn onPress={this.handleStartQuiz} text="Start Quiz" />
        </View>
      </View>
    );

  }
}

DeckDetail.propTypes = {
  deckId: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    color: black,
    width: '70%',
    textAlign: 'center',
    marginBottom: 5,
  },
  cards: {
    fontSize: 20,
    color: grey,
    width: '70%',
    textAlign: 'center',
    marginBottom: 30,
  },
  btn: {
    marginTop: 5,
    marginBottom: 5,
  },
});

export default connect(
  mapStateToProps,
  null,
)(DeckDetail);