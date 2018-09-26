import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

class DeckRow extends PureComponent {

  handleClickRow = () => {
    // navigate to row detail
  }

  render() {
    const { title, num } = this.props;
    return (
      <TouchableOpacity onPress={this.handleClickRow}>
        <View>
          <Text>{title}</Text>
          <Text>{num} cards</Text>
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

export default DeckRow;