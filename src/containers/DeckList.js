import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { AppLoading } from 'expo';
import DeckRow from '../components/DeckRow';
import { receiveDecks } from '../actions/decks';
import { getDecks } from '../utils/api';

const mapStateToProps = decks => ({
  decks: Object.values(decks).map(deck => ({
    title: deck.title,
    totalCards: deck.questions.length || 0
  }))
});

const mapDispatchToProps = {
  getDecksFn: receiveDecks
};

class DeckList extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { getDecksFn } = this.props;
    getDecks()
      .then(getDecksFn)
      .then(() => this.setState(() => ({ ready: true })));
  }

  handleClickRow = id => {
    const { navigation } = this.props;
    navigation.navigate('DeckDetail', { deckId: id });
  };

  keyExtractor = item => item.title;

  renderLoading = () => <AppLoading />;

  renderItem = ({ item }) => (
    <DeckRow
      title={item.title}
      num={item.totalCards}
      onClick={this.handleClickRow}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return this.renderLoading();
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

DeckList.propTypes = {
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      totalCards: PropTypes.number.isRequired
    })
  ).isRequired,
  getDecksFn: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch'
  },
  separator: {
    height: 1,
    width: '92%',
    backgroundColor: '#CED0CE',
    marginLeft: '4%',
    marginRight: '4%'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList);
