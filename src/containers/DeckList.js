import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';

const mapStateToProps = (decks) => ({
  decks: Object.values(decks).map(deck => ({
    title: deck.title,
    totalCards: deck.questions.length || 0,
  })),
});

const mapDispatchToProps = {
  getDecksFn: receiveDecks, 
};

class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const { getDecksFn } = this.props;
    getDecks()
      .then(getDecksFn)
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(decks)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

DeckList.propTypes = {
  decks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    totalCards: PropTypes.number.isRequired,
  })).isRequired,
  getDecksFn: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList);