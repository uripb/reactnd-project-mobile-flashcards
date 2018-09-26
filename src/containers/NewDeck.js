import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { orange, grey, white } from '../utils/colors';
import { addDeck } from '../actions/decks';
import { saveDeckTitle } from '../utils/api';

function SubmitBtn ({ onPress, disabled }) {
  return (
    <TouchableOpacity 
      style={[styles.submitBtn, disabled ? styles.disabledBtn : styles.enabledBtn]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.5}
    >
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
};

SubmitBtn.defaultProps = {
  disabled: false,
};

SubmitBtn.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addDeckFn: addDeck, 
};

class NewDeck extends Component {

  state = {
    text: '',
  }

  submit = () => {
    const { addDeckFn } = this.props;
    const { text } = this.state;
    const deck = {
      title: text,
      questions: [],
    };

    saveDeckTitle(deck)
      .then(addDeckFn)
      .then(this.reset);
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
  submitBtn: {
    backgroundColor: orange,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    height: 45,
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBtn: {
    opacity: 0.4,
  },
  enabledBtn: {
    opacity: 1,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});

export default connect(
  null,
  mapDispatchToProps
)(NewDeck);