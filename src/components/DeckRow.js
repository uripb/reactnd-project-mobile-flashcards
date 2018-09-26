import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { grey } from '../utils/colors';

class DeckRow extends PureComponent {

  render() {
    const { title, num, onClick } = this.props;
    return (
      <TouchableOpacity style={styles.row} onPress={() => onClick(title)}>
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
  onClick: () => null,
};

DeckRow.propTypes = {
  title: PropTypes.string,
  num: PropTypes.number, 
  onClick: PropTypes.func,
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    backgroundColor: "white"
  },
  title: {
    fontSize: 20,
  },
  cards: {
    fontSize: 17,
    color: grey,
  }
});

export default DeckRow;