import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import SubmitBtn from '../components/SubmitBtn';
import SecondaryBtn from '../components/SecondaryBtn';
import { grey, black, white, orange, red, green } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

const mapStateToProps = (decks, { navigation }) => {
  const { deckId } = navigation.state.params;
  return {
    deck: decks[deckId]
  };
};

class Quiz extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: `Quiz: ${deckId}`
    };
  };

  state = {
    current: 0,
    showAnswer: false,
    score: 0
  };

  handleShowAnswer = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }));
  };

  handleAnswer = isCorrect => {
    this.setState(
      prevState => ({
        current: prevState.current + 1,
        showAnswer: false,
        score: isCorrect ? prevState.score + 1 : prevState.score
      }),
      () => this.validateNotification()
    );
  };

  handleBack = () => {
    const { navigation } = this.props;
    navigation.dispatch(NavigationActions.back());
  };

  handleRestartQuiz = () => {
    this.setState({
      current: 0,
      showAnswer: false,
      score: 0
    });
  };

  validateNotification = () => {
    const { current } = this.state;
    const { deck } = this.props;

    if (current >= deck.questions.length) {
      clearLocalNotification().then(setLocalNotification);
    }
  };

  renderQuestion = () => {
    const { current, showAnswer } = this.state;
    const { deck } = this.props;
    const currentQ = deck.questions[current];

    return (
      <View>
        <View style={styles.numQuestionContainer}>
          <Text style={styles.numQuestions}>{`${current + 1}/${
            deck.questions.length
          }`}</Text>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {showAnswer ? currentQ.answer : currentQ.question}
          </Text>
        </View>
        <View style={styles.answerBtnContainer}>
          <TouchableOpacity
            style={styles.answerBtn}
            onPress={this.handleShowAnswer}
          >
            <Text style={styles.answerBtnText}>
              {showAnswer ? 'Question' : 'Answer'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btn}>
          <SubmitBtn
            style={styles.btn}
            onPress={() => this.handleAnswer(true)}
            text="Correct"
            bgColor={green}
          />
        </View>
        <View style={styles.btn}>
          <SubmitBtn
            style={styles.btn}
            onPress={() => this.handleAnswer(false)}
            text="Incorrect"
            bgColor={red}
          />
        </View>
      </View>
    );
  };

  renderScore = () => {
    const { deck } = this.props;
    const { score } = this.state;
    const result = ((score * 100) / deck.questions.length).toFixed(1);

    return (
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score</Text>
        <Text
          style={[
            styles.scoreResult,
            {
              color: result >= 50 ? green : red
            }
          ]}
        >{`${result}%`}</Text>
        <View style={styles.btnsContainer}>
          <View style={styles.btn}>
            <SecondaryBtn onPress={this.handleBack} text="Back to Deck" />
          </View>
          <View style={styles.btn}>
            <SubmitBtn onPress={this.handleRestartQuiz} text="Restart Quiz" />
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { current } = this.state;
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        {deck.questions.length > current
          ? this.renderQuestion()
          : this.renderScore()}
      </View>
    );
  }
}

Quiz.propTypes = {
  deck: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string,
        anwser: PropTypes.string
      })
    ).isRequired
  }).isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 15
  },
  numQuestionContainer: {
    width: '100%',
    paddingLeft: 15
  },
  numQuestions: {
    fontSize: 20,
    textAlign: 'left',
    color: grey
  },
  questionContainer: {
    width: '100%',
    marginTop: 40,
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  questionText: {
    fontSize: 30,
    color: black,
    width: '100%',
    textAlign: 'center'
  },
  answerBtnContainer: {
    width: '100%',
    marginBottom: 30
  },
  answerBtn: {
    backgroundColor: white,
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  answerBtnText: {
    color: orange,
    fontSize: 20,
    textAlign: 'center'
  },
  btnsContainer: {
    width: '100%',
    marginTop: 30
  },
  btn: {
    marginTop: 5,
    marginBottom: 5
  },
  scoreContainer: {
    width: '100%',
    marginTop: 40
  },
  scoreText: {
    fontSize: 60,
    color: black,
    textAlign: 'center'
  },
  scoreResult: {
    fontSize: 80,
    textAlign: 'center'
  }
});

export default connect(mapStateToProps)(Quiz);
