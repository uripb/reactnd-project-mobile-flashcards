import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { AppLoading } from 'expo';
import SecondaryBtn from '../components/SecondaryBtn';
import SubmitBtn from '../components/SubmitBtn';
import { getDeck } from '../utils/api';
import { grey, black } from '../utils/colors';

const mapStateToProps = (state, { navigation }) => {
  const { deckId } = navigation.state.params;
  return {
    deckId,
  };
};

/*const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    goBack: () => navigation.goBack(),
  };
};*/

class DeckDetail extends PureComponent {
  state = {
    ready: false,
    deck: null,
  };

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId
    }
  }

  componentDidMount() {
    const { deckId } = this.props;
    getDeck(deckId)
      .then((deck) => {
        this.setState({
          ready: true,
          deck,
        });
      });
  };

  handleStartQuiz = () => {

  };

  handleAddCard = () => {

  };

  renderLoading = () => (
    <AppLoading />
  );

  render() {
    const { ready, deck } = this.state;

    if (ready === false) {
      return this.renderLoading();
    }

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