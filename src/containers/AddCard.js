import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import SubmitBtn from '../components/SubmitBtn';
import { orange, grey } from '../utils/colors';
import { addCard } from '../actions/cards';
import { addCardToDeck } from '../utils/api';

const mapStateToProps = (state, { navigation }) => {
  const { deckId } = navigation.state.params;
  return {
    deckId,
  };
};

const mapDispatchToProps = {
  addCardFn: addCard, 
};

class AddCard extends PureComponent {

  state = {
    question: '',
    answer: '',
  };

  onChangeQuestion = (question) => {
    this.setState({
      question,
    });
  };

  onChangeAnswer = (answer) => {
    this.setState({
      answer,
    });
  };

  isValidForm = () => {
    const { question, answer } = this.state;
    return question.length > 0 && answer.length > 0;
  };

  submit = () => {
    const { addCardFn, navigation, deckId } = this.props;
    const { question, answer } = this.state;
    const card = {
      question,
      answer,
    };

    addCardToDeck(deckId, card)
      .then(() => addCardFn(deckId, card))
      .then(this.reset)
      .then(() => {
        navigation.dispatch(NavigationActions.back());
      });
  };

  reset = () => {
    this.setState({
      question: '',
      answer: '',
    });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.questionLabel}>Question</Text>
        <TextInput
          style={styles.inputText}
          editable={true}
          placeholder={'Type question...'}
          underlineColorAndroid={orange}
          selectionColor={grey}
          value={question}
          onChangeText={this.onChangeQuestion}
        />
        <Text style={styles.questionLabel}>Answer</Text>
        <TextInput
          style={styles.inputText}
          editable={true}
          placeholder={'Type answer...'}
          underlineColorAndroid={orange}
          selectionColor={grey}
          value={answer}
          onChangeText={this.onChangeAnswer}
        />
        <SubmitBtn
          onPress={this.submit}
          disabled={!this.isValidForm()}
        />
      </View>
    );
  }
}

AddCard.propTypes = {
  deckId: PropTypes.string.isRequired,
  addCardFn: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
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
    fontSize: 20,
    color: grey,
    width: '80%',
    textAlign: 'left',
    marginBottom: 6,
    paddingLeft: 10,
  },
  inputText: {
    width: '80%',
    height: 40,
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 5,
    marginBottom: 20,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);