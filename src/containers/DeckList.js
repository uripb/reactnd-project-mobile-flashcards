import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { receiveDecks } from '../actions/decks';
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

class DeckRow extends PureComponent {

  handleClickRow = () => {
    // navigate to row detail
  }

  render() {
    const { title, num } = this.props;
    return (
      <TouchableOpacity style={styles.row} onPress={this.handleClickRow}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.cards}>{num} cards</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

DeckRow.defaultProps = {
  title: '-',
  num: 0,
};

DeckRow.propTypes = {
  title: PropTypes.string,
  num: PropTypes.number, 
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

  keyExtractor = (item) => item.title;

  renderItem = ({item}) => (
    <DeckRow title={item.title} num={item.totalCards} />
  );

  renderSeparator = () => (
    <View
        style={styles.separator}
      />
  );

  render() {
    const { decks } = this.props;
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
  decks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    totalCards: PropTypes.number.isRequired,
  })).isRequired,
  getDecksFn: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  row: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    backgroundColor: "white"
  },
  separator: {
    height: 1,
    width: "92%",
    backgroundColor: "#CED0CE",
    marginLeft: "4%",
    marginRight: "4%",
  },
  title: {
    fontSize: 20,
  },
  cards: {
    fontSize: 17,
    color: "#5f656b",
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList);